const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2];

const url = `mongodb+srv://rusonypenko:${password}@cluster0.cryj8.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema);

//Creating and saving objects

// const note = new Note({
//     content: 'Third note',
//     important: true,
// })

// note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })

// Fetching objects from the database

// Possibble restriction as a - 
// Note.find({ important: true }).then(result => {
    // ...
// })

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close();
})

// Use node mongo.js <PASSWORD>