//to run pls write in terminal  =>                    node .\argentina_test.js

const puppeteer = require('puppeteer');

const test_config = {
  url: 'https://testsite.getjones.com/ExampleForm/',
  viewport: { width: 1080, height: 1024 },
  formData: {
    name: 'gal',
    email: 'gal756@gmail.com',
    phone: '+972523014940',
    company: 'Jones',
    employees: '51-500'
  },
  browserOptions: {
    headless: false
  },
  screenshotPath: './screenshots/form_screenshot.png'
};

(async () => {
  // Launch the browser with configurable options
  const browser = await puppeteer.launch(test_config.browserOptions);
  const page = await browser.newPage();

  // Navigate the page to a configurable URL
  await page.goto(test_config.url);

  // Set screen size from config
  await page.setViewport(test_config.viewport);

  // Fill out the form with data from config
  await page.type('#name', test_config.formData.name);
  await page.type('#email', test_config.formData.email);
  await page.type('#phone', test_config.formData.phone);
  await page.type('#company', test_config.formData.company);
  await page.select('#employees', test_config.formData.employees);

  // Take a screenshot with a configurable path
  await page.screenshot({ path: test_config.screenshotPath });

  // Click the "Send Request" button and wait for navigation
  await Promise.all([
    page.click('.primary.button'),
    page.waitForNavigation({ waitUntil: 'networkidle0' }) // Wait for navigation to complete
  ]);

  // Save records of the thank you page
  const h1Text = await page.$eval('h1', element => element.textContent);
  const copyrightNumber = await page.$eval('.copyright.text-center', element => element.textContent);

  // Print it to the console
  console.log(`The test reached the thank you page with the following information:\n` +
    `Header text: "${h1Text}"\n` +
    `Copyright text: "${copyrightNumber}"`);

  await browser.close();
})();
