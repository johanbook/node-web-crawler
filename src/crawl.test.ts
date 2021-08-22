import "jest-fetch-mock";
import setup, { crawl } from "./crawl";
import { fixtures } from "./test";

jest.mock("fs", () => ({
  existsSync: () => true,
}));

const url = new URL("http://localhost");

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("crawl", () => {
  it("calls fetch", async () => {
    fetchMock.mockResponseOnce(fixtures.HTML.EMPTY);
    await crawl(url, url, { mode: "all", outputDir: "./out" });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

describe("setup", () => {
  it("works", () => {
    fetchMock.mockResponseOnce(fixtures.HTML.EMPTY);
    setup(url.href, { mode: "all", outputDir: "" });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
