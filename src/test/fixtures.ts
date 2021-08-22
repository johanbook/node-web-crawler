const BASE_URL = "http://example.com/";

export const URLS = {
  BASE_URL,
  IMAGE: BASE_URL + "my-image.jpeg",
  LINK: BASE_URL + "my-page",
};

export const HTML = {
  DUPLICATE_LINK: `<html><a href="${URLS.LINK}"/><a href="${URLS.LINK}"/></html>`,
  DUPLICATE_IMAGE: `<html><img src="${URLS.IMAGE}"/><img src="${URLS.IMAGE}"/></html>`,
  EMPTY: `<html></html>`,
  SINGLE_IMAGE: `<html><img src="${URLS.IMAGE}"/></html>`,
  SINGLE_LINK: `<html><a href="${URLS.LINK}"/></html>`,
};
