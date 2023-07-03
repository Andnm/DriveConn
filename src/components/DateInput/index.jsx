import React, { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import vi from 'date-fns/locale/vi';
import './style.css'
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';

registerLocale('vi', vi);
setDefaultLocale('vi');

const DateInput = ({ date, handleDateChange, dateEnd }) => {

    let currentDate = dateEnd !== true ? new Date() : addDays(new Date(), 1);

    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        return currentDate.getTime() < selectedDate.getTime();
    };

    const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
        <button className="custom-datepicker-input" onClick={onClick} ref={ref}>
            <i className="ri-calendar-line"></i>
            <span>{value}</span>
        </button>
    ));

    return (
        <div className="datetime-input">
            <DatePicker
                showIcon
                selected={date}
                onChange={handleDateChange}
                minDate={currentDate}
                showTimeSelect
                filterTime={filterPassedTime}
                dateFormat="dd/MM/yyyy &nbsp; &nbsp; h:mm aa"
                timeCaption="Thời gian"
                className="custom-datepicker"
                customInput={<CustomInput />}
            />
        </div>
    );
};

export default DateInput;
