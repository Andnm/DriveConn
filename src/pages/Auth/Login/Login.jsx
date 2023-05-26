import { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { AuthContext } from "../../../context/authContext";
import { toast } from "react-toastify";
import { validateEmail } from "../../../utils/utils";
import axios from "axios";
import API_URL from "../../../api/Router";
import './login.css'
import logo_google from '../../../assets/all-images/google/google_logo.png'
import logo_drive2co from '../../../assets/all-images/logo/Drive2Co_logo_name.png'

function Login() {
  const { login, loginWithGoogle } = useContext(AuthContext);
  const [cookies, setCookie, removeCookie] = useCookies(["error"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errorAlert = useRef();
  const errorPassword = useRef();
  const inputRef = useRef();
  
  const [token, setToken] = useState('');

  const [err, setErr] = useState(false);

  useEffect(() => {
    cookies?.error && toast.error(cookies?.error);
    removeCookie("error");
  }, [cookies?.error, removeCookie]);

  const handleValidateLogin = (e) => {
    e.preventDefault();
    //email is empty
    if (!email) {
      errorAlert.current.className = "login__errorAlert";
      errorAlert.current.innerText = "Please enter the email!";
      inputRef.current.focus();
      return;
    }

    if (!validateEmail(email)) {
      errorAlert.current.innerText = "Email is not valid!";
      return;
    }

    if (!password) {
      errorPassword.current.className = "login__errorAlert";
      errorPassword.current.innerText = "Please enter the password!";
      return;
    }

    // validate email
    let loginUser = {
      email: email,
      password: password,
    };
    login(loginUser);
  };

  const handleOnInput = (e) => {
    if (e.target.value) {
      errorAlert.current.innerText = "";
    }
    if (password) {
      errorPassword.current.innerText = "";
    }
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get('token');
    if (token) {
      setToken(token)
    }
  }, [])

  return (
    <div className='background-img'>
      <div className='login_container'>
        <div className='form_container'>
          <div className='left'>
            <img className='img' src={logo_drive2co} alt="login" />
          </div>
          <div className='right'>
            <Link to="/home" className='home-icon'><i className="ri-home-4-line"></i><p>Home</p></Link>
            <h2 className='from_heading'>Welcome to Drive2Co</h2>

            <form onSubmit={handleValidateLogin} className="login__form-content">
              <input type="text" className='input' placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onInput={(e) => {
                  handleOnInput(e);
                }}
                ref={inputRef} />
              <span ref={errorAlert}>{/* error alert */}</span>

              <input type="password" className='input' placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onInput={(e) => {
                  handleOnInput(e);
                }} />
              <span ref={errorPassword}>{/* error alert */}</span>

              <button className='btn-login'>Log in</button>
              <Link to='/forgot_password'>Forgot password?</Link>
            </form>

            <p className='text'>or</p>
            <button className='google_btn' onClick={loginWithGoogle}>
              <img src={logo_google} alt="google icon" />
              <span>Log in with Google</span>
            </button>
            <p className='text'>
              Don't have account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
