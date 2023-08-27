import { NextResponse } from 'next/server';
import chromium from 'chrome-aws-lambda';
import playwright from 'playwright-core';

export async function GET(req) {
  console.log('checkBeacon running...');
  const username = req.nextUrl.searchParams.get('username');
  console.log(`Username: ${username}`);

  const url = `https://beacons.ai/${username}`;

  if (!url) {
    return res.status(400).send('A url query parameter is required');
  }

  console.log(`URL: ${url}`);

  const fetchLinks = async () => {
    let browser;
    try {
      console.log('Opening the browser......');
      browser = await playwright.chromium.launch({
        headless: chromium.headless,
          // process.env.NODE_ENV === 'production' ? chromium.headless : true,
        args: [
          ...chromium.args,
          '--disable-setuid-sandbox',
          '--font-render-hinting=none',
        ],
        executablePath:
          process.env.NODE_ENV === 'production'
            ? await chromium.executablePath
            : 'C:\\Program Files\\Google\\Chrome\\Application\\chrome-win\\chrome.exe',
        //
        ignoreHTTPSErrors: true,
      });
    } catch (err) {
      console.log('Could not create a browser instance => ', err);
    }
    // const context = await browser.newContext();
    const page = await browser.newPage();
    await page.goto(url);
    const links = await page.$$eval('.RowLink', (links) => {
      links = links.map((el) => el.querySelector('a').href);
      return links;
    });
    console.log(links);
    await browser.close();
    return links;
  };

  const links = await fetchLinks();
  console.log(`Links: ${links}`);
  return NextResponse.json(links);
}

//   // Start the browser and create a browser instance
//   async function startBrowser() {
//     let browser;
//     try {
//       console.log('Opening the browser......');
//       browser = await puppeteer.launch({
//         headless: 'new',
//         args: ['--disable-setuid-sandbox'],
//         ignoreHTTPSErrors: true,
//       });
//     } catch (err) {
//       console.log('Could not create a browser instance => : ', err);
//     }
//     return browser;
//   }

//   let browserInstance = startBrowser();

//   const scraper = async (browser, url) => {
//     let page = await browser.newPage();
//     console.log(`Navigating to ${url}...`);
//     await page.goto(url);
//     // Wait for the required DOM to be rendered
//     await page.waitForSelector('.RowLink');
//     // Get the link containers
//     let urls = await page.$$eval('center.RowLink', (links) => {
//       // Extract the links from the data
//       links = links.map((el) => el.querySelector('a').href);
//       return links;
//     });
//     console.log(urls);
//     return urls;
//   };

//   const scrapeAll = async (browserInstance, url) => {
//     let browser;
//     try {
//       browser = await browserInstance;
//       const links = await scraper(browser, url);
//       return links;
//     } catch (err) {
//       console.log('Could not resolve the browser instance => ', err);
//     }
//     console.log('Closing the browser...')
//     await browser.close();
//   };

//   // Pass the browser instance to the scraper controller
//   const links = await scrapeAll(browserInstance, url);
//   console.log(`Links: ${links}`)
//   // const JSONlinks = await JSON.stringify(links);
//   browserInstance.close();
//   return NextResponse.json(links);
// }
