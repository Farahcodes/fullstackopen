require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.static('build'));

// let persons = [
//   {
//     id: 1,
//     name: 'Arto Hellas',
//     number: '040-123456',
//   },
//   {
//     id: 2,
//     name: 'Ada Lovelace',
//     number: '39-44-5323523',
//   },
//   {
//     id: 3,
//     name: 'Dan Abramov',
//     number: '12-43-234345',
//   },
//   {
//     id: 4,
//     name: 'Mary Poppendieck',
//     number: '39-23-6423122',
//   },
// ];

//event handler that is used to handle HTTP GET requests made to the application's / root:
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

//event handler that handles HTTP GET requests made to the persons path of the application
app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

//event handler that handles HTTP GET requests made to the info path
app.get('/info', (request, response, next) => {
  const date = new Date();
  Person.countDocuments({}, (err, count) => {
    if (err) {
      next(err);
    } else if (count === 0) {
      next(); // Pass to the next middleware function
    } else {
      response.send(
        `<div>Phonebook has info for ${count} people</div><div>${date}</div>`
      );
    }
  });
});

// event handler for fetching a single resource
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        next();
      }
    })
    .catch((error) => next(error));
});

//event handler for adding a new resource
app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing',
    });
  }

  Person.findOne({ name: body.name })
    .then((existingPerson) => {
      if (existingPerson) {
        const updatedPerson = {
          name: body.name,
          number: body.number,
        };

        Person.findByIdAndUpdate(existingPerson._id, updatedPerson, {
          new: true,
        })
          .then((updatedDoc) => {
            response.json(updatedDoc);
          })
          .catch((error) => next(error));
      } else {
        const person = new Person({
          name: body.name,
          number: body.number,
        });

        person
          .save()
          .then((savedPerson) => {
            response.json(savedPerson);
          })
          .catch((error) => next(error));
      }
    })
    .catch((error) => next(error));
});

//event handler for deleting a resource
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    // eslint-disable-next-line no-unused-vars
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
