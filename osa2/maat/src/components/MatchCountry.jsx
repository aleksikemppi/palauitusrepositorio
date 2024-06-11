const ButtonShow = ({handleShow, country}) => {
    const handleClick = () =>{
        handleShow(country)
    }
    return (
        <button onClick={handleClick}>
            Show
        </button>
    )
}

const Match_country = ({match: c_match, search, handleShow: show_country}) => {
    const common = c_match.name.common
    const official = c_match.name.official

    const name = common.toLowerCase().includes(search.toLowerCase())?
                    common : official
    return(
        <li>{name} <ButtonShow handleShow={show_country} country={c_match}/></li>
    )
}

export default Match_country;