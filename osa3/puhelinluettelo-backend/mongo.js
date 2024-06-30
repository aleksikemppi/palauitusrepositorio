const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
const id = process.argv[5];

const url = `mongodb+srv://fullstack:${password}@cluster0.qye0a70.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        if (!name && !number) {
            return Person.find({});
        } else {
            const person = new Person({ name, number, id });
            return person.save();
        }
    })
    .then(result => {
        if (Array.isArray(result)) {
            console.log('Phonebook:');
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`);
            });
        } else {
            console.log(`Added ${name} ${number} to phonebook`);
        }
    })
    .catch(error => {
        console.log('Error:', error.message);
    })
    .finally(() => {
        mongoose.connection.close();
    });

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number,
});

const Person = mongoose.model('Person', personSchema, 'persons');
