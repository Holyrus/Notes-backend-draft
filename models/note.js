// mongoose code

const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

// const url = 'mongodb+srv://rusonypenko:<PASSWORD>@cluster0.cryj8.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0'

// npm installl dotenv
// Create .env file and place -> MONGODB_URI="mongodb+srv://rusonypenko:<PASSWORD>@cluster0.cryj8.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0"
//                               PORT=3001
//Set the Env Veriable into Render by writing Key: MONGODB_URI and Value: mongodb+srv://rusonypenko:<PASSWORD>@cluster0.cryj8.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0

const url = process.env.MONGODB_URI

console.log('Connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.log('Error connecting to MongoDB:', error.message)
  })

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

// const Note = mongoose.model('Note', noteSchema);

module.exports = mongoose.model('Note', noteSchema)

// --------------