const PersonForm = ({
  onSubmitHandler,
  newName,
  nameChangeHandler,
  newNumber,
  numberChangeHandler,
}) => {
  return (
    <form onSubmit={onSubmitHandler}>
      <div>
        name: <input value={newName} onChange={nameChangeHandler} />
      </div>
      <div>
        number: <input value={newNumber} onChange={numberChangeHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
