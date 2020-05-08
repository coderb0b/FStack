import React from 'react'
import { connect } from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { loginUser, logoutUser } from '../reducers/userReducer'
import { useField } from '../hooks'

const LoginForm = (props) => {
    console.log("LOGIN_FORM", props)
    const username = useField('text')
    const password = useField('password')

      const handleLogin = (event) => {
        event.preventDefault()
    
        loginService.login(username.input.value, password.input.value).then((response) => {
              if(response.data) {
                  const user = {
                      username: response.data.username,
                      name: response.data.name,
                      token: response.data.token
                  }
    
                  window.localStorage.setItem('loggedUser', JSON.stringify(user))
    
                  blogService.setToken(user.token)
            props.loginUser(user)
            username.reset()
            password.reset()
            props.setNotification(`${user.name} logged in`, 3)
                }
            }).catch((error) => {
          if (error.response && error.response.status === 401) {
            props.setNotification('Wrong credentials', 3)
            setTimeout(() => {
                      username.reset()
                      password.reset()            
            }, 3000)
          }
        })
      }
      
        return (
            <div>
              <h2>Log in to application</h2>
              <form onSubmit={handleLogin}>
                <div>
                username
                  <input {...username.input} />
                </div>
                <div>
                password
                  <input {...password.input} />
                </div>
                <button type="submit">login</button>
              </form>
            </div>
          )
      
      

      
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
    loginUser, logoutUser, setNotification
}

const ConnectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

export default ConnectedLoginForm