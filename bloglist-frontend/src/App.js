import React, { useState, useEffect} from 'react';
import Blog from './components/Blog'
import './App.css'
import loginService from './services/login'
import blogsService from './services/blogs'
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

const App = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')
  const [ user, setUser ] = useState(null)
  const [ blogs, setBlogs ] = useState([])
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ errorStyle, setErrorStyle ] = useState('')

  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleAuthorChange = (event) => setAuthor(event.target.value)
  const handleUrlChange = (event) => setUrl(event.target.value)

  const blogFormRef = React.createRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  },[])

  useEffect(() => {
    console.log("testu", user, user !== null)
    if(user !== null){
      blogsService.getAll().then(initialBlogs => {
        console.log("blokit: ",initialBlogs)
        setBlogs(initialBlogs)
      })
    }
  },[user])

  const Notification = ({ message, errorType }) => {
    if(message === null){
      return null
    }
    return (
      <div className={errorType}>
        {message}
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username,
        password,
      })

      

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogsService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(e) {
      setErrorStyle('error')
      setErrorMessage('wrong username or password...')
      setTimeout(() => {
        setErrorMessage(null)
        setErrorStyle('')
      },5000)
      console.error(e.message)
    }
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    try{
      await blogsService.create({author, title, url})
      await setErrorStyle('notification')
      await setErrorMessage(
              `a new blog ${title} by ${author} added`
      )
      await setTitle('')
      await setAuthor('')
      await setUrl('')
      await setTimeout(() => {
              setErrorMessage(null)
              setErrorStyle('')
      },5000)
      
      
    } catch(e){
      console.error(e.message)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} errorType={errorStyle}/>
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={(event) => setUsername(event.target.value)}
              />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={(event) => setPassword(event.target.value)}
              />
          </div>
          <div><button>login</button></div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} errorType={errorStyle}/>
      <div>{user.name} logged in<button onClick={() => window.localStorage.removeItem('loggedBlogAppUser')}>log out</button></div>
      <h1>create new</h1>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm 
          handleNewBlog={handleNewBlog}
          title={title}
          author={author}
          url={url}
          handleTitleChange={handleTitleChange}
          handleAuthorChange={handleAuthorChange}
          handleUrlChange={handleUrlChange}
        />
      </Togglable>  
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}


export default App;
