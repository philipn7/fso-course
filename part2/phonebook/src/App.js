import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNumber] = useState(0);
  const [filter, setFilter] = useState('');

  const nameChangeHandler = (event) => {
    setNewName(event.target.value);
  };

  const numberChangeHandler = (event) => {
    setNumber(event.target.value);
  };

  const filterHandler = (event) => {
    setFilter(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (
      !persons.some((person) => {
        return person.name === newName;
      })
    ) {
      setPersons([...persons, { name: newName, number: newNumber, id: persons.length + 1 }]);
      setNewName('');
    } else {
      window.alert(`${newName} already exists in phonebook`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} filterHandler={filterHandler} />

      <h2>add a new</h2>

      <PersonForm
        onSubmitHandler={onSubmitHandler}
        newName={newName}
        nameChangeHandler={nameChangeHandler}
        newNumber={newNumber}
        numberChangeHandler={numberChangeHandler}
      />

      <h2>Numbers</h2>

      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
