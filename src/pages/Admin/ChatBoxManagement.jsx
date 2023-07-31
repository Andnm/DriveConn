import React from 'react'
import SidebarChat from '../../components/Admin/ChatboxManagement/Sidebar/SidebarChat'
import ChatSpace from '../../components/Admin/ChatboxManagement/ChatSpace'
import '../../components/Admin/ChatboxManagement/style.css'

const ChatBoxManagement = () => {
  return (
    <div className='default-chatbox-home'>
      <div className='chatbox-management'>
        <SidebarChat />
        <ChatSpace />
      </div>
    </div>

  )
}

export default ChatBoxManagement