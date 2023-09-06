import { startBrowser, goToSite, fetchLinks } from './route';

describe('GET', () => {
  it('should be able to navigate to a page', async () => {
    // Assemble
    const actualPage = 'https://www.google.com/';

    // Act
    const browser = await startBrowser();
    const page = await goToSite(browser, 'https://google.com');
    const currentPage = page.url();
    page.close();

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
    page.close();

    // Assert
    expect(links).toEqual(actualLinks);
  });

  it('should be able to close browser', async () => {
    const browser = await startBrowser();
    console.log(`Browser should be connected: ${browser.isConnected()}`)
    const page = await goToSite(browser, 'https://google.com/');
    await page.close();
    console.log(`Browser should NOT be connected: ${JSON.stringify(page)}`)
  });

});
