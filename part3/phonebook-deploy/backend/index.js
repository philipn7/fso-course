require('dotenv').config();
const express = require('express');
const app = express();
var morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.static('build'));

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get('/info', (req, res) => {
  const length = persons.length;
  const date = new Date();
  const info = `
  <div>Phonebook has info for ${length} people</div>
  <br>
  <div>${date}</div>
  `;
  res.send(info);
});

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndRemove(id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

app.post('/api/persons', (req, res) => {
  const info = req.body;

  if (!info.name || !info.number) return res.status(400).json({ error: 'missing name or number' });

  const newPerson = new Person({
    name: info.name,
    number: info.number,
    date: new Date(),
  });

  newPerson.save().then((person) => {
    console.log(person);
    res.json(person);
  });
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server started on port ${PORT}.`);
