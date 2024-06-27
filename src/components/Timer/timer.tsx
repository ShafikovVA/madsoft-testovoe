import { useEffect, useState } from 'react';
import './timer.css';

export const Timer = ({ hours = 0, minutes = 2, seconds = 0 }) => {
  const [over, setOver] = useState(false);
  const [[h, m, s], setTime] = useState([hours, minutes, seconds]);

  const tick = () => {
    if (over) return;

    if (h === 0 && m === 0 && s === 0) {
      setOver(true);
    } else if (m === 0 && s === 0) {
      setTime([h - 1, 59, 59]);
      localStorage.setItem('timer', JSON.stringify([h, m, s]));
    } else if (s == 0) {
      setTime([h, m - 1, 59]);
      localStorage.setItem('timer', JSON.stringify([h, m, s]));
    } else {
      setTime([h, m, s - 1]);
      localStorage.setItem('timer', JSON.stringify([h, m, s]));
    }
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  return (
    <div className="timer">
      {`${h.toString().padStart(2, '0')}:${m
        .toString()
        .padStart(2, '0')}:${s.toString().padStart(2, '0')}`}
    </div>
  );
};
