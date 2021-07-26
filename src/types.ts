export interface CrawlOptions {
  /** If Javascript in crawled pages should be executed */
  executeJs?: boolean;
  mode: "all" | "origin" | "pathname";
  outputDir: string;
}
