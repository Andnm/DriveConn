import React, {useContext, useState} from 'react'
import './style.css'
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import Img from "../../../../../assets/all-images/chat/img.png";
import Attach from "../../../../../assets/all-images/chat/attach.png";
import { AuthContext } from '../../../../../context/authContext';
import { db } from '../../../../../config/configFirebase';

const Input = () => {
  const [valueText, setValueText] = useState("");
  const { userDecode, adminId } = useContext(AuthContext);
  const userTmp = '6487ce3fe2c09142810ff413'
  const compareCombinedId = userTmp > adminId
  ? userTmp + adminId
  : adminId + userTmp;

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if(valueText.trim() === "") {
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        text: valueText,
        name: userDecode.lastName + ' ' + userDecode.firstName,
        avatar: userDecode.imgURL,
        createdAt: serverTimestamp(),
        combinedId: compareCombinedId,
        senderId: userDecode._id
      })
    } catch(error) {
      // console.log(error);
    }
    setValueText("");
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage(e);
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