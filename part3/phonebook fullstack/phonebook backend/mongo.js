const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://ffournat:${password}@cluster0.tqeeu2x.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: String,
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  id: 'c9d37ec9-6c5f-47c8-a625-311d46723b97',
  name: 'Nora',
  number: '03030303',
});

// person.save().then((result) => {
//   console.log('person saved!');
//   mongoose.connection.close();
// });

Person.find({}).then((result) => {
  result.forEach((person) => {
    console.log(person);
  });
  mongoose.connection.close();
});
