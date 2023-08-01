import React, { useContext } from 'react'
import Cam from "../../../../assets/all-images/chat/cam.png";
import Add from "../../../../assets/all-images/chat/add.png";
import More from "../../../../assets/all-images/chat/more.png";
import './style.css'
import Messages from "./Messages"
import Input from "./Input"
import { AuthContext } from '../../../../context/authContext';

const ChatSpace = () => {

  const { selectedUserChat } = useContext(AuthContext);

  return (
    <div className="chat-space">
      {selectedUserChat?.userName
        ?
        <>
          <div className="chatInfo">
            <span>{selectedUserChat.userName}</span>
            <div className="chatIcons">
              <img src={Cam} alt="" />
              <img src={Add} alt="" />
              <img src={More} alt="" />
            </div>
          </div>
          <Messages />
          <Input />
        </>
        :
        <div className="emptyConversation">
          <p>Select a conversation to display the data</p>
        </div>
      }
    </div>
  )
}

export default ChatSpace