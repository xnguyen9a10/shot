const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = express();
const puppeteer = require('puppeteer');
const pptrFirefox = require('puppeteer-firefox');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())
const fs = require('fs');
//COME HERE
const env = 'mac';

function toBase64Thing(file) {
  const file64 = fs.readFileSync(file);
  return new Buffer(file64).toString('base64');
}

app.use(logger("dev"));

app.get('/go', async (req, res) => {
  const url = req.query.url;
  const arrayBase64File = {};
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.setViewport({
      width: 1920,
      height: 1080
    })

    await page.screenshot({ path: 'chorme.png', fullPage: true });
    await browser.close();
    // arrayBase64File['chrome' + env.toUpperCase()] = toBase64Thing(__dirname + '/chorme.png'); //For MAcos or Linux
    arrayBase64File['chrome' + env.toUpperCase()] = toBase64Thing(__dirname + '\\chorme.png'); //For Window
  } catch (e) {
    console.log(e)
  }

  try {
    const browserFirefox = await pptrFirefox.launch();
    const pageFirefox = await browserFirefox.newPage();
    await pageFirefox.goto(url);
    await pageFirefox.setViewport({
      width: 1920,
      height: 1080
    })

    await pageFirefox.screenshot({ path: 'firefox.png', fullPage: true });

    await browserFirefox.close();
    // let base64FireFox = toBase64Thing(__dirname + '/firefox.png') For Macos or Linux;
    let base64FireFox = toBase64Thing(__dirname + '\\firefox.png') //for window
    arrayBase64File['firefox'+ env.toUpperCase()] = base64FireFox
  } catch (e) {
    console.log(e)
  }
  res.send(arrayBase64File);
})

app.listen(3000);

