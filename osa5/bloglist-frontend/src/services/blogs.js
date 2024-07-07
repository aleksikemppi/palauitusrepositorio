import axios from 'axios'
const blogBaseUrl = '/api/blogs'

let authToken = null

const setToken = newToken => {
  authToken = `Bearer ${newToken}`
}

const getAllBlogs = () => {
  const request = axios.get(blogBaseUrl)
  return request.then(response => response.data)
}

const createBlog = async (blogData) => {
  const config = {
    headers: { Authorization: authToken }
  }
  const response = await axios.post(blogBaseUrl, blogData, config)
  return response.data
}

const updateBlog = async (id, updatedBlogData) => {
  const response = await axios.put(`${blogBaseUrl}/${id}`, updatedBlogData)
  return response.data
}

const removeBlog = async (id) => {
  const config = {
    headers: { Authorization: authToken }
  }
  const response = await axios.delete(`${blogBaseUrl}/${id}`, config)
  return response.data
}

export default { getAllBlogs, createBlog, setToken, updateBlog, removeBlog }
