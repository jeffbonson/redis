import React, { useState, useEffect } from 'react';

const Records = () => {
  const [data, setData] = useState({
    records: [],
    loading: true,
    error: null,
    time: 0,
  });

  const timeDiff = (start, end) => {
    const loadingTime = end - start;
    const milliseconds = loadingTime % 1000; // Get the remainder in milliseconds
    return milliseconds;
  }
  

  useEffect(() => {
    const startTime = new Date(); // Record the start time

    // Dummy API call to fetch records
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        const endTime = new Date(); // Record the start time
        setData({
          ...data,
          records: responseData,
          loading: false,
          time: timeDiff(startTime, endTime),
        });
      })
      .catch((error) => {
        const endTime = new Date(); // Record the start time
        setData({
          ...data,
          error,
          loading: false,
          time: timeDiff(startTime, endTime),
        });
      });
  }, []);

  if (data.loading) {
    return <p>Loading records...</p>;
  }

  if (data.error) {
    return <p>Error loading records: {data.error.message}</p>;
  }

  return (
    <div>
      <h2>Records</h2>
      <h4>Loading time {data.time}ms</h4>
      <ul>
        {data.records.map((record) => (
          <li key={record.id}>{record.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Records;
