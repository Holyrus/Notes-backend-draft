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
// If note doesn't exits server will respond with 404 not found.
app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
      .then(note => {
        if (note) {
          response.json(note);
        } else {
          response.status(404).end();
        }
      })
      .catch(error => next(error));
      // .catch(error => {
      //   console.log(error);
      //   response.status(400).send({ error: 'Malformatted id'});
      // })
})

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// Changing importance 

app.put('/api/notes/:id', (request, response, next) => {
  // For enable validation to editing notes as well

  // const body = request.body;

  // const note = {
  //   content: body.content,
  //   important: body.important,
  // }

  const {content, important} = request.body;

  // Note.findByIdAndUpdate(request.params.id, note, { new: true })
  //   .then(updatedNote => {
  //     response.json(updatedNote)
  //   })
  //   .catch(error => next(error))

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})


// Creating new note in Database

app.post('/api/notes', (request, response, next) => {
  const body = request.body;

  //This validation is not neccesary if we did validation in noteSchema
  // if (body.content === undefined) {
  //   return response.status(400).json({ error: 'content is missing' })
  // }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})