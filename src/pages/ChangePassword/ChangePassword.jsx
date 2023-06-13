import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import { AuthContext } from '../../context/authContext';
import InputBox from '../../components/InputBox/InputBox';
import { checkUserPassword, changeUserPassword } from '../../api/user'
import LoadingCar from '../../components/LoadingCar/LoadingCar';
import toastOption from '../../config/toast';
import { toast } from 'react-toastify'
import ModalBox from '../../components/Modal/ModalBox'

const ChangePassword = () => {

  const { currentToken, userDecode, logout } = useContext(AuthContext);

  const [currentPwd, setCurrentPwd] = useState('')
  const [currentPwdVisible, setCurrentPwdVisible] = useState(false);
  const [currentPwdError, setCurrentPwdError] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const [isConfirmCurrentPwd, setIsConfirmCurrentPwd] = useState(false);

  const [newPwd, setNewPwd] = useState('');
  const [newPwdVisible, setNewPwdVisible] = useState(false);
  const [newPwdError, setNewPwdError] = useState('');

  const [confirmNewPwd, setConfirmNewPwd] = useState('');
  const [confirmNewPwdVisible, setConfirmNewPwdVisible] = useState(false);
  const [confirmNewPwdError, setConfirmNewPwdError] = useState('');

  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false)

  const handleSubmitCurrentPwd = async (e) => {
    if (!currentPwd) {
      setCurrentPwdError('Vui lòng nhập mật khẩu hiện tại trước khi đổi!');
      return;
    } else {
      setIsLoading(true)
      const response = await checkUserPassword(currentToken, userDecode._id, currentPwd);
      setIsLoading(false)
      if (response) {
        setIsConfirmCurrentPwd(true)
      } else {
        setCurrentPwdError('Mật khẩu hiện tại không chính xác!');
      }
    }
  }

  const onChangeNewPwd = (e) => {
    setNewPwd(e.target.value)
    if (currentPwd === e.target.value) {
      setNewPwdError('Vui lòng nhập mật khẩu mới khác với mật khẩu hiện tại!')
      return;
    } else {
      setNewPwdError('')
    }
  }

  const onChangeConfirmNewPwd = (e) => {
    setConfirmNewPwd(e.target.value)
    if (newPwd !== e.target.value) {
      setConfirmNewPwdError('Mật khẩu mới không khớp!')
    } else {
      setConfirmNewPwdError('')
    }
  }

  const handleChangePwdFunction = async () => {
    if (!newPwd) {
      setNewPwdError('Vui lòng nhập mật khẩu mới!')
      return;
    } else {
      setIsLoading(true)

      const data = {
        password: newPwd,
        confirmPassword: confirmNewPwd
      }

      const response = await changeUserPassword(currentToken, userDecode._id, data);
      setIsLoading(false)
      if (response) {
        setIsOpenModalConfirm(true)
      } else {
        toast.error('Change password failed!', toastOption)
      }
    }
  }

  return (
    <div className="d-flex justify-content-center flex-column change-password-container gap-3">
      <div className='title'>Quản lý mật khẩu</div>
      <div className='content d-flex flex-column gap-3'>
        <p className='note'>Mật khẩu của bạn phải có ít nhất 6 ký tự, bao gồm cả chữ số, chữ cái và ký tự đặc biệt (!$@%).</p>
        <div className='handle-password-box'>
          {!isConfirmCurrentPwd
            ?
            <div className='w-100 d-flex flex-column justify-content-center align-items-center'>
              <InputBox
                styleContainer={'w-100 d-flex flex-column justify-content-center align-items-center'}
                type={currentPwdVisible ? 'text' : 'password'}
                value={currentPwd}
                onChangeFunction={(e) => setCurrentPwd(e.target.value)}
                onFocusFunction={() => setCurrentPwdError('')}
                label={'Mật khẩu hiện tại'}
                passwordVisible={currentPwdVisible}
                togglePasswordVisibility={() => setCurrentPwdVisible(!currentPwdVisible)}
                error={currentPwdError}
              />

              <div className='btn-confirm d-flex justify-content-end'>
                <p className='btn btn-primary' onClick={handleSubmitCurrentPwd}>Xác nhận</p>
              </div>
            </div>
            :
            <div className='w-100 d-flex flex-column justify-content-center align-items-center'>
              <InputBox
                styleContainer={'w-100 d-flex flex-column justify-content-center align-items-center'}
                type={newPwdVisible ? 'text' : 'password'}
                value={newPwd}
                onChangeFunction={onChangeNewPwd}
                onFocusFunction={() => setNewPwdError('')}
                label={'Mật khẩu mới'}
                passwordVisible={newPwdVisible}
                togglePasswordVisibility={() => setNewPwdVisible(!newPwdVisible)}
                error={newPwdError}
              />

              <InputBox
                styleContainer={'w-100 d-flex flex-column justify-content-center align-items-center'}
                type={confirmNewPwdVisible ? 'text' : 'password'}
                value={confirmNewPwd}
                onChangeFunction={onChangeConfirmNewPwd}
                onFocusFunction={() => { }}
                label={'Nhập lại mật khẩu mới'}
                passwordVisible={confirmNewPwdVisible}
                togglePasswordVisibility={() => setConfirmNewPwdVisible(!confirmNewPwdVisible)}
                error={confirmNewPwdError}
              />

              <div className='btn-confirm d-flex justify-content-end'>
                <p className='btn btn-primary' onClick={handleChangePwdFunction}>Đổi mật khẩu</p>
              </div>
            </div>
          }
        </div>
        
        {!isConfirmCurrentPwd && (<Link className='link-to-forgot' to="/forgot_password">Bạn quên mật khẩu ư?</Link>)}

        {isLoading && <LoadingCar background={true} />}

        {isOpenModalConfirm
          &&
          <ModalBox
            open={isOpenModalConfirm}
            onClose={() => { setIsOpenModalConfirm(false); logout() }}
            body={'Mật khẩu đã thay đổi thành công. Bạn cần phải đăng nhập lại!'}
            btnActionYes={'Xác nhận'}
            eventToContinue={logout}
          />}
      </div>
    </div>
  )
}

export default ChangePassword