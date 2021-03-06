var db = require("../models");
var bodyparser = require("body-parser");
var request = require("request");
var cheerio = require("cheerio");


function routes(app) {

  app.get("/", function(req, res){
    db.Article.find({}).sort('-created_at')
      .then(function(dbArticle) {
        var aObj = { articles: dbArticle }
        res.render("index", aObj)
      })
      .catch(function(err) {
        res.json(err);
      });
  });


  app.get("/myarticles", function(req, res){
    db.Article.find({saved: true})
      .then(function(dbArticle) {
        var sObj = { saved: dbArticle }
        res.render("saved", sObj);
      })
      .catch(function(err) {
        res.json(err);
      });
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
  		db.Article.create(result)
  	    .then(function(dbArticle) {
  	       res.json(dbArticle);
  	    })
  	    .catch(function(err) {
  	    });
      });
    });
  });

  

  app.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id })
      .populate("note")
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.post("/articles/:id", function(req, res) {
    db.Note.create(req.body)
      .then(function(dbNote) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
      })
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.put("/saved/:id", function(req,res) {
    db.Article.findOneAndUpdate({ _id: req.params.id}, { $set: { saved: true }})
    .then(function(dbArticle) {
        res.json(dbArticle);
      })
    .catch(function(err) {
        res.json(err);
      });
  })

  app.put("/unsave/:id", function(req,res) {
    db.Article.findOneAndUpdate({ _id: req.params.id}, { $set: { saved: false }})
    .then(function(dbArticle) {
        res.json(dbArticle);
      })
    .catch(function(err) {
        res.json(err);
      });
  })
};

module.exports = routes;