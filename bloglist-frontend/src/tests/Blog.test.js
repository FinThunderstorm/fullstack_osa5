import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'
import './setupTests.js'
let component

beforeEach(() => {
  const blog = {
    title: 'Testing frontend',
    author: 'Matti Luukkainen',
    url: 'https://fullstackopen.com',
    user: '5d204cb2f940701dc210d087',
    likes: 0,
    id: '5d8e08ea6ffd4c2262034dd2'
  }

  const user = {
    name: 'root user',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjVkMjA0Y2IyZjk0MDcwMWRjMjEwZDA4NyIsImlhdCI6MTU2OTU4OTEwNn0.fRqx-lvIBIrY9_XnZ_C_2JqFBFnNa4o5wi_g-296zjk',
    username: 'root'
  }
  localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

  component = render(
    <Blog key={blog.id} blog={blog}/>
  )
})

test('when fired up shows just title and author', () => {
  const elementti = component.container.querySelector('.info')

  expect(elementti).toHaveStyle('display: none')
})

test('when clicked blog it shows the rest', () => {
  const blogi = component.container.querySelector('.blog')
  fireEvent.click(blogi)
  const elementti = component.container.querySelector('.info')
  expect(elementti).not.toHaveStyle('display: none')
})