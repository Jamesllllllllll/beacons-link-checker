import chromium from '@sparticuz/chromium-min';
import { NextResponse } from 'next/server';
// #region REQUIRE CITY
require('puppeteer-extra-plugin-user-data-dir');
require('puppeteer-extra-plugin-user-preferences');
const puppeteer = require('puppeteer-extra');
// const chromium = require("@sparticuz/chromium-min");
require('puppeteer-extra-plugin-stealth/evasions/chrome.app');
require('puppeteer-extra-plugin-stealth/evasions/chrome.csi');
require('puppeteer-extra-plugin-stealth/evasions/chrome.loadTimes');
require('puppeteer-extra-plugin-stealth/evasions/chrome.runtime');
require('puppeteer-extra-plugin-stealth/evasions/defaultArgs'); // pkg warned me this one was missing
require('puppeteer-extra-plugin-stealth/evasions/iframe.contentWindow');
require('puppeteer-extra-plugin-stealth/evasions/media.codecs');
require('puppeteer-extra-plugin-stealth/evasions/navigator.hardwareConcurrency');
require('puppeteer-extra-plugin-stealth/evasions/navigator.languages');
require('puppeteer-extra-plugin-stealth/evasions/navigator.permissions');
require('puppeteer-extra-plugin-stealth/evasions/navigator.plugins');
require('puppeteer-extra-plugin-stealth/evasions/navigator.vendor');
require('puppeteer-extra-plugin-stealth/evasions/navigator.webdriver');
require('puppeteer-extra-plugin-stealth/evasions/sourceurl');
require('puppeteer-extra-plugin-stealth/evasions/user-agent-override');
require('puppeteer-extra-plugin-stealth/evasions/webgl.vendor');
require('puppeteer-extra-plugin-stealth/evasions/window.outerdimensions');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// All the requires from solution: https://github.com/vercel/pkg/issues/910#issuecomment-926881455

// #endregion

puppeteer.use(StealthPlugin());

export async function startBrowser() {
  let browser;
  try {
    console.log('Opening the browser......');
    return (browser = await puppeteer.launch({
      args: [...chromium.args],
      executablePath:
        process.env.NODE_ENV === 'production'
          ? await chromium.executablePath(
              `https://github.com/Sparticuz/chromium/releases/download/v116.0.0/chromium-v116.0.0-pack.tar`
            )
          : process.env.BROWSER_PATH,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    }));
  } catch (err) {
    console.log('Could not create a browser instance => ', err);
  }
}

export async function goToSite(browser, url) {
  const page = await browser.newPage();
  console.log(`Navigating to ${url}`);
  await page.goto(url);
  console.log(`Arrived at ${await page.url()}`);
  return page;
}

export async function fetchLinks(page) {

  await page.waitForSelector('svg');

  const links = await page.$$eval('.RowLink', (links) => {
    links = links
      .map((el) => el.querySelector('a').href)
      .filter((link) => !link.startsWith('https://beacons'));
    const linkObjects = links.map(function (link) {
      return { url: link, delay: null };
    });
    let delay = 0;
    for (let i = 0; i < linkObjects.length; i++) {
      linkObjects[i].delay = delay;
      delay += 200;
    }
    return linkObjects;
  });

  const noAccountFound = await page.evaluate((searchText) => {
    const allElements = Array.from(document.querySelectorAll('*'));
    return allElements.some((element) =>
      element.textContent.includes(searchText)
    );
  }, 'No Beacons account associated with');

  if (noAccountFound) {
    console.log('No Beacons account associated with this URL.');
    links.push('No account associated with this username');
  }

  console.log(links);
  return links;
}

export async function GET(req, res) {
  console.log('checkBeacon running...');
  const username = req.nextUrl.searchParams.get('username');
  const url = `https://beacons.ai/${username}`;

  if (!username) {
    return NextResponse.json(
      { error: 'Bad request' },
      { status: 400, statusText: 'Username not provided' }
    );
  }

  const browser = await startBrowser();

  const page = await goToSite(browser, url);

  const links = await fetchLinks(page);

  console.log(`Links with delay:\n${JSON.stringify(links)}`);

  console.log('Closing browser...');

  const pages = await browser.pages();

  for (let i = 0; i < pages.length; i++) {
    console.log(`Closing page: ${JSON.stringify(pages[i])}`);
    await pages[i].close();
  }

  console.log('All pages closed.');
  browser.close();
  console.log('Browser closed.');

  return new NextResponse(JSON.stringify({ data: links }), { status: 200 });
}
