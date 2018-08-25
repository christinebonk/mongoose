var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
// var db = require("./models");
var PORT = 3000;
var app = express();
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

app.use(bodyParser.urlencoded({ extended: true }));
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});


app.get("/scrape", function(req, res) {
  request("https://www.jacobinmag.com/blog", function(error, response, body) {
    var $ = cheerio.load(body);

    $("article").each(function(i, element) {
      var result = {};

      result.author = $(this)
        .find(".ar-mn__author")
        .find("a")
        .text();
      result.link = $(this)
        .find(".ar-mn__title")
        .find("a")
        .attr("href");
      result.title = $(this)
        .find(".ar-mn__title")
        .find("a")
        .text();
      result.summary = $(this)
        .find(".ar-mn__content")
        .find("p")
        .text();
      result.image = $(this)
        .find(".ar-mn__frame")
        .find("img")
        .attr("src");
        console.log(result)
    });

    
  });
});