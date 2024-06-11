import axios from "axios";

const baseurl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseurl).then(res => res.data)
}

const create = (newPerson) => {
    return axios.post(baseurl, newPerson).then(res => res.data)
}

const remove = (idPerson) => {
    return axios.delete(`${baseurl}/${idPerson}`)
}

const update = (newPerson) => {
    return axios.put(`${baseurl}/${newPerson.id}`, newPerson).then(res => res.data)
}

export default {getAll, create, remove, update};