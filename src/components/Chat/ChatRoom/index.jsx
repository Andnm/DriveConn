import React, { useContext } from 'react'
import './style.css'
import { AuthContext } from '../../../context/authContext';
import logo from "../../../assets/all-images/logo/Final_DriveConn_logo.png"

const ChatRoom = (onClick) => {

  const { currentToken, userDecode } = useContext(AuthContext);

  const Message = () => {
    return (
      <div className='message'>
        <div className="messageInfo border-img">
          <img
            src={logo}
            alt=""
          />
        </div>
        <div className="messageContent">
          <p>hello</p>
        </div>
      </div>
    )
  }

  const MessageOwner = () => {
    return (
      <div className='message owner'>
        <div className="messageInfo">
          <img
            src={userDecode?.imgURL}
            alt=""
          />
        </div>
        <div className="messageContent">
          <p>hello</p>
        </div>
      </div>
    )
  }

  return (
    <div className='chat-room'>
      <div className='header'>
        {/* <p>DriveConn</p> */}
        <i class="ri-close-line" onClick={onClick}></i>
      </div>

      <div className='messages-chat-room'>
        <Message />
        <MessageOwner />
      </div>

      <div className='input'>
        <input
          type="text"
          placeholder="Gõ tin nhắn..."
        />

        <i class="ri-send-plane-2-line"></i>
      </div>
    </div>
  )
}

export default ChatRoom