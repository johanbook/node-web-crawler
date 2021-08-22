import chalk from "chalk";
import { ConstructorOptions, JSDOM } from "jsdom";
import fetch from "node-fetch";

import * as logger from "./logger";
import { CrawlOptions } from "./types";
import * as fs from "./utils/fs";
import * as image from "./utils/image";
import { shouldCrawlUrl } from "./utils/url";

interface CrawlState extends CrawlOptions {
  seenImages: Set<string>;
  seenPages: Set<string>;
}

/** Extracts and saves images from DOM */
function extractImages(dom: JSDOM, origin: URL, state: CrawlState): void {
  dom.window.document.querySelectorAll("img").forEach(({ src }) => {
    if (!src || state.seenImages.has(src)) {
      return;
    }

    state.seenImages.add(src);
    image.fetchAndSaveImage(new URL(src, origin), state);
  });
}

/** Finds links in DOM and crawls each of them */
function crawlLinks(dom: JSDOM, origin: URL, state: CrawlState) {
  dom.window.document.querySelectorAll("a").forEach(({ href }) => {
    const url = new URL(href, origin);
    if (shouldCrawlUrl(url, origin, state.mode)) {
      crawl(url, origin, state);
    }
  });
}

/** Crawls URL */
export async function crawl(
  url: URL,
  origin: URL,
  state: CrawlState
): Promise<void> {
  if (state.seenPages.has(url.href)) {
    return;
  }
  if (state.onCrawlLink) {
    state.onCrawlLink(url.href);
  }
  state.seenPages.add(url.href);

  logger.info(
    chalk`{blue \u1433} {gray Crawling} {green ${url.host + url.pathname}}`
  );

  const resp = await fetch(url.href);
  const html = await resp.text();

  const domOptions: ConstructorOptions = {};
  if (state.executeJs) {
    domOptions.resources = "usable";
    domOptions.runScripts = "dangerously";
  }
  const dom = new JSDOM(html, domOptions);
  if (state.onDomCreated) {
    state.onDomCreated(dom);
  }

  crawlLinks(dom, origin, state);
  extractImages(dom, origin, state);
}

/** Verify options and begins crawl */
export default async function setup(
  url: string,
  options: CrawlOptions
): Promise<void> {
  if (!fs.directoryExists(options.outputDir)) {
    logger.error(
      chalk.red.bold("Error:"),
      chalk.reset(`Output folder '${options.outputDir}' does not exist`)
    );
    process.exit(1);
  }

  // TODO: Use regexp check
  if (!url.includes("http")) {
    url = "https://" + url;
  }

  const crawlState: CrawlState = {
    ...options,
    seenImages: new Set<string>(),
    seenPages: new Set<string>(),
  };

  const originUrl = new URL(url);
  await crawl(originUrl, originUrl, crawlState);
}
