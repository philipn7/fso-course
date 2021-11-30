const Persons = ({ persons, filter, deleteHandler }) => {
  return (
    <div>
      {persons
        .filter((person) => {
          return person.name.toLowerCase().includes(filter.toLowerCase());
        })
        .map((person) => {
          return (
            <div key={person.name}>
              {person.name} {person.number}{' '}
              <button onClick={() => deleteHandler(person.id, person.name)}>delete</button>
            </div>
          );
        })}
    </div>
  );
};

export default Persons;
