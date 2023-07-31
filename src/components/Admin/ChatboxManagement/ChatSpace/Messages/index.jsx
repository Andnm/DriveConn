import React from 'react'
import './style.css'

const Messages = () => {

  const Message = () => {
    return (
      <div className='message'>
        <div className="messageInfo">
          <img
            src="https://img.freepik.com/free-photo/purple-osteospermum-daisy-flower_1373-16.jpg?w=2000"
            alt=""
          />
        </div>
        <div className="messageContent">
          <p>hello</p>
          <img src="https://img.freepik.com/free-photo/purple-osteospermum-daisy-flower_1373-16.jpg?w=2000"
            alt="" />
        </div>
      </div>
    )
  }

  const MessageOwner = () => {
    return (
      <div className='message owner'>
        <div className="messageInfo">
          <img
            src="https://img.freepik.com/free-photo/purple-osteospermum-daisy-flower_1373-16.jpg?w=2000"
            alt=""
          />
        </div>
        <div className="messageContent">
          <p>hello</p>
          <img src="https://img.freepik.com/free-photo/purple-osteospermum-daisy-flower_1373-16.jpg?w=2000"
            alt="" />
        </div>
      </div>
    )
  }

  return (
    <div className='messages'>
      <Message />
      <Message />
      <MessageOwner />
    </div>
  )
}

export default Messages