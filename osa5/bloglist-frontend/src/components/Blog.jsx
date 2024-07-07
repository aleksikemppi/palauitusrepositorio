import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, onLike, onRemove, currentUser }) => {
  const [areDetailsVisible, setAreDetailsVisible] = useState(false)

  const toggleDetailsVisibility = () => {
    setAreDetailsVisible(!areDetailsVisible)
  }

  const blogItemStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const actionButtonStyle = {
    marginLeft: 5
  }

  return (
    <div style={blogItemStyle} className="blog-item">
      <div>
        {blog.title} {blog.author}
        <button style={actionButtonStyle} onClick={toggleDetailsVisibility}>
          {areDetailsVisible ? 'hide' : 'view'}
        </button>
      </div>
      {areDetailsVisible && (
        <div>
          <p>{blog.url}</p>
          <p>
            {blog.likes} likes
            <button style={actionButtonStyle} onClick={onLike}>like</button>
          </p>
          <p>{blog.user?.name}</p>
          {currentUser.username === blog.user?.username &&
            <button style={actionButtonStyle} onClick={onRemove}>remove</button>
          }
        </div>
      )}
    </div>
  )
}

export default Blog
