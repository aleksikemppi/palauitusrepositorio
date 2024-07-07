import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Blog from '../components/Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    user: {
      username: 'testuser'
    }
  }

  const mockCurrentUser = {
    username: 'testuser'
  }

  test('renders title and author, but does not render url and likes by default', () => {
    render(<Blog blog={blog} currentUser={mockCurrentUser} />)

    // Check that title and author are displayed
    expect(screen.getByText('Test Blog Title Test Author')).toBeInTheDocument()

    // Check that url and likes are not displayed
    expect(screen.queryByText('http://testurl.com')).not.toBeInTheDocument()
    expect(screen.queryByText('5 likes')).not.toBeInTheDocument()
  })

  test('url, likes, and user are displayed when the view button is clicked', () => {
    render(<Blog blog={blog} currentUser={mockCurrentUser} />)

    const button = screen.getByText('view')
    fireEvent.click(button)

    expect(screen.getByText('http://testurl.com')).toBeInTheDocument()
    expect(screen.getByText('5 likes')).toBeInTheDocument()
    expect(screen.getByText('testuser')).toBeInTheDocument()
  })

  test('like button is clicked twice, event handler is called twice', () => {
    const mockHandler = jest.fn()

    render(<Blog blog={blog} onLike={mockHandler} currentUser={mockCurrentUser} />)

    const button = screen.getByText('view')
    fireEvent.click(button)

    const likeButton = screen.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
