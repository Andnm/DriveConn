import React from 'react'
import './style.css'
import logo from "../../../../../assets/all-images/logo/Final_DriveConn_logo.png";

const Messages = () => {

  const Message = ({ content }) => {
    return (
      <div className='message'>
        <div className="messageInfo">
          <img
            src="https://lh3.googleusercontent.com/a/AAcHTtcoZvEXILPbjMQGMBBwAHbx1r4lZvOf3nGO6Uen9fouFQ=s96-c"
            alt=""
          />
        </div>
        <div className="messageContent">
          <p>{content}</p>
        </div>
      </div>
    )
  }

  const MessageOwner = ({ content }) => {
    return (
      <div className='message owner'>
        <div className="messageInfo">
          <img
            className='logo-owner'
            src={logo}
            alt=""
          />
        </div>
        <div className="messageContent">
          <p>{content}</p>
        </div>
      </div>
    )
  }

  return (
    <div className='messages'>
      <Message content={'Admin ơi cho mình hỏi vài cái với'} />
      <MessageOwner content={'Dạ Driveconn xin nghe'} />
      <Message content={'Thì mình có biết Driveconn thông qua facebook ấy và có quan tâm đến việc đăng xe ở đây thì bạn có thể nói kĩ hơn cho mình nghe được không ạ?'} />
      <MessageOwner content={'Dạ Driveconn xin nghe'} />
      
    </div>
  )
}

export default Messages