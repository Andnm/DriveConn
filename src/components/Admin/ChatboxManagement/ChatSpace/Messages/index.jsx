import React, { useContext, useEffect, useState, useRef } from 'react'
import './style.css'
import logo from "../../../../../assets/all-images/logo/Final_DriveConn_logo.png";
import { collection, query, onSnapshot, orderBy, limit } from "firebase/firestore";
import { db } from "../../../../../config/configFirebase"
import { AuthContext } from '../../../../../context/authContext';

const Messages = () => {
  const messagesEndRef = useRef();
  const [messages, setMassages] = useState([]);
  const { userDecode, adminId } = useContext(AuthContext);



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
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMassages(messages);
    });

    return () => unsubscribe;
  }, []);

  const Message = ({ message }) => {
    return (
      <div className={userDecode._id === message.senderId ? 'message owner' : 'message'}>
        <div className="messageInfo">
          <img
            className='logo-owner'
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

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  )
}

export default Messages