const puppeteer = require('puppeteer');
const fs = require('fs/promises');

async function start() {
    const url = "https://app.box.com/s/448e1d6zw0hvwmekg3nb4bkpsuk0wfhj/file/1300373106323";
    const browser = await puppeteer.launch({headless:"new"});
    const page = await browser.newPage();
    await page.setViewport({ width: 2048, height: 2048 });

    await page.setRequestInterception(true);

    // We don't care about the requests, but we have to 
    // register a function that says this, or they'll
    // be blocked.
    page.on('request', interceptedRequest => {
        interceptedRequest.continue();
    });

    // Listen for responses
    page.on('response', async response => {
        const url = response.url();
        const contentType = response.headers()['content-type'];
        if (contentType == "application/x-font-woff;charset=utf-8")
            return;
        if (contentType == "application/javascript")
            return;

/*      // Here is where I will save the content
        if (contentType && contentType.startsWith('video/mp4')) {
            // Get the content as a Buffer
            const buffer = await response.buffer();

            // Save the file to disk
            const fileName = url.split('?')[0].split('/').pop();
            fs.writeFileSync(fileName, buffer);
            console.log(`File saved: ${fileName}`);
        }
        */
       console.log("[+] url = " + url);
       console.log("[+] content-type = " + contentType);
       if (contentType == "application/json; charset=utf-8") {
        let foo = await response.buffer();
        console.log(foo.toString('utf-8'));
       }
    });

  // Navigate to a website
  
  await page.goto('https://app.box.com/s/448e1d6zw0hvwmekg3nb4bkpsuk0wfhj/file/1300373106323');
  await page.waitForSelector("video");
  await elementHandle.click();
  console.log("[+] got video")
  const elementHandle = await page.$('video');
  await page.waitForTimeout(5000);
  await elementHandle.click();
  

  // Close the browser
  //await browser.close();
}

start();
