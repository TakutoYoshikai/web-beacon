var express = require("express");
var useragent = require("express-useragent");

var app = express();
var log = {};

app.use(useragent.express());

app.get("/wb/:id", function(req, res) {
  var id = req.params.id;
  var ip = req.ip;
  var ua = req.useragent;

  log[ip] = { id: id, ua: ua };
  res.sendFile(__dirname + "/beacon.png");
});

app.get("/third-website", function(req, res) {
  var ip = req.ip;
  var person = log[ip];
  if (!person) {
    res.send("トラッキングするためのデータがありません");
    return;
  }
  res.send("トラックID: " + person.id + "としてトラッキングされています");
});

app.listen(3000);
