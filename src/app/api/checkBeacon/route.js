// import chromium from '@sparticuz/chromium-min';
import { NextResponse } from 'next/server';
// #region REQUIRE CITY
require('puppeteer-extra-plugin-user-data-dir');
require('puppeteer-extra-plugin-user-preferences');
const puppeteer = require('puppeteer-extra');
const chromium = require('@sparticuz/chromium-min');
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

export async function GET(req, res) {
  console.log('checkBeacon running...');
  const username = req.nextUrl.searchParams.get('username');
  console.log(`Username: ${username}`);

  const url = `https://beacons.ai/${username}`;

  if (!username) {
    return NextResponse.json(
      { error: 'Bad request' },
      { status: 400, statusText: 'Username not provided' }
    );
  }
  console.log(`URL: ${url}`);

  // NOTE: This is currently always returning a 403: Forbidden
  //
  // const response = await fetch(url, { next: { revalidate: 3600 } });
  // const { status } = response;
  // if (status !== 200) {
  //   console.log(status)
  //   return NextResponse.json(
  //     { error: 'Not Found' },
  //     { status: 404, statusText: 'Profile not found' },
  //   );
  // }
  
  let browser;
  try {
    console.log('Opening the browser......');
    browser = await puppeteer.launch({
      args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
      executablePath:
        process.env.NODE_ENV === 'production'
          ? await chromium.executablePath(
              `https://github.com/Sparticuz/chromium/releases/download/v116.0.0/chromium-v116.0.0-pack.tar`
            )
          : process.env.BROWSER_PATH,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
  } catch (err) {
    console.log('Could not create a browser instance => ', err);
  }
  const page = await browser.newPage();
  console.log(`Navigating to ${url}`);
  await page.goto(url);
  console.log('Arrived at ' + url)
  // Try a try/catch block here - implement a pattern
  const links = await page.$$eval('.RowLink', (links) => {
    links = links
      .map((el) => el.querySelector('a').href)
      .filter((link) => !link.startsWith('https://beacons'));
    return links;
  });
  console.log(links);
  // console.log('Closing browser...');
  // await browser.close();
  // console.log('Browser closed.');
  const responseData = new NextResponse(JSON.stringify({ data: links }), { status: 200 });
  // responseData.setHeader('Cache-Control', 'max-age=0, s-maxage=86400');
  return responseData;
}
