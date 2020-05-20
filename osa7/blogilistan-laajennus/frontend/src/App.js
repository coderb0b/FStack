import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import blogService from './services/blogs'
import userService from './services/users'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import LoginForm from './components/LoginForm'
import { loginUser, logoutUser } from './reducers/userReducer'

import {
  BrowserRouter as Router,
  Route, Link
} from "react-router-dom"



const App = (props) => {
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    if (props.user) {
      props.initializeBlogs()
    
      userService.getAll().then((res) => {
        setUsers(res.data)
      }).catch((error) => {
        console.log(error)
      })


    } else {
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      if (loggedUserJSON) {
		  const user = JSON.parse(loggedUserJSON)
        props.loginUser(user)
		  blogService.setToken(user.token)
      }

    }
  }, [props.user])

  function handleLogout(event) {
    event.preventDefault()
    window.localStorage.clear()
    props.logoutUser()
  }

  

  return (
    <Router>
      <div>
        <Notification />
        {props.user === null ?
          <LoginForm /> :
          <div>
            <p><Link to="/users">users</Link> {props.user.name} logged in <button onClick={handleLogout}>logout</button></p>
            <Route exact path="/users" render={() => {
              return (
                <div>
                  <h2>Users</h2>
                  <table>
                    <thead>
                      <tr>
                        <td></td>
                        <th>blogs created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        users.map((user) => {
                          return (
                            <tr key={user.id}>
                              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                              <td>{user.blogs.length || 0}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              )
            }}/>
            <Route exact path="/users/:id" render={({ match }) => {
              const thisUser = users.find((user) => {
                return user.id === match.params.id
              })

              if(!thisUser){
                return null
              }
              
              return (
                <div>
                  <h3>{thisUser.name}</h3>
                  <h4>Added blogs</h4>
                  <ul>
                    {
                      thisUser.blogs.map((b) => {
                        return (<li key={b.id}>{b.title}</li>)
                      })
                    }
                  </ul>
                </div>
              )
            }}/>
            <Route exact path="/" render={() => {
              return (
                <>
                <h2>blog app</h2>
                <BlogList user={props.user}/>
                </>
              )
            } }/>
          </div>}
      </div>
    </Router>

  )


}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}


export default connect(mapStateToProps, { initializeBlogs, setNotification, loginUser, logoutUser })(App)



