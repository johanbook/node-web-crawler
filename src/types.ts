export type CrawlMode = "all" | "origin" | "pathname";

export interface CrawlOptions {
  /** If Javascript in crawled pages should be executed */
  executeJs?: boolean;
  /** Which found URLS should be crawled */
  mode: CrawlMode;
  /** Function fired before a new link is crawled */
  onCrawlLink?(url: string): void;
  /** To which directory should data be output */
  outputDir: string;
}
