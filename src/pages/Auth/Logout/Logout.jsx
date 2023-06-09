import React, {useContext} from 'react'
import { AuthContext } from "../../../context/authContext";


const Logout = () => {

  const {logout} = useContext(AuthContext);

  return (
    <div>Logout</div>
  )
}

export default Logout