import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  handleNewBlog, title, author, url
}) => {
  return (
    <form onSubmit={handleNewBlog}>
      <div>
        title:
        <input
          type={title.type}
          value={title.value}
          onChange={title.onChange}
        />
      </div>
      <div>
        author:
        <input
          type={author.type}
          value={author.value}
          onChange={author.onChange}
        />
      </div>
      <div>
        url:
        <input
          type={url.type}
          value={url.value}
          onChange={url.onChange}
        />
      </div>
      <div><button>create</button></div>
    </form>
  )
}

BlogForm.propTypes = {
  handleNewBlog: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired
}

export default BlogForm