import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Message from './components/Message';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import noteService from './services/notes';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNumber] = useState(0);
  const [filter, setFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    noteService.getAll().then((notes) => {
      setPersons(notes);
    });
  }, []);

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
      const newNote = { name: newName, number: newNumber };
      noteService.create(newNote).then((res) => {
        setPersons([...persons, res]);
        setNewName('');

        setErrorMessage(`Added ${res.name}`);
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      });
    } else {
      window.alert(`${newName} already exists in phonebook`);
    }
  };

  const deleteHandler = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      noteService.deleteById(id).then((entry) => {
        // console.log('deleted: ', entry);
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Message msg={errorMessage} />

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

      <Persons persons={persons} filter={filter} deleteHandler={deleteHandler} />
    </div>
  );
};

export default App;
