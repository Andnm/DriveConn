import React, { useEffect, useState,useContext } from 'react'
import { collection, query, onSnapshot, orderBy, limit, addDoc, serverTimestamp, setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../../../../../config/configFirebase';
import "./style.css"
import { AuthContext } from '../../../../../context/authContext';

const UsersChat = () => {
  const [usersChat, setUsersChat] = useState([])
  const {selectedUserChat, setSelectedUserChat} = useContext(AuthContext)

  useEffect(() => {
    const q = query(
      collection(db, "userChats"),
      orderBy("createdAt", "desc"),
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const usersChat = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        usersChat.push({ ...docData, id: doc.id });
      });
      setUsersChat(usersChat);
    });

    return () => unsubscribe;
  }, []);

  const handleUserClick = (userId, fullName) => {
    setSelectedUserChat({userId: userId, userName: fullName});
  };

  return (
    <div>
      {usersChat.map((obj) => (
        <div
          className={selectedUserChat.userId === obj.senderId ? 'userChat selected' : 'userChat'}
          key={obj.senderId}
          onClick={() => handleUserClick(obj.senderId, obj.name)}
        >
          <img src={obj.avatar} alt="" />
          <div className="userChatInfo">
            <span>{obj.name}</span>
            <p>{obj.lastMessages}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UsersChat