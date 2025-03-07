import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const CountDownTimer = () => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const targetDate = new Date("2025-03-28T00:00:00");
    const difference = targetDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  const formatTime = (time) => (time < 10 ? `0${time}` : time);
  return (
    <>
      {/* Countdown Timer */}
      <div className="bg-gray-900 text-white py-4">
        <div className="container mx-auto flex justify-center items-center">
          <Clock className="mr-2" size={24} />
          <div className="flex space-x-4">
            <div className="text-center">
              <span className="text-2xl font-mono">
                {formatTime(timeLeft.days)}
              </span>
              <span className="text-xs block">DAYS</span>
            </div>
            <span className="text-2xl">:</span>
            <div className="text-center">
              <span className="text-2xl font-mono">
                {formatTime(timeLeft.hours)}
              </span>
              <span className="text-xs block">HOURS</span>
            </div>
            <span className="text-2xl">:</span>
            <div className="text-center">
              <span className="text-2xl font-mono">
                {formatTime(timeLeft.minutes)}
              </span>
              <span className="text-xs block">MINUTES</span>
            </div>
            <span className="text-2xl">:</span>
            <div className="text-center">
              <span className="text-2xl font-mono">
                {formatTime(timeLeft.seconds)}
              </span>
              <span className="text-xs block">SECONDS</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountDownTimer;
