import "jest-fetch-mock";
import * as image from "./utils/image";
import * as fs from "./utils/fs";
import crawl from "./crawl";
import { fixtures } from "./test";
import { CrawlOptions } from "./types";

jest.mock("./utils/fs");
jest.mock("./utils/image");

const BASE_URL = "http://localhost/";
const url = new URL(BASE_URL);

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

  it("can crawl link", async () => {
    directoryExistsMock.mockReturnValueOnce(true);
    fetchMock.mockResponseOnce(fixtures.HTML.SINGLE_LINK);

    const links = [];
    const handleCrawlLink = (url: string) => links.push(url);

    await crawl(url.href, { ...OPTIONS, onCrawlLink: handleCrawlLink });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(links).toEqual([BASE_URL, BASE_URL + "my-page"]);
  });

  it("can crawl image", async () => {
    directoryExistsMock.mockReturnValueOnce(true);
    fetchMock.mockResponseOnce(fixtures.HTML.SINGLE_IMAGE);

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
