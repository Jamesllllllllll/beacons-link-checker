// import chromium from '@sparticuz/chromium-min';
import { NextResponse } from 'next/server';
const puppeteer = require('puppeteer-extra');
const chromium = require('@sparticuz/chromium-min');
require('puppeteer-extra-plugin-stealth/evasions/chrome.app')
require('puppeteer-extra-plugin-stealth/evasions/chrome.csi')
require('puppeteer-extra-plugin-stealth/evasions/chrome.loadTimes')
require('puppeteer-extra-plugin-stealth/evasions/chrome.runtime')
require('puppeteer-extra-plugin-stealth/evasions/defaultArgs') // pkg warned me this one was missing
require('puppeteer-extra-plugin-stealth/evasions/iframe.contentWindow')
require('puppeteer-extra-plugin-stealth/evasions/media.codecs')
require('puppeteer-extra-plugin-stealth/evasions/navigator.hardwareConcurrency')
require('puppeteer-extra-plugin-stealth/evasions/navigator.languages')
require('puppeteer-extra-plugin-stealth/evasions/navigator.permissions')
require('puppeteer-extra-plugin-stealth/evasions/navigator.plugins')
require('puppeteer-extra-plugin-stealth/evasions/navigator.vendor')
require('puppeteer-extra-plugin-stealth/evasions/navigator.webdriver')
require('puppeteer-extra-plugin-stealth/evasions/sourceurl')
require('puppeteer-extra-plugin-stealth/evasions/user-agent-override')
require('puppeteer-extra-plugin-stealth/evasions/webgl.vendor')
require('puppeteer-extra-plugin-stealth/evasions/window.outerdimensions')
require('puppeteer-extra-plugin-user-preferences')
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// All the requires from solution: https://github.com/vercel/pkg/issues/910#issuecomment-926881455

puppeteer.use(StealthPlugin());

export async function GET(req, res) {
  console.log('checkBeacon running...');
  const username = req.nextUrl.searchParams.get('username');
  console.log(`Username: ${username}`);

  const url = `https://beacons.ai/${username}`;

  if (url === 'https://beacons.ai/') {
    return res.status(400).send('A url query parameter is required');
  }

  console.log(`URL: ${url}`);

  // const fetchLinks = async () => {
  let browser;
  try {
    console.log('Opening the browser......');
    browser = await puppeteer.launch({
      args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
      executablePath:
        process.env.NODE_ENV === 'production'
          ? await chromium.executablePath(
              `https://beacons-link-checker-git-development-jamesllllllllll.vercel.app/chromium/chromium-pack.tar`
            )
          : 'C:\\Program Files\\Google\\Chrome\\Application\\chrome-win\\chrome.exe',
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
  } catch (err) {
    console.log('Could not create a browser instance => ', err);
  }
  const page = await browser.newPage();
  console.log(`Navigating to ${url}`);
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  const links = await page.$$eval('.RowLink', (links) => {
    links = links.map((el) => el.querySelector('a').href);
    return links;
  });
  console.log(links);
  // console.log('Closing browser...');
  // await browser.close();
  // console.log('Browser closed.');
  return new NextResponse(JSON.stringify({ data: links }), { status: 200 });
}
