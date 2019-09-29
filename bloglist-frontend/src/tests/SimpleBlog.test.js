import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from '../components/SimpleBlog'
let component

afterEach(cleanup)


test('has title & author', async () => {
  const blog = {
    title: 'JEST testing',
    author: 'Jest team',
    likes: '1'
  }

  const handleLike = () => {
    blog.likes = blog.likes + 1
  }

  component = render(
    <SimpleBlog blog={blog} onClick={handleLike()}></SimpleBlog>
  )

  const elementti = component.container.querySelector('.title')

  expect(elementti).toHaveTextContent(
    'JEST testing Jest team'
  )
})

test('has likes', async () => {
  const blog = {
    title: 'JEST testing',
    author: 'Jest team',
    likes: '1'
  }

  const handleLike = () => {
  }

  component = render(
    <SimpleBlog blog={blog} onClick={handleLike()}></SimpleBlog>
  )

  const elementti = component.container.querySelector('.info')
  expect(elementti).toHaveTextContent(
    'blog has 1 likes'
  )
})

test('button is clicked twice', async () => {
  const mockHandler = jest.fn()

  const blog = {
    title: 'JEST testing',
    author: 'Jest team',
    likes: '1'
  }

  const elementti = render(
    <SimpleBlog blog={blog} onClick={mockHandler}></SimpleBlog>
  )

  const button = elementti.container.querySelector(
    'button'
  )

  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})