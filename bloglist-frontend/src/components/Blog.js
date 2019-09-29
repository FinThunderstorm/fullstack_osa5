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
        'title': blog.title,
        'author': blog.author,
        'url': blog.url,
        'user': blog.user,
        'likes': blog.likes + 1
      }
      console.log('blogId: ',blogId)
      await blogsService.update(blogId, likedBlog)
    } catch(e){
      console.error(e.message)
    }
  }

  const handleDeleteBlog = (blogId, blog) => async (event) => {
    event.preventDefault()
    try{
      console.log('blogId:', blogId)
      if(window.confirm(`remove blog ${blog.title} by ${blog.author}`)){
        await blogsService.remove(blogId)
      }
    } catch(e){
      console.error(e.message)
    }
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  if(props.blog.user.id === window.localStorage.getItem('loggedBlogAppUser').id){
    return (
      <div style={blogStyle}>
        <div className='blog' onClick={() => toggleVisibility()}>
          {props.blog.title} {props.blog.author}
          <div className='info' style={showWhenVisible}>
            <div>{props.blog.url}</div>
            <div>{props.blog.likes} likes <button onClick={handleLike(props.blog.id, props.blog)}>like</button></div>
            <div>added by {props.blog.user.name}</div>
            <div><button onClick={handleDeleteBlog(props.blog.id, props.blog)}>remove</button></div>
          </div>
        </div>
      </div>
    )
  } else{
    return (
      <div style={blogStyle}>
        <div className='blog' onClick={() => toggleVisibility()}>
          {props.blog.title} {props.blog.author}
          <div className='info' style={showWhenVisible}>
            <div>{props.blog.url}</div>
            <div>{props.blog.likes} likes <button onClick={handleLike(props.blog.id, props.blog)}>like</button></div>
            <div>added by {props.blog.user.name}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Blog