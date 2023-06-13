import React from 'react'
import './style.css'
import Message from '../shared/Message'

const InputBox = (props) => {

    const { styleContainer, type, value, onChangeFunction, onFocusFunction, label, passwordVisible, togglePasswordVisibility, error } = props

    return (
        <div className={styleContainer}>
            <div className="input-box">
                <input
                    type={type}
                    className="input"
                    placeholder=" "
                    value={value}
                    onChange={onChangeFunction}
                    onFocus={onFocusFunction}
                />
                <label htmlFor="">{label}</label>

                {togglePasswordVisibility && value && (
                    <span
                        className={`password-toggle ${passwordVisible ? 'visible' : ''}`}
                        onClick={togglePasswordVisibility}
                    >
                        {!passwordVisible ? <i className="ri-eye-off-line"></i> : <i className="ri-eye-line"></i>}
                    </span>
                )}
            </div>
            {error && <Message text_color={'text-danger'} children={error} style={{ marginBottom: '10px' }} />}
        </div>
    );
}

export default InputBox