import jestConfig from '../../../../jest.config';
import { startBrowser, goToSite, fetchLinks } from './route';

describe('GET', () => {
  it('should be able to navigate to a page', async () => {
    // Assemble
    const actualPage = 'https://www.google.com/';

    // Act
    const browser = await startBrowser();
    const page = await goToSite(browser, 'https://google.com');
    const currentPage = page.url();
    const pages = await browser.pages();
    for (let i = 0; i < pages.length; i++) {
      await pages[i].close();
    }
    await browser.close();

    // Assert
    expect(currentPage).toEqual(actualPage);
  });

  it('should be able to extract links from page', async () => {
    // Assemble
    const actualLinks = [
      'https://amzn.to/3wGtudn',
      'http://amazon.com/shop/duckytheyorkie',
      'https://rifrufqueens.com/',
      'https://www.tumbleliving.com/?sca_ref=1809565.H07cyPFlYU',
      'http://dogcrushboutique.com/',
    ];

    // Act
    const browser = await startBrowser();
    const page = await goToSite(browser, 'https://beacons.ai/duckytheyorkie');
    const links = await fetchLinks(page);
    const pages = await browser.pages();
    for (let i = 0; i < pages.length; i++) {
      await pages[i].close();
    }
    await browser.close();

    // Assert
    expect(links).toEqual(actualLinks);
  }, 10000);

  it('should be able to close browser', async () => {
    // Assemble
    const closed = true;

    // Act
    const browser = await startBrowser();
    await goToSite(browser, 'https://google.com/');
    const pages = await browser.pages();
    for (let i = 0; i < pages.length; i++) {
      await pages[i].close();
    }
    await browser.close();
    const browserClosed = !browser.isConnected();

    // Assert
    expect(browserClosed).toBe(closed);
  });
});
