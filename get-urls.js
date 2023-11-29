const puppeteer = require('puppeteer');
const fs = require('fs/promises');


let urllist = ["x"];

async function start() {
    // Create an instance of Puppeteer. The latest version gives me a warning
    // mesage if I don't add {headless:'new'}, I don't know why this is
    // important.

    for (let i=1; i <= 5; i++) {
        const browser = await puppeteer.launch({headless:"new"});
        const page = await browser.newPage();
        await page.setViewport({ width: 2048, height: 2048 });

        const url = "https://app.box.com/s/448e1d6zw0hvwmekg3nb4bkpsuk0wfhj?page="
            + i + "&showParentPath=false&sortColumn=name";

        console.log("[ ] fetching page " + i);
        await page.goto(url);
        

        await page.waitForSelector("A.item-link");
    
        console.log("[+] found page " + i);

        // Get a list of URLs
        const list = await page.evaluate(() => {
            const elements = document.querySelectorAll('a.item-link');
            return Array.from(elements).map(element => element.href);
        });
    
        console.log("[+] found " + list.length + " urls");
        urllist.push(...list);
        await browser.close();
    }

    console.log(urllist);

    console.log("[+] FIN");
}

start();