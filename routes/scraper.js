const express = require('express');
const router = express.Router();

const cheerio = require('cheerio');
const request = require('request');

const Scrape = require('../models/scrape');

router.post('/', async (req, res) => {
  try {
    const results = [];
    scrapeNews(res, results);
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
});

router.get('/', async (req, res) => {
  try {
    const scrape = await Scrape.findOne({}).sort('created');
    res.send(scrape);
  } catch (err) {
    console.log(`Error ${err.message}`);
  }
});

function scrapeNews(res, results) {
  request(
    'http://www.foxnews.com/category/tech/topics/computers.html',
    async (error, response, html) => {
      const $ = cheerio.load(html);
      $('h2.title').each(function(i, element) {
        const headline = $(element)
          .children()
          .text()
          .trim();
        const link = $(element)
          .children()
          .attr('href');
        const data = {
          headline: headline,
          link: `http://www.foxnews.com/${link}`
        };
        results.push(data);
      });
      $('p.dek').each(function(i, element) {
        const summary = $(element)
          .children()
          .text()
          .trim();
        const data = {
          summary: summary
        };
        results.push(data);
      });
      try {
        let scrape = await new Scrape({ scrape: results });
        await scrape.save();
        res.send(scrape);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    }
  );
}

module.exports = router;