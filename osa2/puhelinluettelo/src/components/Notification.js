import React from 'react'

const Notification = ({ message }) => {
	console.log("notification", typeof(message))
  if (message === null) {
    return null
  } else if (message.includes("Error")) {
    return (
	  <div className="error">
        {message}
      </div>
    )
  }

  return (
	  <div className="success">
        {message}
      </div>
  )
}

export default Notification