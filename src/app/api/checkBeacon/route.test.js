import { startBrowser, goToSite } from './route';

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

  it('should be able to extract links from page', async () => {});

  it('should be able to close browser', async () => {});
  
});
