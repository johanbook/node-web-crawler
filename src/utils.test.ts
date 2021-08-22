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

describe("createImageName", () => {
  it("generates file name", () => {
    const name = utils.createImageName("file.png");
    expect(name).toBe("uuid.png");
  });
});

describe("fetchAndSaveImage", () => {
  it("works", async () => {
    fetchMock.mockResponseOnce("");
    await utils.fetchAndSaveImage(new URL("http://localhost"), {
      mode: "all",
      outputDir: "./out",
    });
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
});
