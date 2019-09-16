import React from 'react'

const BlogForm = ({
  handleNewBlog, title, author, url, handleTitleChange, handleAuthorChange, handleUrlChange
}) => {
  return (
    <form onSubmit={handleNewBlog}>
      <div>
        title: 
          <input
          type="text"
          value={title}
          name="Title"
          onChange={handleTitleChange}
          />
      </div>
      <div>
        author: 
          <input
          type="text"
          value={author}
          name="Author"
          onChange={handleAuthorChange}
          />
      </div>
      <div>
        url: 
          <input
          type="text"
          value={url}
          name="Url"
          onChange={handleUrlChange}
          />
      </div>
      <div><button>create</button></div>
    </form>
  )
}

export default BlogForm