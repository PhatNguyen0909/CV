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

    await page.setViewport({ width: 1600, height: 2200, deviceScaleFactor: 1 });
    await page.goto(previewUrl, { waitUntil: 'networkidle0' });

    await page.evaluate(async () => {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      const toolbar = document.querySelector('div.mb-6.flex.flex-wrap.items-center.justify-between.gap-3');
      if (toolbar instanceof HTMLElement) {
        toolbar.style.display = 'none';
      }

      const root = document.documentElement;
      root.classList.add('pdf-export-mode');
    });

    const content = await page.$('#cv-content');
    if (!content) {
      throw new Error('Cannot find #cv-content on page.');
    }

    await page.evaluate(async () => {
      const root = document.documentElement;
      root.classList.add('pdf-export-mode');

      const nodes = document.querySelectorAll('#cv-content *');
      nodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          node.style.animation = 'none';
          node.style.transition = 'none';

          if (node.style.opacity) {
            node.style.opacity = '1';
          }

          if (node.style.transform) {
            node.style.transform = 'none';
          }
        }
      });

      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    });

    const imageBuffer = await content.screenshot({ type: 'png' });
    const imageBase64 = imageBuffer.toString('base64');

    const printPage = await browser.newPage();
    const A4_WIDTH_PX = 794;
    const A4_HEIGHT_PX = 1123;
    const MARGIN_X_PX = 4;
    const MARGIN_Y_PX = 8;

    await printPage.setViewport({ width: A4_WIDTH_PX, height: A4_HEIGHT_PX, deviceScaleFactor: 1 });

    await printPage.setContent(
      `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            html, body {
              margin: 0;
              width: 100%;
              height: 100%;
              background: #0f172a;
            }

            .page {
              width: 100vw;
              height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
              background: #0f172a;
            }

            img {
              width: calc(100vw - ${MARGIN_X_PX * 2}px);
              height: calc(100vh - ${MARGIN_Y_PX * 2}px);
              object-fit: contain;
              object-position: center;
              display: block;
            }
          </style>
        </head>
        <body>
          <div class="page">
            <img src="data:image/png;base64,${imageBase64}" alt="CV" />
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
      pageRanges: '1',
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
