var mongoose = require("mongoose");

var ArticleSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    trim: true
  },
  link: {
    type: String,
    required: true,
    trim: true
  },
  paragraph: {
    type: String,
    required: true,
    trim: true
  },
  note: [String]
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;