import React from 'react'
import './style.css'
import Search from '../Search'
import UsersChat from '../UsersChat'

const SidebarChat = () => {
  return (
    <div className='sidebar-chat'>
      <div className='navbar'>
        <span>Driveconn Chat</span>
      </div>

      <Search/>

      <UsersChat/>
    </div>
  )
}

export default SidebarChat