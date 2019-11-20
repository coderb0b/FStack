import React from 'react'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div>
      {props.store.getState().notification === '' ?
       <div></div> : <div style={style}>{props.store.getState().notification}</div>}
    </div>
  )
}

export default Notification