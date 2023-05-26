import React from 'react'
import "./style.css"

function NumberUserCard({ title, number, logo }) {
    return (
        <div className='w-100 d-flex gap-1 align-items-center'>
            <div className='card-logo'>
                {logo}
            </div>
            <span className='fs-5 fw-bolder'>{title}</span>
            <span className='fs-4 fw-bold ml-auto'>{number}</span>
        </div>
    )
}

export default NumberUserCard