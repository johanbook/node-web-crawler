import path from "path";

import chalk from "chalk";
import fetch from "node-fetch";
import { v4 as uuid } from "uuid";

import * as logger from "../logger";
import { CrawlOptions } from "../types";
import * as fs from "./fs";

/** Generates random image name */
export function createImageName(url: string): string {
  const extension = path.extname(url);
  return uuid() + extension;
}

/** Fetches image from URL */
async function fetchImage(url: URL): Promise<Buffer> {
  const resp = await fetch(url.href);
  if (!resp.ok) {
    throw new Error(resp.statusText);
  }
  return await resp.buffer();
}

/** Saves image to folder. Name is generated from URL. */
function saveImage(url: URL, directory: string, buffer: Buffer): void {
  const name = createImageName(url.pathname);
  fs.writeFile(`${directory}/${name}`, buffer);
}

/** Downloads and save image to file */
export async function fetchAndSaveImage(
  url: URL,
  options: CrawlOptions
): Promise<void> {
  let buffer: Buffer;

  try {
    buffer = await fetchImage(url);
  } catch {
    logger.error(chalk.red(`Failed to download ${url}`));
    return;
  }

  logger.info(
    chalk`{green \t\u2714 }{gray Saving} {green ${url.host + url.pathname}}`
  );
  saveImage(url, options.outputDir, buffer);
}
