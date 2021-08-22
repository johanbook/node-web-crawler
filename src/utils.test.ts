import "jest-fetch-mock";
import * as utils from "./utils";
import fs from "fs";

jest.mock("fs");
jest.mock("uuid", () => ({
  v4: () => "uuid",
}));

// Hide function echo
/* eslint-disable-next-line no-console */
console.log = jest.fn();

const writeFileMock = fs.writeFileSync as jest.Mock<typeof fs.writeFileSync>;

describe("createImageName", () => {
  it("generates file name", () => {
    const name = utils.createImageName("file.png");
    expect(name).toBe("uuid.png");
  });
});

describe("fetchAndSaveImage", () => {
  beforeEach(() => {
    writeFileMock.mockReset();
  });

  it("works", async () => {
    fetchMock.mockResponseOnce("");
    await utils.fetchAndSaveImage(new URL("http://localhost"), {
      mode: "all",
      outputDir: "./out",
    });
    expect(writeFileMock).toHaveBeenCalledTimes(1);
  });

  it("handles failing request", async () => {
    fetchMock.mockResponseOnce("", { status: 418 });
    await utils.fetchAndSaveImage(new URL("http://localhost"), {
      mode: "all",
      outputDir: "./out",
    });
    expect(writeFileMock).not.toHaveBeenCalled();
  });
});
