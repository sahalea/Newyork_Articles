const puppeteer = require('puppeteer');

const delay = (time) => new Promise(resolve => setTimeout(resolve, time));

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('http://localhost:3000');

  // Wait for the loading message
  await page.waitForSelector('.loading h4');
  const loadingMessage = await page.$eval('.loading h4', el => el.textContent);
  console.assert(loadingMessage === 'Fetching Articles...', `Expected "Fetching Articles..." but got "${loadingMessage}"`);

  await delay(2000);
  await page.waitForSelector('.search-input');

  await delay(2000);
  // Get the list of articles
  const articlesBeforeSearch = await page.$$('.article-list-item');
  console.assert(articlesBeforeSearch.length > 0, 'Expected articles to be displayed before search');


  await delay(2000);
  const articlesAfterSearch = await page.$$('.article-list-item');
  console.assert(articlesAfterSearch.length > 0, 'Expected filtered articles to be displayed');

  await delay(2000);

  if (await page.$('.pagination-next')) {
    await page.click('.pagination-next');
    await delay(2000);

    await page.waitForSelector('.article-list-item'); 
  }

  const articlesAfterPagination = await page.$$('.article-list-item');
  console.assert(articlesAfterPagination.length > 0, 'Expected articles to be displayed after pagination');


    // Type into the search input
    await page.type('.search-input', 'How a Distinctive');
    await page.waitForSelector('.article-list-item');
    await delay(2000);

  // Close the browser after  done
  // await browser.close();
})();
