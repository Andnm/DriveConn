import React from 'react'
import './style.css'

import ModalBox from '../../Modal/ModalBox'

const UpdateProfile = (open, onClose) => {

    return (
        <div>
            {open
                &&
                <ModalBox 
                open={open}
                onClose={onClose}
                />
            }
        </div>
    )
}

export default UpdateProfile