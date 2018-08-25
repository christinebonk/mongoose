var express = require("express");
var exphb = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");

var db = require("./models");
var PORT = 3000;
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));https://www.jacobinmag.com/blog