const { username } = require('./checkBeacon/route');

const scraperObject = {
  url: `https://beacons.ai/${username}`,
  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);
    // Wait for the required DOM to be rendered
    await page.waitForSelector('.Links');
    // Get the link containers
    let urls = await page.$$eval('center.RowLink', (links) => {
      // Extract the links from the data
      links = links.map((el) => el.querySelector('a').href);
      return links;
    });
    console.log(urls);
  },
};

module.exports = scraperObject;
