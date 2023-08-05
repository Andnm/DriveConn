import React, { useContext, useState } from 'react'
import './style.css'
import { addDoc, collection, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

import Img from "../../../../../assets/all-images/chat/img.png";
import Attach from "../../../../../assets/all-images/chat/attach.png";
import { AuthContext } from '../../../../../context/authContext';
import { db } from '../../../../../config/configFirebase';
import { getLastMessages } from '../../../../../utils/utils';

const Input = () => {
  const [valueText, setValueText] = useState("");
  const { userDecode, adminId, selectedUserChat } = useContext(AuthContext);

  const compareCombinedId = selectedUserChat.userId > adminId
    ? selectedUserChat.userId + adminId
    : adminId + selectedUserChat.userId;

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (valueText.trim() === "") {
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        text: valueText,
        name: userDecode.lastName + ' ' + userDecode.firstName,
        avatar: userDecode.imgURL,
        createdAt: serverTimestamp(),
        combinedId: compareCombinedId,
        senderId: adminId
      })

    } catch (error) {
      console.error("Error send messages from admin to customer:", error);
    }
    setValueText("");
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage(e);
      setValueText("");
    }
  };

  return (
    <div className="input-chatbox">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setValueText(e.target.value)}
        onKeyPress={handleKeyPress}
        value={valueText}
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
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  )
}

export default Input