import React, { useState, useEffect, useRef, useContext } from "react";
import "./style.css";
import { AuthContext } from "../../../context/authContext";
import ChatRoom from "../ChatRoom"
import Login from "../../../pages/Auth/Login/Login";

const ChatBox = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatBoxRef = useRef(null);
  const { userDecode } = useContext(AuthContext);
  const [modalLoginOpen, setModalLoginOpen] = useState(false);


  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (chatBoxRef.current && !chatBoxRef.current.contains(event.target)) {
        setIsChatOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handlePopupClick = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      <div className="chat-box" onClick={toggleChat} ref={chatBoxRef}>
        <div className="chat-icon">
          <i className="ri-message-2-line"></i>
        </div>
      </div>
      {isChatOpen && (
        <div className="chat-popup d-flex justify-content-center align-items-center" onClick={handlePopupClick}>
          {!userDecode?.firstName
            ?
            <div className="d-flex justify-content-center align-items-center flex-column">
              <p>Vui lòng đăng nhập để đặt câu hỏi cho chúng tôi!</p>
              <button
                onClick={() => {
                  setModalLoginOpen(true);
                }}
                className="btn btn-outline-primary"
              >
                Đăng nhập
              </button>
            </div>
            : <ChatRoom onClick={toggleChat}/>}
        </div>
      )}

      {modalLoginOpen && <Login open={modalLoginOpen} onClose={() => setModalLoginOpen(false)} />}
    </>
  );
};

export default ChatBox;
