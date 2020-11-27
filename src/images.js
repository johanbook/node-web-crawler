#!/usr/bin/env node

const chalk = require("chalk");
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

function createImageName(url) {
  let extension = path.extname(url);
  return uuid() + extension;
}

async function fetchAndSaveImage(url, options) {
  const resp = await fetch(url).catch(() => {
    /* eslint-disable-next-line no-console */
    console.error(chalk.red(`Could not fetch ${url}`));
  });
  if (!resp.ok) {
    return;
  }

  const buffer = await resp.buffer();
  const name = createImageName(url.pathname);

  /* eslint-disable-next-line no-console */
  console.log(
    chalk`{green \t\u2714 }{gray Saving} {green ${
      url.host + url.pathname
    }} {gray as} {green ${name}}`
  );
  fs.writeFileSync(`${options.outputDir}/${name}`, buffer);
}

exports.createImageName = createImageName;
exports.fetchAndSaveImage = fetchAndSaveImage;
