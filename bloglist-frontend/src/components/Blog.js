import React, { useState } from 'react'
import blogsService from '../services/blogs'



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

  const handleLike = (blogId, blog) => async (event) => {
    event.preventDefault()
    try{
      const likedBlog = {
        "title": blog.title,
        "author": blog.author,
        "url": blog.url,
        "user": blog.user,
        "likes": blog.likes + 1
      }
      console.log('blogId: ',blogId)
      await blogsService.update(blogId, likedBlog)
    } catch(e){
      console.error(e.message)
    }
  }



  const showWhenVisible = { display: visible ? '' : 'none'}

  return (
    <div style={blogStyle}>
      <div onClick={() => toggleVisibility()}>
        {props.blog.title} {props.blog.author}
        <div style={showWhenVisible}>
          <div>{props.blog.url}</div>
          <div>{props.blog.likes} likes <button onClick={handleLike(props.blog.id, props.blog)}>like</button></div>
          <div>added by {props.blog.user.name}</div>
        </div>
      </div>
    </div>
  )
}

export default Blog