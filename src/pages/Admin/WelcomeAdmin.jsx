import React, {useContext, useEffect, useState} from 'react'
import jwt_decode from 'jwt-decode'
import { AuthContext } from "../../context/authContext";

const WelcomeAdmin = () => {
  const { currentToken, userDecode } = useContext(AuthContext);;

  return (
    <div className='d-flex justify-content-center align-items-center'>
      <p>
      Xin chào {userDecode?.lastName}
      </p>
    </div>
  )
}

export default WelcomeAdmin