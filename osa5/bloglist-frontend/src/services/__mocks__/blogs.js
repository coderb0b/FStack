const blogs = [
  {
    id: '5daeba502e79752014a17b12',
    title: 'testi blogi',
    author: 'testaaja',
    likes: 2,
    user: {
      _id: '5daeba502e79752014a17b93',
      name: 'Heimo Vesa',
      username: 'heimo'
    }
  }
]

let token = null

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

export default { getAll, setToken }

