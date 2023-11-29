## Description

Web-scraper using Nestjs framework Typescript. Idea is to visit any website using puppeteer core lib and fetch details of searched item.

## Pre Requirements

* [puppeteer-core](https://www.npmjs.com/package/puppeteer-core) -  library that helps drive anything that supports DevTools protocol. A lightweight version of Puppeteer that can launch an existing browser installation or connect to a remote one

* [brightdata.com](https://brightdata.com/products/scraping-browser) - web data platfrom used for scraping browser in use with puppeteer-core lib.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```