import React from 'react'
import './style.css'

import Img from "../../../../../assets/all-images/chat/img.png";
import Attach from "../../../../../assets/all-images/chat/attach.png";

const Input = () => {
  return (
    <div className="input-chatbox">
      <input
        type="text"
        placeholder="Type something..."
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button>Send</button>
      </div>
    </div>
  )
}

export default Input