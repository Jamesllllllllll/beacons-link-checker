const browserObject = require('./browser');
const scraperController = require('./pageController');

export default async function handler(req, res) {
  console.log('checkBeacon running...')
  const { username } = req.query;
  console.log(username)
  //Start the browser and create a browser instance
  let browserInstance = browserObject.startBrowser();
  // Pass the browser instance to the scraper controller
  const links = scraperController(browserInstance);

  // res.send(JSON.stringify(links));
}

module.exports = { username }