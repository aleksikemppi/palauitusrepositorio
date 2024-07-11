const Blog = require('../models/blog');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const initialBlogs = [
  { 
    title: "React patterns",
    author: "Michael Chan (test)",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  { 
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra (test)",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  { 
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra 2 (test)",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 2
  },
];

const initialUsers = [
  {
    username: 'creator',
    name: 'Blog Creator',
    password: 'password123',
  },
  {
    username: 'anotheruser',
    name: 'Another User',
    password: 'password123',
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
};

const createUser = async (userData) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(userData.password, saltRounds);
  const user = new User({ ...userData, passwordHash });
  await user.save();
  return user;
};

module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDb,
  usersInDb,
  createUser,
};
