import "jest-fetch-mock";
import setup, { crawl } from "./crawl";

jest.mock("fs", () => ({
  existsSync: () => true,
}));

const url = new URL("http://localhost");

// Hide function echo
/* eslint-disable-next-line no-console */
console.info = jest.fn();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("crawl", () => {
  it("calls fetch", async () => {
    fetchMock.mockResponseOnce("");
    await crawl(url, url, { mode: "all", outputDir: "./out" });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

describe("setup", () => {
  it("works", () => {
    setup(url.href, { mode: "all", outputDir: "" });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
