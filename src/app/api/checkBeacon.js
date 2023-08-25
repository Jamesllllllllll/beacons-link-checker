const puppeteer = require('puppeteer');

export default async function handler(req, res) {
  
  console.log('checkBeacon running...');
  
  const username = req.query.username;
  console.log(`Username: ${username}`);
  
  const url = `https://beacons.ai/${username}`;
  console.log(`URL: ${url}`);
  
  async function startBrowser() {
    let browser;
    try {
      console.log('Opening the browser......');
      browser = await puppeteer.launch({
        headless: 'new',
        args: ['--disable-setuid-sandbox'],
        ignoreHTTPSErrors: true,
      });
    } catch (err) {
      console.log('Could not create a browser instance => : ', err);
    }
    return browser;
  }

  let browserInstance = startBrowser();

  const scraper = async (browser, url) => {
    let page = await browser.newPage();
    console.log(`Navigating to ${url}...`);
    await page.goto(url);
    // Wait for the required DOM to be rendered
    await page.waitForSelector('.Links');
    // Get the link containers
    let urls = await page.$$eval('center.RowLink', (links) => {
      // Extract the links from the data
      links = links.map((el) => el.querySelector('a').href);
      return links;
    });
    console.log(urls);
  }

  const scrapeAll = async (browserInstance, url) => {
    let browser;
    try {
      browser = await browserInstance;
      await scraper(browser, url);
    } catch (err) {
      console.log('Could not resolve the browser instance => ', err);
    }
  }

  //Start the browser and create a browser instance
  // Pass the browser instance to the scraper controller
  const links = await scrapeAll(browserInstance, url);

  res.send(JSON.stringify(links));
}
