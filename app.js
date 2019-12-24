const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const exec = require('child_process').exec;
const screenshot = require('screenshot-desktop')

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())
const fs = require('fs');
const env = 'win';

function toBase64Thing(file) {
  const file64 = fs.readFileSync(file);
  return new Buffer(file64).toString('base64');
}

app.use(logger("dev"));

app.get('/go', async (req, res) => {
  const url = req.query.url;
  const arrayBase64File = {};

  let process = exec("navigate.bat " + url, (err, stdout, stderr) => {
    if (err){
      console.log(err);
    }
    
    setTimeout(() => {
      screenshot({filename: 'edge-shot.png'}).then((image) => {
        arrayBase64File['edge' + env.toUpperCase()] = toBase64Thing(__dirname + "/edge-shot.png");
        res.send(arrayBase64File);
  
        let close = exec("close.bat");
      });
    }, 3000);
    
  });
})

app.listen(3000);

