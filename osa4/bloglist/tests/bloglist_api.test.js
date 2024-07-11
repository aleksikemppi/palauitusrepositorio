const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  
  const userPromises = helper.initialUsers.map(user => helper.createUser(user));
  const users = await Promise.all(userPromises);

  const user = users[0];

  const blogPromises = helper.initialBlogs.map(blog => {
    blog.user = user._id;
    return new Blog(blog).save();
  });
  await Promise.all(blogPromises);
});

describe('viewing notes and content', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('returned blogs include id field', async () => {
    const response = await api.get('/api/blogs');
    const ids = response.body.map(r => r.id);
    expect(ids).toBeDefined();
  });
});

describe('Adding and updating notes', () => {
  let token;

  beforeAll(async () => {
    const response = await api
      .post('/api/login')
      .send({
        username: 'creator',
        password: 'password123',
      });

    token = response.body.token;
  });

  test('blog can be added', async () => {
    const newBlog = {
      title: "React patterns",
      author: "Michael Chan (test, add new)",
      url: "https://reactpatterns.com/",
      likes: 7,
    };

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    console.log('Add Blog Response:', response.body);

    const blogsResponse = await api.get('/api/blogs');
    const authors = blogsResponse.body.map(r => r.author);

    expect(blogsResponse.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(authors).toContain('Michael Chan (test, add new)');
  });

  test('if blog.likes is null then blog.likes is set to 0', async () => {
    const newBlog = {
      title: "Test title",
      author: "Edsger W. Dijkstra 3 (test)",
      url: "Test url",
    };

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    console.log('Add Blog with Null Likes Response:', response.body);

    const blogsResponse = await api.get('/api/blogs');
    const blogsWithNullLikes = blogsResponse.body.filter(x => x.likes === null);

    expect(blogsWithNullLikes.length).toBe(0);
  });

  test('blog without title and url not added', async () => {
    const newBlog = {
      author: "Edsger W. Dijkstra 3 (test)",
      likes: 999,
    };

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    console.log('Add Blog without Title and URL Response:', response.body);
  });
});

describe('deletion of blog', () => {
  let token;
  let anotherToken;

  beforeAll(async () => {
    const response = await api
      .post('/api/login')
      .send({
        username: 'creator',
        password: 'password123',
      });

    token = response.body.token;

    const anotherResponse = await api
      .post('/api/login')
      .send({
        username: 'anotheruser',
        password: 'password123',
      });

    anotherToken = anotherResponse.body.token;
  });

  test('a blog can be deleted by the creator', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    const response = await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    console.log('Delete Blog Response:', response.body);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
    const ids = blogsAtEnd.map(blog => blog.id);
    expect(ids).not.toContain(blogToDelete.id);
  });

  test('a blog cannot be deleted by another user', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    const response = await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${anotherToken}`)
      .expect(401);

    console.log('Unauthorized Delete Blog Response:', response.body);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    const ids = blogsAtEnd.map(blog => blog.id);
    expect(ids).toContain(blogToDelete.id);
  });

  test('a blog cannot be deleted without token', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    const response = await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401);

    console.log('Delete Blog without Token Response:', response.body);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    const ids = blogsAtEnd.map(blog => blog.id);
    expect(ids).toContain(blogToDelete.id);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
