import "jest-fetch-mock";
import * as image from "./utils/image";
import * as fs from "./utils/fs";
import crawl from "./crawl";
import { fixtures } from "./test";
import { CrawlOptions } from "./types";

jest.mock("./utils/fs");
jest.mock("./utils/image");

const url = new URL(fixtures.URLS.BASE_URL);

const OPTIONS: CrawlOptions = { mode: "all", outputDir: "my-dir" };

const fetchAndSaveImageMock = image.fetchAndSaveImage as jest.MockedFunction<
  typeof image.fetchAndSaveImage
>;
const directoryExistsMock = fs.directoryExists as jest.MockedFunction<
  typeof fs.directoryExists
>;

beforeEach(() => {
  fetchAndSaveImageMock.mockReset();
  fetchMock.resetMocks();
});

describe("crawl", () => {
  it("calls fetch", async () => {
    directoryExistsMock.mockReturnValueOnce(true);
    fetchMock.mockResponseOnce(fixtures.HTML.EMPTY);

    await crawl(url.href, OPTIONS);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("ignores duplicate links", async () => {
    directoryExistsMock.mockReturnValueOnce(true);
    fetchMock.mockResponseOnce(fixtures.HTML.DUPLICATE_LINK);

    const links = [];
    const handleCrawlLink = (url: string) => links.push(url);

    await crawl(url.href, { ...OPTIONS, onCrawlLink: handleCrawlLink });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(links).toEqual([fixtures.URLS.BASE_URL, fixtures.URLS.LINK]);
  });

  it("ignores duplicate images", async () => {
    directoryExistsMock.mockReturnValueOnce(true);
    fetchMock.mockResponseOnce(fixtures.HTML.DUPLICATE_IMAGE);

    await crawl(url.href, OPTIONS);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchAndSaveImageMock).toHaveBeenCalledTimes(1);
  });

  it("exits on non-existent output directory", async () => {
    directoryExistsMock.mockReturnValueOnce(false);
    fetchMock.mockResponseOnce(fixtures.HTML.EMPTY);

    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {
      return undefined as never;
    });

    await crawl(url.href, { ...OPTIONS, outputDir: "does-not-exist" });
    expect(mockExit).toHaveBeenCalledWith(1);

    mockExit.mockRestore();
  });
});
