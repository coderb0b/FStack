import React from 'react'

const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  } else if (message.includes("has been removed")) {
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