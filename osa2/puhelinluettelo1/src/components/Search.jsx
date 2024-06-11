const Search = ({value, handleFilter}) => {
    return (
        <div>
            <h2>Phonebook</h2>
            <p>
                filter shown with: <input value={value} onChange={handleFilter}/>
            </p>
        </div>
    )
}

export default Search;