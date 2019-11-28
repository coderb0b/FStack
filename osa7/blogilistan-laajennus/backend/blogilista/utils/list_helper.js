const dummy = (blogs) => {
  return 1
}


const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  }
  return blogs.reduce(reducer, 0)
}

const mostBlogs = (blogs) => {
  const counts = {}
  blogs.forEach(element => {
    counts[element.author] = 1 + (counts[element.author] || 0)
  })

  const name = Object.keys(counts).reduce((a,b) => counts[a] > counts[b] ? a : b)
  const obj = {
    author: name,
    blogs: counts[name]
  }
  return obj
}

const mostLikes = (blogs) => {
  const counts = {}
  blogs.forEach(element => {
    counts[element.author] = element.likes + (counts[element.author] || 0)
  })

  const name = Object.keys(counts).reduce((a,b) => counts[a] > counts[b] ? a : b)
  const obj = {
    author: name,
    likes: counts[name]
  }
  return obj
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

