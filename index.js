const express = require('express');
const path = require('path');
const cors = require("cors");
const tcmb = require("tcmb-exchange-rates");

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get("/api/:day/:month/:year", (req, res) => {
  const date =  `${req.params.day}/${req.params.month}/${req.params.year}`;
  tcmb(null, date)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.send(err);
    });
});

app.get("/api/today", (req, res) => {
  tcmb(null, 'today')
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.send(err);
    });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Listening on ${port}`);