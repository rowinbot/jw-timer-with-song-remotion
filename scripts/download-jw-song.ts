import { writeFile, mkdir, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { cwd } from "node:process";
import puppeteer, { Page } from "puppeteer";

const ua =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36";

const song =
  "https://www.jw.org/es/biblioteca/musica-canciones/cantemos-con-gozo/26-lo-haces-por-mi/?media=sjjm";

async function main() {
  const page = await loadHtmlDocumentFromUrl(song);

  const videoSrc = await getVideoSrcFromPage(page);
  const filename = await getVideoNameFromPage(page);

  const filePath = join(cwd(), "public", "assets", "songs", filename);

  await recursivelyMakeDirIfNotExists(dirname(filePath));

  console.info(`[Info] Downloading video`);
  await downloadToFile(videoSrc, filePath);
  console.info(`[Info] Download completed: ${filename}`);

  process.exit(0);
}

async function loadHtmlDocumentFromUrl(url: string): Promise<Page> {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath:
      process.env.DOCKER_PUPPETEER === "true" ? "chromium" : undefined,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--headless"],
  });

  const page = await browser.newPage();
  page.setUserAgent(ua);
  await page.goto(url);
  await page.waitForSelector("video.vjs-tech", {
    timeout: 10000,
  });

  return page;
}

async function getVideoSrcFromPage(page: Page): Promise<string> {
  const videoSelector = await page.locator("video.vjs-tech[src]").waitHandle();
  const videoSrc = await videoSelector?.evaluate(
    (el) => (el as HTMLVideoElement).src,
  );

  console.log(`[Info] Video source: ${videoSrc}`);
  if (!videoSrc || typeof videoSrc !== "string") {
    throw new Error("[Error] Video source not found in the video element.");
  }
  return videoSrc;
}

async function getVideoNameFromPage(page: Page): Promise<string> {
  let title = await page.evaluate(
    `document.querySelector("h1.mediaItemTitle")?.innerText.trim()`,
  );
  if (!title || typeof title !== "string") {
    title = await page.evaluate(
      `document.querySelector("article#article h1")?.innerText.trim()`,
    );

    if (!title || typeof title !== "string") {
      throw new Error("[Error] Title text not found in the title element.");
    }
  }

  const sanitizedTitle = title.replace(/[^a-z0-9]/gi, "_").toLowerCase();
  const filename = `${sanitizedTitle}.mp4`;
  console.info(`[Info] Video name: ${filename}`);
  return filename;
}

async function downloadToFile(url: string, filePath: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`[Error] Failed to download file: ${response.statusText}`);
  }

  const size = parseInt(response.headers.get("content-length") || "0", 10);
  const fileSizeInMB = size / (1024 * 1024);

  if (fileSizeInMB > 100) {
    throw new Error(
      `[Error] File size is too large: ${fileSizeInMB.toFixed(2)} MB. Please download manually.`,
    );
  }

  const buffer = await response.arrayBuffer();
  await writeFile(filePath, Buffer.from(buffer));
}

async function recursivelyMakeDirIfNotExists(dir: string): Promise<void> {
  try {
    const exists = await stat(dir);
    if (exists.isDirectory()) return;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }
  }

  await mkdir(dir, { recursive: true });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
