import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  //const request = axios.get(baseUrl)
  //return request.then(response => response.data)
  return axios.get(baseUrl)
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}
/*
const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
*/

const create = (blogObject) => {
  const config = {
      headers: { Authorization: token }
    }

/*
	
  
  const request = axios.post(baseUrl, blogObject, config)
  return request.then(response => response.data)
  */
  
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

export default { getAll, setToken, create, update, remove }