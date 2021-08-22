import { JSDOM } from "jsdom";

export type CrawlMode = "all" | "origin" | "pathname";

export interface CrawlOptions {
  /** If Javascript in crawled pages should be executed */
  executeJs?: boolean;
  /** Which found URLS should be crawled */
  mode: CrawlMode;
  /** Function fired before a new link is crawled */
  onCrawlLink?(url: string): void;
  /** Function called when DOM for new page is created.
   * Function may not be used to hold references to DOM
   * as that will cause memory leak. */
  onDomCreated?(dom: JSDOM): void;
  /** To which directory should data be output */
  outputDir: string;
}
