import React, { useState, useEffect, useContext } from "react";
import { Clock, Timer } from "lucide-react";
import { MyContext } from "../context/AuthContextProvider";

const CountDownTimer = () => {
  const { hackathon } = useContext(MyContext);

  const calculateTimeLeft = () => {
    if (!hackathon?.startDate || !hackathon?.endDate) return null;

    const now = new Date();
    const startDate = new Date(hackathon.startDate);
    const endDate = new Date(hackathon.endDate);

    let targetDate;

    if (now < startDate) {
      targetDate = startDate;
    } else if (now >= startDate && now < endDate) {
      targetDate = endDate;
    } else {
      return "ended";
    }

    const difference = targetDate - now;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isOngoing: now >= startDate && now < endDate,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [hackathon]);

  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  if (!timeLeft) return null;

  if (timeLeft === "ended") {
    return (
      <div className="bg-gray-900 text-white py-6">
        <div className="container mx-auto flex items-center justify-center space-x-2">
          <span role="img" aria-label="alert" className="text-red-400 text-2xl">
            ⚠️
          </span>
          <p className="text-xl font-semibold text-red-400">
            Hackathon has ended
          </p>
        </div>
      </div>
    );
  }

  const TimeBlock = ({ value, label }) => (
    <div className="flex flex-col items-center justify-center bg-gray-800 rounded-lg p-2 min-w-[60px]">
    <span className="text-xl font-mono font-bold text-white">
      {formatTime(value)}
    </span>
    <span className="text-[11px] font-medium text-gray-400 mt-0.5">
      {label}
    </span>
  </div>
  );

  return (
    <div className="bg-gray-900 text-white py-4">
  <div className="container mx-auto px-4">
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center mb-3 space-x-2">
        <span className="text-blue-400 text-2xl"><Timer/></span>
        <h2 className="text-lg font-semibold">
          {timeLeft.isOngoing ? (
            <span className="text-red-400">Ends in</span>
          ) : (
            <span className="text-green-400">Starts in</span>
          )}
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <TimeBlock value={timeLeft.days} label="DAYS" />
        <TimeBlock value={timeLeft.hours} label="HOURS" />
        <TimeBlock value={timeLeft.minutes} label="MINUTES" />
        <TimeBlock value={timeLeft.seconds} label="SECONDS" />
      </div>

      <div className="mt-3 text-sm text-gray-400">
        {timeLeft.isOngoing ? (
          <span className="flex items-center">
            <span className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse"></span>
            Hackathon in progress
          </span>
        ) : (
          <span className="flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            Get ready for the upcoming hackathon
          </span>
        )}
      </div>
    </div>
  </div>
</div>

  );
};

export default CountDownTimer;
