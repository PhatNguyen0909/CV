import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import process from 'node:process';
import puppeteer from 'puppeteer';

const host = '127.0.0.1';
const port = 4173;
const previewUrl = `http://${host}:${port}`;
const outputArg = process.argv[2];
const outputPath = outputArg
  ? path.resolve(process.cwd(), outputArg)
  : path.resolve(process.cwd(), 'nguyen-huu-vinh-phat-cv.pdf');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || 'application/octet-stream';
}

async function createStaticServer(rootDir) {
  const server = http.createServer(async (req, res) => {
    const reqUrl = req.url || '/';
    const pathname = decodeURIComponent(reqUrl.split('?')[0]);
    const normalizedPath = pathname === '/' ? '/index.html' : pathname;
    const safeRelative = path.normalize(normalizedPath).replace(/^([.]{2}[\\/])+/, '');
    const absolutePath = path.join(rootDir, safeRelative);

    if (!absolutePath.startsWith(rootDir)) {
      res.statusCode = 403;
      res.end('Forbidden');
      return;
    }

    try {
      const fileContent = await readFile(absolutePath);
      res.statusCode = 200;
      res.setHeader('Content-Type', getContentType(absolutePath));
      res.end(fileContent);
    } catch {
      res.statusCode = 404;
      res.end('Not Found');
    }
  });

  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, host, () => resolve());
  });

  return server;
}

async function run() {
  const distDir = path.resolve(process.cwd(), 'dist');
  if (!existsSync(path.join(distDir, 'index.html'))) {
    throw new Error('Missing dist build. Run "npm run build" first.');
  }

  const server = await createStaticServer(distDir);

  let browser;

  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setViewport({ width: 850, height: 1200, deviceScaleFactor: 2 });
    await page.emulateMediaType('print');
    await page.goto(previewUrl, { waitUntil: 'networkidle0' });

    await page.evaluate(async () => {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      window.localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
      const step = Math.max(window.innerHeight * 0.8, 1);
      for (let top = 0; top < document.documentElement.scrollHeight; top += step) {
        window.scrollTo(0, top);
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }

      window.scrollTo(0, 0);
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

      const content = document.querySelector('#cv-content');
      if (!(content instanceof HTMLElement)) {
        throw new Error('Cannot find #cv-content on page.');
      }
      content.style.backgroundColor = '#0f172a';

      const nodes = document.querySelectorAll('#cv-content, #cv-content *');
      nodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          node.style.setProperty('animation', 'none', 'important');
          node.style.setProperty('transition', 'none', 'important');
          node.style.setProperty('opacity', '1', 'important');
          node.style.setProperty('transform', 'none', 'important');
        }
      });

      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    });

    const content = await page.$('#cv-content');
    if (!content) {
      throw new Error('Cannot find #cv-content on page.');
    }

    const bounds = await content.boundingBox();
    if (!bounds || bounds.width <= 0 || bounds.height <= 0) {
      throw new Error('CV content has no printable dimensions.');
    }

    const imageBuffer = await content.screenshot({ type: 'png' });
    const imageBase64 = imageBuffer.toString('base64');
    const imageWidth = Math.round(bounds.width * 2);
    const imageHeight = Math.round(bounds.height * 2);
    const scale = Math.min(210 / imageWidth, 297 / imageHeight);
    const renderedWidth = imageWidth * scale;
    const renderedHeight = imageHeight * scale;
    const x = (210 - renderedWidth) / 2;
    const y = 0;

    const printPage = await browser.newPage();
    await printPage.setContent(
      `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            @page { size: A4 portrait; margin: 0; }
            html, body { margin: 0; padding: 0; }
            .page {
              width: 210mm;
              height: 297mm;
              overflow: hidden;
              background: #0f172a;
            }
            svg { display: block; width: 210mm; height: 297mm; }
          </style>
        </head>
        <body>
          <div class="page">
            <svg xmlns="http://www.w3.org/2000/svg"
                 width="210" height="297" viewBox="0 0 210 297">
              <rect width="210" height="297" fill="#0f172a" />
              <image href="data:image/png;base64,${imageBase64}"
                     x="${x}" y="${y}"
                     width="${renderedWidth}" height="${renderedHeight}" />
            </svg>
          </div>
        </body>
      </html>`,
      { waitUntil: 'load' }
    );

    await printPage.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      preferCSSPageSize: false,
    });

    await printPage.close();
    console.log(`\nPDF exported successfully: ${outputPath}`);
  } finally {
    if (browser) {
      await browser.close();
    }

    await new Promise((resolve) => server.close(() => resolve()));
  }
}

run().catch((error) => {
  console.error('\nPDF export failed:', error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
