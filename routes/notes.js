const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const Article = require('../models/article');

router.post('/', async (req, res) => {
  try {
    const note = await new Note({
      note: req.body.note
    });
    const article = await Article.findByIdAndUpdate(
      { _id: req.body.id },
      { $push: { notes: note.note } },
      { new: true }
    );
    res.send(article);
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
});

module.exports = router;
