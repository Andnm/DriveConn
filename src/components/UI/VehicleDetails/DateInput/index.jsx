import React, { useState } from 'react'
import './style.css'

const DateInput = ({ date, handleDateChange, time, handleTimeChange }) => {

    return (
        <form className="datetime-input">
            <label className="datetime-input-label date-label">
                <input
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    className="datetime-input-field"
                />
            </label>
            <label className="datetime-input-label time-label">
                <input
                    type="time"
                    value={time}
                    onChange={handleTimeChange}
                    className="datetime-input-field"
                />
            </label>
            <br />
        </form>
    )
}

export default DateInput