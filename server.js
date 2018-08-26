var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
var db = require("./models");
var PORT = process.env.PORT || 3000;
var app = express();
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
var routes = require("./controllers/controllers.js");

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, function(){
    mongoose.connection.db.dropDatabase();
});

app.use(bodyParser.urlencoded({ extended: true }));
routes(app);
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));



app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});




