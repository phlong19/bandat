import { useEffect, useState } from "react";

const useCountdown = (initialSeconds, onComplete) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (seconds > 0) {
      const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    } else {
      setIsComplete(true);
      onComplete && onComplete();
    }
  }, [seconds, onComplete]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const formattedSeconds = formatTime(seconds);

  return { formattedSeconds, isComplete, setSeconds, setIsComplete };
};

export default useCountdown;
