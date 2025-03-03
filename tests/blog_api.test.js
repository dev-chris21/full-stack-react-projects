const { test, after, describe, beforeEach} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')

api = supertest(app)

   

describe('basic crud operations on the blogs api', () => {
    let blog1, blog2

    beforeEach(async()=>{
        await Blog.deleteMany({})

    blog1 = await Blog.create({
        title:'React patterns',
        author:'Micheal Chan',
        url:'https://reactpatterns.com',
        likes: 10
    }),
    blog2 = await Blog.create({
        title:'Go to statement considered harmful',
        author:'Edsger w. Dijkstra',
        url:'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
    })
})
    test('post request can be made with a valid blog post', async () => {
        const newBlog = {
                title: "First class tests",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
                likes: 10,
              }
        
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
            const response = await api.get('/api/blogs')
    
            const titles = response.body.map(t => t.title)
        
        assert.strictEqual(response.body.length, 3)
        assert(titles.includes('First class tests'))
                
    }),

    test('get request can be made if posts have been added', async () => {
        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, 2)
    }),

    test('an already added blog post can be updated', async () => {
        upDatedBlog = {
            title:'the epitome of harm',
            author:'Edsger w. Dijkstra',
            url:'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 76
        }

        const response = await api
                            .put(`/api/blogs/${blog2.id}`)
                            .send(upDatedBlog)
                            .expect(200)

        assert.strictEqual(response.body.title, 'the epitome of harm')
        assert.strictEqual(response.body.likes, 76)
    })

    test('an added blog can be deleted', async () => {
        await api
            .delete(`/api/blogs/${blog1.id}`)
            .expect(204)

        const blogsAtEnd = await Blog.find({})
        
        assert.strictEqual(blogsAtEnd.length, 1)
    })
})

    
describe('other blog api tests', () => {
    let blog1, blog2

    beforeEach(async()=>{
        await Blog.deleteMany({})

    blog1 = await Blog.create({
        title:'React patterns',
        author:'Micheal Chan',
        url:'https://reactpatterns.com',
        likes: 10
    }),
    blog2 = await Blog.create({
        title:'Go to statement considered harmful',
        author:'Edsger w. Dijkstra',
        url:'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
    })
})
    
test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('blogs should have an "id" property instead of "__id"', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
        assert.ok(
            blog.id,
            'blog posts should have an "id" property'
        )
    
        assert.strictEqual(
            blog.__id,
            undefined,
            'blog posts should not have an "__id" property'
        )
    })
       
})
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
})



after(async () => {
    await mongoose.connection.close()
})