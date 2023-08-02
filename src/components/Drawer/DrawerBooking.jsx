import React from 'react'
import "./style.css"
import BookingInfor from './Booking/BookingInfor';
import OwnerInfo from './Booking/OwnerInfo';

const DrawerBooking = ({ isOpen, toggleDrawer, content }) => {
 
  return (
    <>
      {isOpen && <div className="overlay_drawer" onClick={toggleDrawer} />}
      <div className={`drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-content h-100 pt-5">
         <BookingInfor data={content}/>
         <OwnerInfo data={content}/>
        </div>
        <button className="toggle-button" onClick={toggleDrawer}>
          <span style={{ fontSize: '30px' }} className={`toggle-icon ${isOpen ? 'open' : ''}`}>&#x2192;</span>
        </button>
      </div>
    </>
  );
}

export default DrawerBooking