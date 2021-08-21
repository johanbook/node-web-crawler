import chalk from "chalk";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

import { CrawlOptions } from "./types";

/** Generate radnom image name */
export function createImageName(url: string): string {
  const extension = path.extname(url);
  return uuid() + extension;
}

/** Download and save image to file */
export async function fetchAndSaveImage(
  url: URL,
  options: CrawlOptions
): Promise<void> {
  const resp = await fetch(url).catch(() => {
    /* eslint-disable-next-line no-console */
    console.error(chalk.red(`Failed to download ${url}`));
  });
  if (!resp || !resp.ok) {
    return;
  }

  const buffer = await resp.buffer();
  const name = createImageName(url.pathname);

  /* eslint-disable-next-line no-console */
  console.log(
    chalk`{green \t\u2714 }{gray Saving} {green ${url.host + url.pathname}}`
  );
  fs.writeFileSync(`${options.outputDir}/${name}`, buffer);
}
