import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div className='blog'>
    <div className='title'>
      {blog.title} {blog.author}
    </div>
    <div className='info'>
      blog has {blog.likes} likes
      <button onClick={onClick} className='button'>like</button>
    </div>
  </div>
)

export default SimpleBlog