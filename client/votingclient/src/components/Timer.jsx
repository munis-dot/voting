import React, { useState, useEffect } from 'react';

function Timer() {
    const timeString = "April 6, 2023 12:00 PM IST";
const targetTime = new Date(timeString);
  const [remainingTime, setRemainingTime] = useState(targetTime - Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(targetTime - Date.now());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetTime]);

  const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
  const seconds = Math.floor((remainingTime / 1000) % 60);

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div>
      <div className='flex justify-center'>
    <div> <h1 className='text-white font-bold text-6xl'>WALLET AMOUNT</h1></div>
</div>
<div className='flex justify-center mt-15'>
<div> <h1 className='text-white font-bold text-6xl flex-col'>₹ 376376347653476</h1></div>
</div>
      <h1>Time Remaining: {formattedTime}</h1>
      <h1>{targetTime.getTime()}</h1>
    </div>
  );
}

export default Timer;






