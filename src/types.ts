export interface CrawlOptions {
  /** If Javascript in crawled pages should be executed */
  executeJs?: boolean;
  mode: string;
  outputDir: string;
}
