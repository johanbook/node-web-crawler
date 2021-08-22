const BASE_URL = "http://example.com/";

export const STRING_URLS = {
  BASE_URL,
  DIFFERENT_DOMAIN: "http://other.domain.com",
  IMAGE: BASE_URL + "my-image.jpeg",
  LINK: BASE_URL + "my-page",
};

const URLS: Record<string, URL> = {};
for (const [name, value] of Object.entries(STRING_URLS)) {
  URLS[name] = new URL(value);
}
export { URLS };

export const HTML = {
  DUPLICATE_LINK: `<html><a href="${STRING_URLS.LINK}"/><a href="${STRING_URLS.LINK}"/></html>`,
  DUPLICATE_IMAGE: `<html><img src="${STRING_URLS.IMAGE}"/><img src="${STRING_URLS.IMAGE}"/></html>`,
  EMPTY: `<html></html>`,
  EXTERNAL_LINK: `<html><a href="${STRING_URLS.DIFFERENT_DOMAIN}"/></html>`,
  SCRIPT: `<html><script>window.SCRIPT_TAG = "my-script-run";</script></html>`,
  SINGLE_IMAGE: `<html><img src="${STRING_URLS.IMAGE}"/></html>`,
  SINGLE_LINK: `<html><a href="${STRING_URLS.LINK}"/></html>`,
};
