import chromium from '@sparticuz/chromium-min';
import puppeteer from 'puppeteer-core';

export async function GET(req) {
  console.log('checkBeacon running...');
  const username = req.nextUrl.searchParams.get('username');
  console.log(`Username: ${username}`);

  const url = `https://beacons.ai/${username}`;

  if (!url) {
    return res.status(400).send('A url query parameter is required');
  }

  console.log(`URL: ${url}`);

  // const fetchLinks = async () => {
    let browser;
    try {
      console.log('Opening the browser......');
      browser = await puppeteer.launch({
        headless:
          process.env.NODE_ENV === 'production' ? chromium.headless : true,
        args: [...chromium.args, '--disable-web-security', '--font-render-hinting=none', '--disable-setuid-sandbox'],
        executablePath:
          process.env.NODE_ENV === 'production'
            ? await chromium.executablePath(
                `https://beacons-link-checker-git-development-jamesllllllllll.vercel.app/chromium/chromium-pack.tar`
              )
            : 'C:\\Program Files\\Google\\Chrome\\Application\\chrome-win\\chrome.exe',
        //
        ignoreHTTPSErrors: true,
      });
    } catch (err) {
      console.log('Could not create a browser instance => ', err);
    }
    const page = await browser.newPage();
    console.log(`Navigating to ${url}`);
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    // const elementToWaitFor = 'div'
    // console.log(`Waiting for a ${elementToWaitFor} tag or class...`)
    // await page.waitForSelector(elementToWaitFor);
    // console.log(`${elementToWaitFor} tag or class found, finding links...`)
    const text = await page.$$eval('p', text => {
      return text.map(p => p.textContent)
    })
    console.log(text)
    const links = await page.$$eval('.RowLink', (links) => {
      links = links.map((el) => el.querySelector('a').href);
      return links;
    });
    const divs = await page.$$eval('div', divs => divs.length);
    console.log(divs);
    console.log(links);
    console.log('Closing browser...')
    await browser.close();
    console.log('Browser closed.')
    return links;
  // };

  // const links = await fetchLinks();
  // console.log(`Links: ${links}`);
  // return NextResponse.json(links);
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
