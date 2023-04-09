const express = require('express');
const app = express();

app.use(express.json());

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

//event handler that is used to handle HTTP GET requests made to the application's / root:
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

//event handler that handles HTTP GET requests made to the persons path of the application
app.get('/api/persons', (request, response) => {
  response.json(persons);
});

//event handler that handles HTTP GET requests made to the info path
app.get('/info', (request, response) => {
  const date = new Date();
  const count = persons.length;
  response.send(
    `<div>Phonebook has info for ${count} people</div><div>${date}</div>`
  );
});

// event handler for fetching a single resource
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
