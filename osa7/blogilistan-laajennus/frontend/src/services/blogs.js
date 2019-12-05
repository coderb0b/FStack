import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  
  return axios.get(baseUrl)
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}


const create = (blogObject) => {
  const config = {
      headers: { Authorization: token }
    }

  
  return axios.post(baseUrl, blogObject, config)
}


const remove = (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

const like = async (blog) => {
	const response = await axios.put(`${baseUrl}/${blog.id}`, blog)
	return response.data
}

export default { getAll, setToken, create, update, remove, like }