import "jest-fetch-mock";
import { crawl } from "./crawl";

const url = new URL("http://localhost");

// Hide function echo
/* eslint-disable-next-line no-console */
console.info = jest.fn();

describe("crawl", () => {
  it("crawls", async () => {
    fetchMock.mockResponseOnce("");
    await crawl(url, url, { mode: "all", outputDir: "./out" });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
