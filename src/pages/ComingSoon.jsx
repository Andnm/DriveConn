import React, { useState, useEffect } from 'react';
import './styles/comingSoon.css'

const ComingSoon = () => {
  const countDownDate = new Date('June 4, 2023 00:00:00').getTime();
  const [day, setDay] = useState('00');
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');
  const [second, setSecond] = useState('00');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      setDay(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHour(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMinute(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSecond(Math.floor((distance % (1000 * 60)) / 1000));

    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <header className="bg-coming-soon">
        <div className="Soon">
          <h1 className='title-coming-soon'>COMING SOON</h1>
          <p>We're a small and growing consulting firm with big ideas</p>
          <hr className='spectator-line' />
          
          <div className='count-down'>

            <div className='timer day'>
              <div className='count'>
                <div className='numb'>{day}</div>
                <div className='text-time'>Days</div>
              </div>
            </div>

            <div className='clone'>:</div>

            <div className='timer hour'>
              <div className='count'>
                <div className='numb'>{hour}</div>
                <div className='text-time'>Hours</div>
              </div>
            </div>

            <div className='clone'>:</div>

            <div className='timer min'>
              <div className='count'>
                <div className='numb'>{minute}</div>
                <div className='text-time'>Minutes</div>
              </div>
            </div>

            <div className='clone'>:</div>

            <div className='timer sec'>
              <div className='count'>
                <div className='numb'>{second}</div>
                <div className='text-time'>Seconds</div>
              </div>
            </div>

          </div>

        </div>
      </header>
    </div>
  );
};

export default ComingSoon;