const fb = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');




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
      note_id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Tip added successfully 🚀`);
  } else {
    res.error('Error in adding tip');
  }
});

fb.put('/:note_id', (req, res) => {
  console.info(`${req.method} request received to add a tip`);
  console.log(req.body);

  const { note_id } = req.body;

  if (req.body) {
    const editNote = {
      note_id
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