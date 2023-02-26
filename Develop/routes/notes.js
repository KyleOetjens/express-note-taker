const fb = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const termData = require('../db/db.json');



// GET Route for retrieving all the feedback
fb.get('/', (req, res) => {
  console.log(`in get request`);
    console.info(`${req.method} request received for feedback`);
  
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  // POST Route for a new UX/UI tip
fb.post('/', (req, res) => {
  console.info(`${req.method} request received to add a tip`);
  console.log(req.body);

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
fb.delete(`/api/notes/:id`, (req, res) => {
  console.log(req);
  // Coerce the specific search term to lowercase
  console.info(`${req.method} request received to add a tip`);
  console.log(req.body);
  const noteId = req.params.id
  console.log(noteId);
  // Iterate through the terms name to check if it matches `req.params.term`
  for (let i = 0; i < termData.length; i++) {
    if (noteId !== termData[i].id) {
      const newdata = termData.filter(cat,i)
      console.log(newdata);
      writeToFile(newdata, './db/db.json');
    }
  }
  // Return a message if the term doesn't exist in our DB
  return res.json('No match found');
});

  module.exports = fb;

//CODE I AM JUST PLAYING WITH
/*
  fb.delete('/', (req, res) => {
    console.info(`${req.method} request received to add a tip`);
    console.log(req.body);
  
    const { id } = req.body;
  
    if (req.body) {
      const delNote = {
        title,
        text,
        id,
      };
  
      writeToFile(delNote, './db/db.json');
      res.json(`Tip deleted successfully 🚀`);
    } else {
      res.error('Error in deleting tip');
    }
  });

  fb.delete(`/api/notes/:id`, (req, res) => {
    console.info(`${req.method} request received to add a tip`);
    console.log(req.body);
  
    const noteId = req.params.id
    // Iterate through the terms name to check if it matches `req.params.term`
    for (let i = 0; i < termData.length; i++) {
      if (noteId === termData[i].id) {
        writeToFile(noteId, './db/db.json');
      }
    }
  
    // Return a message if the term doesn't exist in our DB
    return res.json('No match found');
  });

  writeToFile(delNote, './db/db.json');

*/