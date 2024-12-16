const mongoose = require('mongoose')

// Validation
// Content must be a string, required and minLenght: 5 char.

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean
})

// Deleting unnecesary '__v' option and
// transforming '_id' object into "id" string

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)

// --------------