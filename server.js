var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var articleRoutes = require("./routes/articles");
var scrapeRoutes = require("./routes/scraper");

 var cheerio = require("cheerio");
var routes = require("./routes/scraper")
var PORT = process.env.PORT || 8080;

var app = express();

var exphbs = require("express-handlebars");

app.use(express.static("public"));
 app.engine("handlebars", exphbs({ defaultLayout: "main" }));
 app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use("/api/articles", articleRoutes);

app.use("/scrape", scrapeRoutes)
require("./routes/html-routes.js")(app);

try {
  if (process.env.NODE_ENV === 'production') {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB PROD`);
  } else {
    const connection = await mongoose.connect(
      'mongodb://localhost/nytimesscraper'
    );
    console.log(`Connected to MongoDB DEV`);
  }
} catch (err) {
  err => console.log(`Error: ${err.message}`);
}

// Start the server
app.listen(PORT, function() {
    console.log("App running on port: " + PORT);
  });