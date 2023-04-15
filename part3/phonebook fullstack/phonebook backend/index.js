const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.static('build'));

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

//event handler for deleting a single resource
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const newPersons = persons.filter((person) => person.id !== id);
  persons = newPersons;
  response.status(204).end();
});

//event handler for adding a new resource
app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing',
    });
  }

  const existingPerson = persons.find(
    (person) => person.name === body.name
  );

  if (existingPerson) {
    return response.status(400).json({
      error: 'name must be unique',
    });
  }

  const person = {
    id: Math.floor(Math.random() * 1000000),
    name: body.name,
    number: body.number,
  };

  const newPersons = persons.concat(person);
  persons = newPersons;

  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
