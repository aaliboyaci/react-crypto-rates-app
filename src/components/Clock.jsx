import React from 'react'

import { useState, useEffect } from 'react';




function Clock(){
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);
  
  function refreshClock() {
    setDate(new Date());
  }
 
  return (
    <span>
      {date.toLocaleTimeString()}
    </span>
  );
}
export default Clock;