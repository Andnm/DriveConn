import React from 'react';
import './style.css';

const Drawer = ({ isOpen, toggleDrawer, content }) => {
  return (
    <>
      {isOpen && <div className="overlay_drawer" onClick={toggleDrawer} />}
      <div className={`drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-content h-100">
          <div className="img d-flex justify-content-center align-items-center h-100">
            <img src={content} alt="driving license" />
          </div>
        </div>
        <button className="toggle-button" onClick={toggleDrawer}>
          <span style={{ fontSize: '30px' }} className={`toggle-icon ${isOpen ? 'open' : ''}`}>&#x2192;</span>
        </button>
      </div>
    </>
  );
};

export default Drawer;
