import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import './index.css'
import Notification from './components/notifications'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogList, setBlogList] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    blogService
      .getAllBlogs()
      .then(blogs => setBlogList(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setCurrentUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (message, duration = 5000) => {
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, duration)
  }

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setCurrentUser(user)
      showNotification('Logged in successfully')
    } catch (exception) {
      showNotification('Wrong credentials')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setCurrentUser(null)
      showNotification('Logged out')
    } catch (exception) {
      showNotification('Logout failed')
    }
  }

  const handleRemoveClick = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      if (blog.user.username !== currentUser.username) {
        showNotification('You can only remove blogs added by you')
        return
      }
      try {
        await blogService.removeBlog(blog.id)
        setBlogList(blogList.filter(b => b.id !== blog.id))
        showNotification('Blog removed')
      } catch (error) {
        showNotification('Failed to delete blog')
      }
    }
  }

  const addBlog = async (blogData) => {
    try {
      const returnedBlog = await blogService.createBlog(blogData)
      returnedBlog.user = currentUser
      setBlogList(blogList.concat(returnedBlog))
      showNotification(`A new blog ${blogData.title} by ${blogData.author} added`)
    } catch (error) {
      showNotification('Failed to add blog')
      console.error(error)
    }
  }

  const updateBlogList = updatedBlog => {
    setBlogList(blogList.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
  }

  const handleLike = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      const returnedBlog = await blogService.updateBlog(blog.id, updatedBlog)
      updateBlogList(returnedBlog)
    } catch (error) {
      showNotification('Failed to like blog')
    }
  }

  if (currentUser === null) {
    return (
      <div>
        <Notification message={notificationMessage} />
        <h2>Blogs</h2>
        <Togglable buttonLabel='Login'>
          <LoginForm handleLogin={handleLogin} />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>

      <Notification message={notificationMessage} />

      <div>
        {currentUser.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>

      <Togglable buttonLabel='new blog'>
        <BlogForm addBlog={addBlog} />
      </Togglable>

      <h2>Blogs</h2>
      {blogList
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog} onLike={() => handleLike(blog)}
            onRemove={() => handleRemoveClick(blog)}
            currentUser={currentUser}
          />
        )}
    </div>
  )
}

export default App
