import { useState, useEffect } from 'react';
import Numbers from './components/PhoneNumbers';
import Search from './components/Search';
import Notification from './components/Notification';
import AddContact from './components/Addperson';
import personService from './services/Persons';


const App = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [search, setSearch] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: 'success' });

  useEffect(() => {
    personService
      .getAll()
      .then(initialContacts => {
        setContacts(initialContacts);
      });
  }, []);

  const handleAddContact = (event) => {
    event.preventDefault();
    if (contacts.some(contact => contact.name === name)) {
      const message = `${name} is already added to phonebook, replace the old number with a new one?`;
      window.confirm(message) && handleUpdateContact(name);
    } else {
      const newContact = { name, number: phone };
      personService
        .create(newContact)
        .then(addedContact => {
          setContacts(contacts.concat(addedContact));
        });
      setNotification({ message: `Added ${newContact.name}`, type: 'success' });
      setTimeout(() => setNotification({ message: '', type: 'success' }), 5000);
      setName('');
      setPhone('');
    }
  };

  const handleUpdateContact = (name) => {
    const contact = contacts.find(c => c.name === name);
    const updatedContact = { ...contact, number: phone };
    personService
      .update(updatedContact)
      .then(updatedContact => {
        setContacts(contacts.map(c => c.name !== name ? c : updatedContact));
      })
      .catch(error => {
        setNotification({ message: `Information of ${name} has already been removed from server`, type: 'error' });
        setTimeout(() => setNotification({ message: '', type: 'success' }), 5000);
        setContacts(contacts.filter(c => c.name !== name));
      });
    setName('');
    setPhone('');
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearch(query);
    setFilteredContacts(contacts.filter(c => c.name.toLowerCase().includes(query.toLowerCase())));
  };

  const handleDeleteContact = (id) => {
    const contactToDelete = contacts.find(c => c.id === id);
    if (window.confirm(`Delete ${contactToDelete.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setContacts(contacts.filter(c => c.id !== id));
        })
        .catch(err => {
          alert('This contact is not found on the server');
        });
    }
  };

  return (
    <div>
      <Search value={search} handleFilter={handleSearchChange} />
      <AddContact
        newName={name}
        newNumber={phone}
        handleNewName={handleNameChange}
        handleNewNumber={handlePhoneChange}
        handleAddPerson={handleAddContact}
      />
      <Notification message={notification.message} className={notification.type} />
      <Numbers numbers={search ? filteredContacts : contacts} handleDelete={handleDeleteContact} />
    </div>
  );
};

export default App;
