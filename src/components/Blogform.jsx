import { useState } from "react";

const BlogForm = ({createBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [likes, setLikes] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        createBlog({
            title,
            author,
            url,
            likes: Number(likes)
        })

        setTitle('')
        setAuthor('')
        setUrl('')
        setLikes('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input 
                type="text"
                placeholder="title"
                value={title}
                onChange={({target}) => setTitle(target.value)}
                required
                />
            </div>
            <div>
                <input 
                type="text"
                placeholder="author"
                value={author}
                onChange={({target}) => setAuthor(target.value)}
                required
                />
            </div>
            <div>
                <input 
                type="text"
                placeholder="url"
                value={url}
                onChange={({target}) => setUrl(target.value)}
                required
                />
            </div>
            <div>
                <input 
                type="number"
                placeholder="likes"
                value={likes}
                onChange={({target}) => setLikes(target.value)}
                required
                />
            </div>
            <button type="submit">Add Blog</button>
        </form>
    )
}

export default BlogForm