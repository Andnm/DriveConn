import { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { AuthContext } from "../../../context/authContext";
import { toast } from "react-toastify";
import { validateEmail } from "../../../utils/utils";
import './login.css'
import logo_google from '../../../assets/all-images/google/google_logo.png'
import Modal from 'react-bootstrap/Modal';
import LoadingCar from "../../../components/LoadingCar/LoadingCar";

function Login({ open, onClose }) {
  const { login, loginWithGoogle, loadingLogin } = useContext(AuthContext);
  const [cookies, setCookie, removeCookie] = useCookies(["error"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errorAlert = useRef();
  const errorPassword = useRef();
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);

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

    onClose()
    login(loginUser);
  };

  // <LoadingCar style={{backgroundColor: '#e5e5e5', opacity: '0.5'}}></LoadingCar>

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
    <Modal show={open} onHide={onClose} dialogClassName="login-modal">
      <div className='login_container'>
        <div className='form_container'>
          <Modal.Header closeButton>
          </Modal.Header>
          <div className='right'>
            <h2 className='from_heading'>Welcome to DriveConn</h2>
            <form onSubmit={handleValidateLogin} className="login__form-content">
              <div className="input-box">
                <input type="text" className='input'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onInput={(e) => {
                    handleOnInput(e);
                  }}
                  placeholder=" "
                  ref={inputRef} />
                <label for="">Email</label>
              </div>
              <span ref={errorAlert}>{/* error alert */}</span>

              <div className="input-box">
                <input type="password" className='input'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onInput={(e) => {
                    handleOnInput(e);
                  }}
                  placeholder=" "
                />

                <label for="">Password</label>
              </div>
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
    </Modal>
  );
}

export default Login;
