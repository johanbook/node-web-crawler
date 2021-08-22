import { CrawlMode } from "../types";

/** Checks if URL should be crawled */
export function shouldCrawlUrl(
  url: URL,
  referrer: URL,
  mode: CrawlMode
): boolean {
  switch (mode) {
    case "all":
      return true;
    case "origin":
      return url.origin === referrer.origin;
    case "pathname":
      return (
        url.origin === referrer.origin && url.pathname === referrer.pathname
      );
  }
}
