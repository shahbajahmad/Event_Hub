import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        percentageDays: (Math.floor(difference / (1000 * 60 * 60 * 24)) / 365) * 100,
        percentageHours: (Math.floor((difference / (1000 * 60 * 60)) % 24) / 24) * 100,
        percentageMinutes: (Math.floor((difference / 1000 / 60) % 60) / 60) * 100,
        percentageSeconds: (Math.floor((difference / 1000) % 60) / 60) * 100,
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', maxWidth: 600 }}>
        {['days', 'hours', 'minutes', 'seconds'].map((unit, index) => (
          <Box key={index} textAlign="center" sx={{ position: 'relative' }}>
            <CircularProgress
              variant="determinate"
              value={100 - timeLeft[`percentage${unit.charAt(0).toUpperCase() + unit.slice(1)}`]}
              size={80}
              thickness={5}
              sx={{
                color: 'primary.main',
                position: 'relative',
                zIndex: 1,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 25,
                left: 25,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
              }}
            >
              <Typography variant="h5" component="div">
                {timeLeft[unit] <10 ?`0${timeLeft[unit]}`:timeLeft[unit]  || '00'}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {unit}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CountdownTimer;
