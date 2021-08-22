import { fixtures } from "../test";
import * as url from "./url";

describe("shouldCrawlUrl", () => {
  test("origin mode", () => {
    expect(
      url.shouldCrawlUrl(fixtures.URLS.BASE_URL, fixtures.URLS.LINK, "origin")
    ).toBeTruthy();
    expect(
      url.shouldCrawlUrl(
        fixtures.URLS.BASE_URL,
        fixtures.URLS.DIFFERENT_DOMAIN,
        "origin"
      )
    ).toBeFalsy();
  });

  test("pathname mode", () => {
    expect(
      url.shouldCrawlUrl(fixtures.URLS.BASE_URL, fixtures.URLS.LINK, "pathname")
    ).toBeFalsy();
    expect(
      url.shouldCrawlUrl(
        fixtures.URLS.BASE_URL,
        fixtures.URLS.DIFFERENT_DOMAIN,
        "pathname"
      )
    ).toBeFalsy();
  });
});
