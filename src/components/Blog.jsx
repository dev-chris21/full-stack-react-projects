import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog, handleDelete, handleLikeUpdate}) => {
  const [showDetails, setShowDetails] = useState(false)

  const toogleDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLike= async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id || blog.user
    }
    
    const updated = await blogService.update(blog.id, updatedBlog)
    handleLikeUpdate(updated)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (

    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toogleDetails}>{showDetails ? 'hide' : 'view'}</button>
      </div>
      <div>
        {
          showDetails && (
            <div>
            <p>{blog.title}</p>
            <p>{blog.author}</p>
            <p>{blog.url}</p>
            <p>Likes:{blog.likes} <button onClick={handleLike}>like</button></p>
            <button onClick={()=>handleDelete(blog.id)}>delete</button>
            </div>
          )
        }
      </div>
  </div>
)}

export default Blog