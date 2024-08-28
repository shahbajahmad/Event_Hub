import React from 'react'
import { Avatar } from '@mui/material';
import { setavatarColor } from '../service/features/userSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function stringToColor(string) {
   
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}`,
    };
  }
export default function CustomAvatar({str}) {
  const dispatch = useDispatch()
  useEffect(() => {
 
 
 dispatch(setavatarColor(stringToColor(str)))   
  }, )
  
  return (
    <div> <Avatar {...stringAvatar(str)} className='uppercase' variant="" /></div>
  )
}
