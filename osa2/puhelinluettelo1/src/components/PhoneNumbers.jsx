const ContactLine = ({ person, handleDelete }) => {
    const handleClick = () => {
        handleDelete(person.id);
    }
    return (
        <li className='person'>{person.name}: {person.number}  <button onClick={handleClick}>delete</button></li>
    )
}

const Numbers = ({numbers, handleDelete}) => {
    return (
        <div>
            <h2>Numbers</h2>
            <ul>
                {numbers && numbers.map(p => <ContactLine key={p.id} person={p} handleDelete={handleDelete}/>)}
            </ul>
        </div>
    )
}

export default Numbers;