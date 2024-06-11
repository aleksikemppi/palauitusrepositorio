const AddContact = (props) => {
  const {newName, newNumber, handleAddPerson, handleNewName, handleNewNumber} = props;
  return (
      <form onSubmit={handleAddPerson}>
          <h3>Add a new contact:</h3>
          <div>name: <input value={newName} onChange={handleNewName}/></div>
          <div>number: <input value={newNumber} onChange={handleNewNumber} /></div>
          <button type="submit">add</button>
      </form>
  )
}

export default AddContact;