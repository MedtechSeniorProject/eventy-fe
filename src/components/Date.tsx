import React, { useState, useEffect } from "react";

const TodayDate: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      setIsLoading(false); // Set loading to false once the date is fetched
    }, 1000); // Update every second
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>{currentDate}</p>
      )}
    </div>
  );
};

export default TodayDate;
