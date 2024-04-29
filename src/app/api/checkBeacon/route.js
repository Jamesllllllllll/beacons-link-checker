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
  console.log('waiting for dom content to load...');
  await page.goto(url, { waitUnit: 'domcontentloaded' });
  console.log(`Arrived at ${await page.url()}`);
  return page;
}

export async function fetchLinks(page, url) {
  try {
    await page.waitForSelector('a');
    let message = '';
    console.log('initializing noaccountfound...');

    const links = await page.$$eval(
      'a',
      (anchorTags, url) => {
        let delay = 0;
        return anchorTags
          .map((anchor) => anchor.href)
          .filter((href) => {
            return (
              !href.startsWith(url) &&
              !href.startsWith('https://account.beacons.ai/signup') &&
              !href.startsWith('https://beacons.ai/signup')
            );
          })
          .map((href) => ({
            url: href,
            delay: (delay += 200),
          }));
      },
      url // url from fetchLinks is being passed to page.$$eval here
    );

    console.log(links);

    await page.waitForSelector('center');
    const noAccountFound = await page.$$eval('center', (centerElements) => {
      return centerElements.some((center) =>
        center.textContent.includes('No Beacons account associated with')
      );
    });

    console.log('noAccountFound:');
    console.log(noAccountFound);

    if (noAccountFound) {
      console.log('No Beacons account associated with this URL.');
      const message = 'No account associated with this username';
      return { links: [], message };
    }

    console.log(links);
    console.log(message);
    return { links, message };
  } catch (error) {
    console.error('Error fetching links:', error);
    return { links: [], message: 'Error fetching links' };
  }
}

export const maxDuration = 300; // This function can run for a maximum of 300 seconds

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

  const { links, message } = await fetchLinks(page, url);

  console.log('Closing browser...');
  const pages = await browser.pages();

  for (let i = 0; i < pages.length; i++) {
    console.log(`Closing page: ${JSON.stringify(pages[i])}`);
    await pages[i].close();
  }

  console.log('All pages closed.');
  browser.close();
  console.log('Browser closed.');

  return new NextResponse(
    JSON.stringify({ links: links, message: message }, { status: 200 })
  );
}
