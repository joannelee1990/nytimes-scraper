var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
var Article = require("../models/Article")

router.get("/",async (req, res) => {
    try {
        const article = await Article.find();
        res.send(article);
    }
    catch (err) {
        console.log(`Error: ${err.message}`);
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const article = await Article.findByIdAndRemove(req.params.id);
        res.send(article);        
    }
    catch (err) {
        console.log(`Error: ${err.message}`);
    }
})

router.post("/", async (req, res) => {
    try {
        let article = new Article({
            heading: req.body.heading,
            link: req.body.link,
            paragraph: req.body.paragraph
        })
        article = await article.save();
        console.log(article)
        res.send(article);

    }
    catch (err) {
        console.log(`Error: ${err.message}`);
    }
})

router.put("/:id", async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(
            { _id: req.params.id },
            { $push: { note: req.body.note } },
            { new: true }     
        );
        res.send(article);
    } 
    catch (err) {
        console.log(`Error: ${err.message}`);
    }
})

module.exports = router