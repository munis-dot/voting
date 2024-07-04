import { useState,useEffect } from "react";
function CountdownTimer({ targetTime }) {
    const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());
  
    function calculateRemainingTime() {
      const currentTime = new Date().getTime();
      const remainingMilliseconds = Math.max(targetTime - currentTime, 0);
      return Math.floor(remainingMilliseconds / 1000);
    }
    
  
    useEffect(() => {
      const timerId = setInterval(() => {
        setRemainingTime(prevRemainingTime => prevRemainingTime - 1);
      }, 1000);
  
      return () => clearInterval(timerId);
    }, []);
  
    function formatTime(time) {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = time % 60;
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
  
    return (
      <div>
        <h1 className='text-white text-center font-bold text-9xl'>{formatTime(remainingTime)}</h1>
      </div>
    );
  }

  export default CountdownTimer;