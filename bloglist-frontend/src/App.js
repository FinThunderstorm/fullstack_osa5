import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import './App.css'
import loginService from './services/login'
import blogsService from './services/blogs'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useField } from './hooks'

const App = () => {
  const username = useField('text')
  const password = useField('password')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const [ user, setUser ] = useState(null)
  const [ blogs, setBlogs ] = useState([])
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ errorStyle, setErrorStyle ] = useState('')

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
    console.log('user: ', user, user !== null)
    if(user !== null){
      blogsService.getAll().then(initialBlogs => {
        console.log('blokit: ',initialBlogs)
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
      username.reset()
      password.reset()

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
      await blogsService.create({ author, title, url })
      await setErrorStyle('notification')
      await setErrorMessage(
        `a new blog ${title.value} by ${author.value} added.`
      )
      await title.reset()
      await author.reset()
      await url.reset()
      await setTimeout(() => {
        setErrorMessage(null)
        setErrorStyle('')
      },5000)


    } catch(e){
      console.error(e.message)
    }
  }

  const palautaResetitta = (resetillinen) => {
    const resetiton = {
      'value': resetillinen.value,
      'type': resetillinen.type,
      'onChange': resetillinen.onChange
    }
    return( resetiton )
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} errorType={errorStyle}/>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input { ...palautaResetitta(username) }/>
          </div>
          <div>
            password
            <input { ...palautaResetitta(password) }/>
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
          title={palautaResetitta(title)}
          author={palautaResetitta(author)}
          url={palautaResetitta(url)}
        />
      </Togglable>
      {blogs.sort((a,b) => b.likes-a.likes).map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
    </div>
  )
}


export default App
