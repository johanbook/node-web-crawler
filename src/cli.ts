#!/usr/bin/env node

import { Command } from "commander";

import crawl from "./crawl";

const program = new Command();
program
  .version("1.0.0")
  .name("node-web-crawl")
  .arguments("<url>")
  .description("crawl a site and download all encountered images", {
    url: "initial url where to start crawl",
  })
  .option(
    "-f, --follow <mode>",
    "wich subsequent sites to crawl. Can be 'origin', 'none', 'pathname' or 'all'",
    "origin"
  )
  .option("-o, --output-dir <dir>", "set output directory", "./images")
  .option("-x, --execute-js", "dangerously execute Javascript")
  .action((url, options) => crawl(url, options))
  .parse(process.argv);
