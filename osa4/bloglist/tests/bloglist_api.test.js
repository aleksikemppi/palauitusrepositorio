const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
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
  test('blog can be added', async () => {
    const newBlog = {
      title: "React patterns",
      author: "Michael Chan (test, add new)",
      url: "https://reactpatterns.com/",
      likes: 7
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    const authors = response.body.map(r => r.author);

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(authors).toContain('Michael Chan (test, add new)');
  });

  test('updating likes-value to blog', async () => {
    let response = await api.get('/api/blogs');
    const blogs = response.body;
    const blogToUpdate = blogs[0];
    const startLikesValue = blogToUpdate.likes;

    blogToUpdate.likes += 1;

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200);

    response = await api.get('/api/blogs');
    const updatedBlog = response.body.find(x => x.id === blogToUpdate.id);

    expect(updatedBlog.likes).toBe(startLikesValue + 1);
  });

  test('if blog.likes is null then blog.likes is set to 0', async () => {
    const newBlog = {
      title: "Test title",
      author: "Edsger W. Dijkstra 3 (test)",
      url: "Test url"
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    const blogsWithNullLikes = response.body.filter(x => x.likes === null);

    expect(blogsWithNullLikes.length).toBe(0);
  });

  test('blog without title and url not added', async () => {
    const newBlog = {
      author: "Edsger W. Dijkstra 3 (test)",
      likes: 999,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});

describe('deletion of blog', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
    const ids = blogsAtEnd.map(blog => blog.id);
    expect(ids).not.toContain(blogToDelete.id);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
