import { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { AuthContext } from "../../../context/authContext";
import { toast } from "react-toastify";
import toastOption from "../../../config/toast";
import { validateEmail } from "../../../utils/utils";
import './login.css'
import logo_google from '../../../assets/all-images/google/google_logo.png'
import Modal from 'react-bootstrap/Modal';
import Signup from "../Signup/Signup";

function Login({ open, onClose, props }) {
  const { login, loginWithGoogle, loginWithFacebook, isLoadingEvent } = useContext(AuthContext);
  const [cookies, setCookie, removeCookie] = useCookies(["error"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errorAlert = useRef();
  const errorPassword = useRef();
  const inputRef = useRef();
  const [isOpenSignUpModal, setIsOpenSignUpModal] = useState(false)

  const [token, setToken] = useState('');

  const [err, setErr] = useState(false);

  useEffect(() => {
    cookies?.error && toast.error(cookies?.error, toastOption);
    removeCookie("error");
  }, [cookies?.error, removeCookie]);

  const handleValidateLogin = (e) => {
    e.preventDefault();
    //email is empty

    if (!email) {
      errorAlert.current.className = "login__errorAlert";
      errorAlert.current.innerText = "Vui lòng nhập email!";
      inputRef.current.focus();
      return;
    }

    if (!validateEmail(email)) {
      errorAlert.current.innerText = "Email không hợp lệ!";
      return;
    }

    if (!password) {
      errorPassword.current.className = "login__errorAlert";
      errorPassword.current.innerText = "Vui lòng nhập mật khẩu!";
      return;
    }

    // validate email
    let loginUser = {
      email: email,
      password: password,
    };

    onClose()
    setEmail('')
    setPassword('')
    login(loginUser, props);
  };

  const handleOnInput = (e) => {
    if (e.target.value) {
      errorAlert.current.innerText = "";
    }
    if (password) {
      errorPassword.current.innerText = "";
    }
  };

  const handleLoginWithGoogle = () => {
    loginWithGoogle(props)
    onClose()
  }

  const handleLoginWithFacebook = () => {
    toast.warning('Tính năng chưa hỗ trợ', toastOption)
    onClose()
    // loginWithFacebook()
  }

  const handleOpenSignUpModal = () => {
    onClose()
    setIsOpenSignUpModal(true)
  }

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
            <h2 className='from_heading'>Chào mừng đến với DriveConn</h2>
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
                <label htmlFor="">Email</label>
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

                <label htmlFor="">Mật khẩu</label>
              </div>
              <span ref={errorPassword}>{/* error alert */}</span>

              <button className='btn-login'>Đăng nhập</button>
              <Link to='/forgot_password' onClick={onClose}>Quên mật khẩu?</Link>
            </form>

            <p className='text'>or</p>
            <button className='google_btn' onClick={handleLoginWithGoogle}>
              <img src={logo_google} alt="google icon" />
              <span>Đăng nhập với Google</span>
            </button>
            <button className='facebook_btn' onClick={handleLoginWithFacebook}>
              <img src="https://img.icons8.com/color/48/facebook-new.png" alt="facebook icon" />
              <span>Đăng nhập với Facebook</span>
            </button>

            <p className='text'>
              Bạn chưa có sẵn tài khoản? <span className="text-signup" onClick={handleOpenSignUpModal}>Đăng ký</span>
            </p>

            {isOpenSignUpModal && <Signup open={isOpenSignUpModal} onClose={() => setIsOpenSignUpModal(false)}/>}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Login;
