import { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import API_URL from "../api/Router";

import {auth, provider} from "../config/configFirebase"
import {signInWithPopup} from "firebase/auth"

export const AuthContext = createContext({});

export default function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const [currentToken, setCurrentToken] = useState(Cookies.get("token"));

  const [userDecode, setUserDecode] = useState(() => {
    const storedItem = localStorage.getItem("user");
    return storedItem ? JSON.parse(storedItem) : {};
  });

  const location = useLocation();

  // Side Effects

  useEffect(() => {
    Cookies.set("token", currentToken, { expires: 1, secure: true });
  }, [currentToken]);

  useEffect(() => {
    localStorage.setItem("user", userDecode && Object.keys(userDecode).length ? JSON.stringify(userDecode) : null);
  }, [userDecode])

  // console.log(currentToken);
  // Functions
  const login = async (inputs) => {
    try {
      const res = await axios.post(`${API_URL}` + "/api/auth/login", {
        ...inputs,
      });

      const token = res.data.accessToken;
      setCurrentToken(token);

      const user = jwt_decode(token);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const resUser = await axios.get(`${API_URL}` + `/api/users/${user.user.id}`, config)
      setUserDecode(resUser?.data ?? {});
      // navigate("/");

      if (["Admin"].includes(user.user.roleName)) {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    } catch (error) {
      toast.error('Gmail or password is not correct');
      // if(error?.response?.data) {
      // setIsLoading(false);
      // }
    }
  };


  //function login with google
  const [value, setValue] = useState('')

  const loginWithGoogle = async () => {
  
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email)
      localStorage.setItem("email", data.user.email)
      navigate("/profile");
    })
    
  }

  useEffect(() => {
    setValue(localStorage.getItem('email'))
  })

  //function logout
  const logout = async () => {
    try {
      await axios.post(`${API_URL}` + "/api/auth/logout");
      setCurrentToken(null);
      setUserDecode({})
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  //todo
  // const update = async (formData) => {
  //   try {
  //     // check api phải gửi after change object
  //     const res = await axios.put(
  //       `${API_URL}/users/${currentToken._id}`,
  //       formData
  //     );
  //     // console.log(res.data);
  //     setCurrentToken(res.data);
  //     navigate(0);
  //     toast.success("Cập nhật thành công.");
  //   } catch (err) {
  //     throw err;
  //   }
  // };

  return (
    <AuthContext.Provider
      value={{ userDecode, currentToken, login, logout, loginWithGoogle}}
    >
      {children}
    </AuthContext.Provider>
  );
}
