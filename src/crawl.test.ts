import { crawl } from "./crawl";
import fetchMock from "node-fetch";

jest.mock("node-fetch", () => require("fetch-mock-jest").sandbox());

const url = new URL("http://localhost");

// Hide function echo
/* eslint-disable-next-line no-console */
console.info = jest.fn();

describe("crawl", () => {
  it("crawls", async () => {
    fetchMock.get("http://localhost", 200);
    await crawl(url, url, { mode: "all", outputDir: "./out" });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
