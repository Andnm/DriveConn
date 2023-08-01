import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import API_URL from "../api/Router";
import {
  auth,
  providerGoogle,
  providerFacebook,
} from "../config/configFirebase";
import { signInWithPopup } from "firebase/auth";
import { splitFullName } from "../utils/utils";

export const AuthContext = createContext({});

export default function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const [currentToken, setCurrentToken] = useState(Cookies.get("token"));
  const [isLoadingEvent, setIsLoadingEvent] = useState(false);
  const [selectedUserChat, setSelectedUserChat] = useState([]);

  const adminId = '64880a53c69630e5c5d24331'

  const [userDecode, setUserDecode] = useState(() => {
    const storedItem = localStorage.getItem("user");
    return storedItem ? JSON.parse(storedItem) : {};
  });

  // Side Effects

  useEffect(() => {
    Cookies.set("token", currentToken, { expires: 1, secure: true });
  }, [currentToken]);

  useEffect(() => {
    localStorage.setItem(
      "user",
      userDecode && Object.keys(userDecode).length
        ? JSON.stringify(userDecode)
        : null
    );
  }, [userDecode]);

  // function login normally
  const login = async (inputs, props) => {
    try {
      setIsLoadingEvent(true);

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

      const resUser = await axios.get(
        `${API_URL}` + `/api/users/${user.user.id}`,
        config
      );
      setUserDecode(resUser?.data ?? {});
      // navigate("/");
      setIsLoadingEvent(false);

      if (["Admin"].includes(user.user.roleName)) {
        navigate("/admin/dashboard");
      } else {
        navigate("/my_account");
      }
    } catch (error) {
      toast.error("Gmail or password is not correct");
      // if(error?.response?.data) {
      setIsLoadingEvent(false);
      // }
    }
  };

  //-------------------HANDLE LOGIN WITH GOOGLE----------------------
  //function handle displayName into firstName and lastName

  //function login with google by firebase
  const loginWithGoogle = async (props) => {

    signInWithPopup(auth, providerGoogle).then(async (data) => {
      setIsLoadingEvent(true);
      const { lastName: lastName, firstName: firstName } = splitFullName(
        data.user.displayName
      );

      const userInfo = {
        lastName: lastName,
        firstName: firstName,
        email: data.user.email,
        imgURL: data.user.photoURL,
      };


      const res = await axios.post(`${API_URL}/api/auth/loginGoogle`, userInfo);

      const token = res.data.accessToken;
      setCurrentToken(token);
      const user = jwt_decode(token);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const resUser = await axios.get(
        `${API_URL}` + `/api/users/${user.user.id}`,
        config
      );

      setUserDecode(resUser?.data ?? {});
      setIsLoadingEvent(false);

      const currentPath = window.location.pathname;

      if (["Admin"].includes(user.user.roleName)) {
        navigate("/admin/dashboard");
      } else if (currentPath.startsWith("/vehicles/")){
        navigate(currentPath, { state: { props } });
      }else {
        navigate("/my_account")
      }
    });
  };

  //function logout
  const logout = async () => {
    try {
      setIsLoadingEvent(true);
      await axios.post(`${API_URL}` + "/api/auth/logout");
      setCurrentToken(null);
      setUserDecode({});
      setIsLoadingEvent(false);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  //-------------------HANDLE LOGIN WITH FACEBOOK----------------------
  const loginWithFacebook = async () => {
    signInWithPopup(auth, providerFacebook).then((data) => {
      // setIsLoadingEvent(true);

      // const { firstName: firstName, lastName: lastName } = splitFullName(
      //   data.user.displayName
      // );

      console.log(data.user);
      navigate("/home");

      // const userInfo = {
      //   firstName: firstName,
      //   lastName: lastName,
      //   email: data.user.email,
      //   imgURL: data.user.photoURL,
      // };

      // const res = await axios.post(`${API_URL}/api/auth/loginGoogle`, userInfo);

      // const token = res.data.accessToken;
      // setCurrentToken(token);

      // const user = jwt_decode(token);

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      // };

      // const resUser = await axios.get(
      //   `${API_URL}` + `/api/users/${user.user.id}`,
      //   config
      // );

      // setUserDecode(resUser?.data ?? {});
      // setIsLoadingEvent(false);

      // if (["Admin"].includes(user.user.roleName)) {
      //   navigate("/admin");
      // } else {
      //   navigate("/my_account");
      // }
    });
  };

  return (
    <AuthContext.Provider
      value={{
        userDecode,
        setUserDecode,
        currentToken,
        login,
        logout,
        loginWithGoogle,
        isLoadingEvent,
        loginWithFacebook,
        adminId,
        selectedUserChat,
        setSelectedUserChat
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
