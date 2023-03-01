const express = require('express');
const routes = require('./routes');
const path = require('path');
const PORT = 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(`/`,routes);//rout registration

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
); 
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);