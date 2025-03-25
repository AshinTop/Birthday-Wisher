import React, { useState, useEffect } from 'react';
import Countdown from './Countdown';
import githubLogo from './githubLogo.svg';
import { Link } from 'react-router-dom';
import WishCake from './WishCake';

const Birthday = ({ name, day, month }) => {
  // useState Hooks
  const [state, setState] = useState({
    seconds: 0,
    hours: 0,
    minutes: 0,
    days: 0,
    isItBday: false,
  });

  if (name === undefined || day === undefined || month === undefined) {
    name = 'Cici'; // Name of the Person
    month = 3; // Month of the Birthday
    day = 30; // Day of the Birthday
  }

  // get current time
  const currentTime = new Date();
  // get current year
  const currentYear = currentTime.getFullYear();

  // Birthday Boolean
  const isItBday =
    currentTime.getDate() ===  Number(day) && currentTime.getMonth() ===  Number(month) - 1;

  useEffect(() => {
    const intervalId = setInterval(() => {
      const countdown = () => {
        const dateAtm = new Date();

        let birthdayDay = new Date(currentYear, month - 1, day);
        if (dateAtm > birthdayDay) {
          birthdayDay = new Date(currentYear + 1, month - 1, day);
        } else if (dateAtm.getFullYear() === birthdayDay.getFullYear() + 1) {
          birthdayDay = new Date(currentYear, month - 1, day);
        }

        const currentTime = dateAtm.getTime();
        const birthdayTime = birthdayDay.getTime();

        const timeRemaining = birthdayTime - currentTime;

        let seconds = Math.floor(timeRemaining / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        seconds %= 60;
        minutes %= 60;
        hours %= 24;

        setState((prevState) => {
          // Only update state if there is a change
          if (
            prevState.seconds !== seconds ||
            prevState.minutes !== minutes ||
            prevState.hours !== hours ||
            prevState.days !== days ||
            prevState.isItBday !== isItBday
          ) {
            return {
              ...prevState,
              seconds,
              minutes,
              hours,
              days,
              isItBday,
            };
          }
          return prevState;
        });
      };

      if (!isItBday) {
        countdown();
      } else {
        setState((prevState) => ({
          ...prevState,
          isItBday: true,
        }));
      }

    }, 1000);

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, [currentYear, day, month, isItBday]);

  let birth = new Date(currentYear, month - 1, day);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
  ];
  let monthBday = monthNames[birth.getMonth()];

  return (
    <div className='page'>
      {isItBday ? (
        // 生日当天显示祝福
        <WishCake name={name} />
      ) : (
        // 其他时间显示倒计时
        <>
          <Countdown countdownData={state} name={name} />
          <div className='birthdate'>
            Birth-Date: {day} {monthBday} {currentYear}
          </div>
          <div className='credits'>
            <a href='https://github.com/AshinTop/Birthday-Wisher' target='_blank'>
              <img src={githubLogo} alt='Github-Logo' className='github-logo' />
            </a>
          </div>
          <Link to='/generate'>Generate Here</Link>
        </>
      )}
    </div>
  );
};

export default Birthday;
