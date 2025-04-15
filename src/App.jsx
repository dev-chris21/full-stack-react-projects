import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/loginform'
import BlogForm from './components/Blogform'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([]) 
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: null,
    type: null
  })

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 

  useEffect( () => {
    const loggedUserJson = 
    window.localStorage.getItem('loggedUser')
    if(loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
      fetchBlogs()
    }
  }, [])

  const fetchBlogs = async () => {
    const blogs = await blogService.getBlogs()
    setBlogs(blogs)
  }


  
  const createBlog = async (blogObject) => {
    try {
      await blogService.create(blogObject)
      const updatedBlog = await blogService.getBlogs()
      setBlogs(updatedBlog)
      setNotification({
        message: `A new blog '${blogObject.title}' 
        by ${blogObject.author} added`,
        type: 'success'
      })
      setTimeout(()=>
        setNotification({message: null,
          type: null}), 5000)
    } catch (error) {
      setNotification({
        message: 'Failed to add blog',
        type: 'error'
      })
      setTimeout(()=>
        setNotification({message: null,
          type: null}), 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      const blogs = await blogService.getBlogs()
      setBlogs(blogs)

      setNotification({
        message: `${user.name} logging in`,
        type: 'success'
      })
      setTimeout(()=>
        setNotification({message: null,
          type: null}), 5000)
    } catch (error){
      setNotification({
        message: 'Failed to log in',
        type: 'error'
      })
      setTimeout(()=>
        setNotification({message: null,
          type: null}), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setBlogs([])
  }

  const handleDeleteBlog = async (id) => {
    const comfirmDelete = window.confirm('Are you sure you want to delete this blog')
    if(!comfirmDelete) return

    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog =>
        blog.id !== id))
    } catch(error) {
      console.error('Failed to delete blog:', error)
    }
  }

  const handleLikeUpdate = updatedBlog => {
      setBlogs(blogs =>
        blogs.map(blog => blog.id ===
          updatedBlog.id ? updatedBlog : blog
        )
      )
  }

  const blogForm = () => {
    return (
    <Togglable buttonLabel='new blog'>
      <BlogForm createBlog={createBlog}/>
    </Togglable>
    )
  }

  const loginForm = () => {
    return (
    <Togglable buttonLabel='log in'>
      <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
    </Togglable>
    )
  }


  if (user === null) {
    return (
      <div>
        {loginForm()}
      </div>
    )
  }

 
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification.message} type={notification.type}/>
      <p>{user.name} logged-in <button onClick={handleLogout}>Logout</button></p>
      {blogForm()}
      {blogs.map(blog =>
        <Blog 
        key={blog.id} 
        blog={blog} 
        handleDelete={handleDeleteBlog}
        handleLikeUpdate={handleLikeUpdate}
        />
      )}
    </div>
  )
}

export default App