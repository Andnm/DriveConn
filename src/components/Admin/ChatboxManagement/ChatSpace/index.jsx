import React from 'react'
import Cam from "../../../../assets/all-images/chat/cam.png";
import Add from "../../../../assets/all-images/chat/add.png";
import More from "../../../../assets/all-images/chat/more.png";
import './style.css'
import Messages from "./Messages"
import Input from "./Input"

const ChatSpace = () => {
  return (
    <div className="chat-space">
      <div className="chatInfo">
        <span>Xin chao</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default ChatSpace