import React, { useState, useEffect } from "react";

const TodayDate: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formattedDate: string = date.toLocaleDateString("en-US", options);
      setCurrentDate(formattedDate);
    }, 1000); // Update every second
    return () => clearInterval(interval);
  }, []);

  return <div>{currentDate}</div>;
};

export default TodayDate;
