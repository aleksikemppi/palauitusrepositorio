import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('form calls the event handler with the right details when a new blog is created', () => {
  const createBlog = jest.fn()

  render(<BlogForm addBlog={createBlog} />)

  const titleInput = screen.getByTestId('title-input')
  const authorInput = screen.getByTestId('author-input')
  const urlInput = screen.getByTestId('url-input')
  const submitButton = screen.getByTestId('submit-blog-button')

  fireEvent.change(titleInput, { target: { value: 'Test Blog Title' } })
  fireEvent.change(authorInput, { target: { value: 'Test Author' } })
  fireEvent.change(urlInput, { target: { value: 'http://testurl.com' } })

  fireEvent.click(submitButton)

  expect(createBlog).toHaveBeenCalledWith({
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com'
  })
  expect(createBlog.mock.calls).toHaveLength(1)
})
