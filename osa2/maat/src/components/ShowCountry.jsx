import Match_country from "./MatchCountry";

const Matches = ({matches, search, handleShow}) => {
    return (
        <div>
            {
                matches.length>10? 
                <p>Too many matches, specify another filter</p>
                :<ul>
                    {
                        matches
                        .map(match =><Match_country 
                                    key={match.name.common} 
                                    match={match} 
                                    search={search}
                                    handleShow={handleShow}/>
                        )
                    }
                </ul>
            }
        </div>
    )
}

export default Matches;