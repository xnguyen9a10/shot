const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = express();
const puppeteer = require('puppeteer');
const pptrFirefox = require('puppeteer-firefox');
const env = 'mac';
const fs = require('fs');

function toBase64Thing(file) {
  const file64 = fs.readFileSync(file);
  return new Buffer(file64).toString('base64');
}

app.use(logger("dev"));

app.get('/', async (req, res) => {
  const arrayBase64File = {};
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://youtube.com');
    await page.setViewport({
      width: 1920,
      height: 1080
    })

    await page.screenshot({ path: 'chorme.png', fullPage: true });
    await browser.close();
    arrayBase64File['chrome'] = toBase64Thing(__dirname + '\\chorme.png');

  } catch (e) {
    console.log(e)
  }

  try {
    const browserFirefox = await pptrFirefox.launch();
    const pageFirefox = await browserFirefox.newPage();
    await pageFirefox.goto('https://24h.com.vn');
    await pageFirefox.setViewport({
      width: 1920,
      height: 1080
    })

    await pageFirefox.screenshot({ path: 'firefox.png', fullPage: true });

    await browserFirefox.close();
    let base64FireFox = toBase64Thing(__dirname + '\\firefox.png') 
    arrayBase64File['firefox'] = base64FireFox
  } catch (e) {
    console.log(e)
  }
  res.sendFile(arrayBase64File);
})

app.listen(3000);

