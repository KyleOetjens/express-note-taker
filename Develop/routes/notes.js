const fb = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const termData = require('../db/db.json');



// GET Route for retrieving all the feedback
fb.get('/', (req, res) => {
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
fb.delete(`/`, (req, res) => {
  // Coerce the specific search term to lowercase
  console.info(`${req.method} request received to add a tip`);
  console.log(req.body);

  // Iterate through the terms name to check if it matches `req.params.term`
  for (let i = 0; i < termData.length; i++) {
    if (requestedTerm === termData[i].id) {
      return res.json(termData[i]);
    }
  }

  // Return a message if the term doesn't exist in our DB
  return res.json('No match found');
});
/*fb.get('/:id', (req, res) => {
  console.info(`${req.method} request received to add a tip`);
  console.log(req.body);

  const { id } = req.body;

  if (req.body) {
    const editNote = {
      id
    };

    readFromFile(editNote, './db/db.json');
    res.json(`Tip obtained successfully 🚀`);
  } else {
    res.error('Error in getting tip');
  }
});
/*fb.put('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  res.send('Got a PUT request at /user')
})*/
  module.exports = fb;


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

  fb.delete(`/`, (req, res) => {
    // Coerce the specific search term to lowercase
    console.info(`${req.method} request received to add a tip`);
    console.log(req.body);
  
    // Iterate through the terms name to check if it matches `req.params.term`
    for (let i = 0; i < termData.length; i++) {
      if (requestedTerm === termData[i].id) {
        return res.json(termData[i]);
      }
    }
  
    // Return a message if the term doesn't exist in our DB
    return res.json('No match found');
  });