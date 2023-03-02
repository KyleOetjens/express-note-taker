const router = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const termData = require('../db/db.json');
const { json } = require('express');


// GET Route for retrieving all the feedback
router.get('/', (req, res) => {
    console.info(`${req.method} request received for feedback`);
  
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  // POST Route for a new UX/UI tip
router.post('/', (req, res) => {
  console.info(`${req.method} request received to add a tip`);
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Tip added successfully 🚀`);
  } else {
    res.error('Error in adding tip');
  }
});
// Delete a note
router.delete(`/:id`, (req, res) => {
  console.info(`${req.method} request received to ${req.method} a note`);
  const noteId = req.params.id
  const newTerms = readFromFile('./db/db.json',`utf-8`).then((data) => {
    try {
      parsedItem = [].concat(JSON.parse(data));
    } catch (err) {
      console.log(err);
      parsedItem = [];
    }
    return parsedItem
  })
  .then((data)=>{
    data = data.filter(note => note.id !== noteId)
      writeToFile('./db/db.json',data);
    
    return res.json('deleted');
  })
});
  
  module.exports = router;

