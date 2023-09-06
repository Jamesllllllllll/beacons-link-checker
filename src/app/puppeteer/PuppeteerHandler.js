require("puppeteer-extra-plugin-user-data-dir");
require("puppeteer-extra-plugin-user-preferences");
const puppeteer = require("puppeteer-extra");
const chromium = require("@sparticuz/chromium-min");
require("puppeteer-extra-plugin-stealth/evasions/chrome.app");
require("puppeteer-extra-plugin-stealth/evasions/chrome.csi");
require("puppeteer-extra-plugin-stealth/evasions/chrome.loadTimes");
require("puppeteer-extra-plugin-stealth/evasions/chrome.runtime");
require("puppeteer-extra-plugin-stealth/evasions/defaultArgs"); // pkg warned me this one was missing
require("puppeteer-extra-plugin-stealth/evasions/iframe.contentWindow");
require("puppeteer-extra-plugin-stealth/evasions/media.codecs");
require("puppeteer-extra-plugin-stealth/evasions/navigator.hardwareConcurrency");
require("puppeteer-extra-plugin-stealth/evasions/navigator.languages");
require("puppeteer-extra-plugin-stealth/evasions/navigator.permissions");
require("puppeteer-extra-plugin-stealth/evasions/navigator.plugins");
require("puppeteer-extra-plugin-stealth/evasions/navigator.vendor");
require("puppeteer-extra-plugin-stealth/evasions/navigator.webdriver");
require("puppeteer-extra-plugin-stealth/evasions/sourceurl");
require("puppeteer-extra-plugin-stealth/evasions/user-agent-override");
require("puppeteer-extra-plugin-stealth/evasions/webgl.vendor");
require("puppeteer-extra-plugin-stealth/evasions/window.outerdimensions");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

class Puppeteer {
  #browser;
  #page;
  constructor() {
    (async () => {
      this.#browser = await this.#startBrowser();
      this.#page = await this.#browser.newPage();
    })();
  }

  async #startBrowser() {
    try {
      this.#browser = await puppeteer.launch({
        args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
        executablePath:
          process.env.NODE_ENV === "production"
            ? await chromium.executablePath(
                "https://beacons-link-checker-git-development-jamesllllllllll.vercel.app/chromium/chromium-pack.tar"
              )
            : "C:\\Program Files\\Google\\Chrome\\Application\\chrome-win\\chrome.exe",
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async goToSite(url) {
    try {
      await this.#page.goto(url);
    } catch (error) {
      console.log(error);
    }
  }
  async captureLinks() {
    try {
      const links = await page.$$eval(".RowLink", (links) => {
        links = links
          .map((el) => el.querySelector("a").href)
          .filter((link) => !link.startsWith("https://beacons"));
        return links;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async closeBrowser() {
    try {
      await this.#browser.close();
    } catch (error) {
      console.log(error);
    }
  }
}
const puppeteerHandler = new Puppeteer();

module.exports = puppeteerHandler;
