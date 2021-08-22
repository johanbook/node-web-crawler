import "jest-fetch-mock";
import * as fs from "./utils/fs";
import setup, { crawl } from "./crawl";
import { fixtures } from "./test";

jest.mock("./utils/fs");

const url = new URL("http://localhost");

const directoryExistsMock = fs.directoryExists as jest.MockedFunction<
  typeof fs.directoryExists
>;

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
    directoryExistsMock.mockReturnValueOnce(true);
    fetchMock.mockResponseOnce(fixtures.HTML.EMPTY);

    setup(url.href, { mode: "all", outputDir: "" });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("exits on non-existent output directory", () => {
    directoryExistsMock.mockReturnValueOnce(false);
    fetchMock.mockResponseOnce(fixtures.HTML.EMPTY);

    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {
      return undefined as never;
    });

    setup(url.href, { mode: "all", outputDir: "does-not-exist" });
    expect(mockExit).toHaveBeenCalledWith(1);

    mockExit.mockRestore();
  });
});
