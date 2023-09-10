// const assert = require('assert');
const puppeteerHandler = require('../PuppeteerHandler');

//@Jamesllllllllll if you could help with these tests that would be great!
describe('PuppeteerHandler', () => {
  it('should be able to navigate to a page', async () => {
    // Assemble
    const actualPage = 'https://google.com';
    const browser = puppeteerHandler;
    console.log(browser);

    // Act
    // await puppeteerHandler.startBrowser();
    // await puppeteerHandler.goToSite('https://google.com');
    // const currentPage = puppeteerHandler.page.url();

    // // Assert
    // expect(currentPage).toEqual(actualPage);
  });

  it('should be able to extract links from page', async () => {});

  it('should be able to close browser', async () => {});
});
