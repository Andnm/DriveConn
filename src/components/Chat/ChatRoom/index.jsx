import React, { useContext, useEffect, useState, useRef } from 'react'
import './style.css'
import { AuthContext } from '../../../context/authContext';
import { collection, query, onSnapshot, orderBy, limit, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../../config/configFirebase';

const ChatRoom = (onClick) => {
  const [messages, setMassages] = useState([]);
  const { currentToken, userDecode, adminId } = useContext(AuthContext);
  const [valueText, setValueText] = useState("");
  const compareCombinedId = userDecode._id > adminId
    ? userDecode._id + adminId
    : adminId + userDecode._id;

  const messagesEndRef = useRef();
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  };

  useEffect(scrollToBottom, [messages])

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      // limit(50),
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        
        if (docData.combinedId === compareCombinedId) {
          messages.push({ ...docData, id: doc.id });
        }
      });
      setMassages(messages);
    });

    return () => unsubscribe;
  }, []);

  const Message = ({ message }) => {
    return (
      <div className={userDecode._id === message.senderId ? 'message owner' : 'message'}>
        <div className="messageInfo border-img">
          <img
            src={message.avatar}
            alt=""
          />
        </div>
        <div className="messageContent">
          <p>{message.text}</p>
        </div>
      </div>
    )
  }

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
        senderId: userDecode._id
      })
    } catch (error) {
      // console.log(error);
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
    <div className='chat-room'>
      <div className='header'>
        {/* <p>DriveConn</p> */}
        <i class="ri-close-line" onClick={onClick}></i>
      </div>

      <div className='messages-chat-room'>
        {messages.map((m) => (
          <Message message={m} key={m.id} />
        ))}
        <div ref={messagesEndRef}></div>

      </div>

      <div className='input'>
        <input
          type="text"
          placeholder="Gõ tin nhắn..."
          onChange={(e) => setValueText(e.target.value)}
          onKeyPress={handleKeyPress}
          value={valueText}
        />
        <i class="ri-send-plane-2-line" onClick={handleSendMessage}></i>
      </div>

    </div>
  )
}

export default ChatRoom