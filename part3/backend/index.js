const express = require('express');
const app = express();
var morgan = require('morgan');

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

app.use(express.json());
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('derp');
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
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

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (!person) return res.sendStatus(404).end();

  return res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const info = req.body;

  if (!info.name || !info.number) return res.status(400).json({ error: 'missing name or number' });

  if (persons.find((person) => person.name === info.name))
    return res.status(400).json({ error: 'name already exist' });

  const id = Math.floor(Math.random() * 9999999);
  const newPerson = {
    id: id,
    name: info.name,
    number: info.number,
  };

  persons = persons.concat(newPerson);
  res.json(newPerson);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server started on port ${PORT}`);
