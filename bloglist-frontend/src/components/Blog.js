import React, { useState } from 'react'



const Blog = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'dotted',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }



  const showWhenVisible = { display: visible ? '' : 'none'}

  return (
    <div style={blogStyle}>
      <div onClick={() => toggleVisibility()}>
        {props.blog.title} {props.blog.author}
        <div style={showWhenVisible}>
          <div>{props.blog.url}</div>
          <div>{props.blog.likes} likes <button>like</button></div>
          <div>added by {props.blog.user.name}</div>
        </div>
      </div>
    </div>
  )
}

export default Blog