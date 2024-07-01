const _ = require("lodash");

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    let likesSum = blogs.map(blog => blog.likes).reduce((total, likes) => total + likes, 0);
    return likesSum;
}

const favoriteBlog = (blogs) => {
    let maxLikes = blogs.map(blog => blog.likes).reduce((max, likes) => likes > max ? likes : max, 0);
    let topBlog = blogs.filter(blog => blog.likes === maxLikes)[0];
    return topBlog;
}

const mostBlogs = (blogs) => {
    let blogsCountByAuthor = _(blogs)
        .groupBy('author')
        .map((authorBlogs, author) => {
            return {
                'author': author,
                'blogs': _.sumBy(authorBlogs, () => 1)
            };
        })
        .value();

    console.log(blogsCountByAuthor);

    let authorWithMostBlogs = _.maxBy(blogsCountByAuthor, 'blogs');
    return authorWithMostBlogs;
}

const mostLikes = (blogs) => {
    let likesCountByAuthor = _(blogs)
        .groupBy('author')
        .map((authorBlogs, author) => {
            return {
                'author': author,
                'likes': _.sumBy(authorBlogs, 'likes')
            };
        })
        .value();

    let authorWithMostLikes = _.maxBy(likesCountByAuthor, 'likes');
    return authorWithMostLikes;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
