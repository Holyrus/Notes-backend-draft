// Must be imported before Note model!
// Env variables defined in .env can be taken from -
require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors')
const corsOptions = {
  origin: ["http://localhost:5173"],
}

app.use(cors(corsOptions));

app.use(express.static('dist'));

app.use(express.json());

// Importing module
const Note = require('./models/note.js');

// let notes = [
//     {
//       id: "1",
//       content: "HTML is easy",
//       important: true
//     },
//     {
//       id: "2",
//       content: "Browser can execute only JavaScript",
//       important: false
//     },
//     {
//       id: "3",
//       content: "GET and POST are the most important methods of HTTP protocol",
//       important: true
//     }
//   ]

// app.get('/', (request, response) => {
//     response.send('<h1>Hello Ruslan!</h1>')
// })

// Get all notes from database

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
    })
})

// Get individual note based on ID

app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
      response.json(note);
    })
})

// app.delete('/api/notes/:id', (request, response) => {
//   const id = request.params.id;
//   notes = notes.filter(note => note.id !== id);

//   response.status(204).end();
// })


// Creating new note in Database

app.post('/api/notes', (request, response) => {
  const body = request.body;

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content is missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})