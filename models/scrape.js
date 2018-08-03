const mongoose = require('mongoose');

const scrapeSchema = new mongoose.Schema({
  scrape: {
    type: Array
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const Scrape = mongoose.model('Scrape', scrapeSchema);

module.exports = Scrape;