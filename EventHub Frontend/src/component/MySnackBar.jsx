import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {hideSnackbar} from "../service/features/snackbarSlice"
import { Alert, Snackbar } from '@mui/material';

export default function MySnackBar() {
  const dispatch =   useDispatch()
  const { vertical,horizontal,open,message,severity } = useSelector(state => state.snackbar);

    const handleClose = () => {
        dispatch(hideSnackbar()); 
      };
    
  return (
    <>  <Snackbar 
    autoHideDuration={3000}
    anchorOrigin={{ vertical, horizontal }}
    open={open}
    onClose={handleClose}
    key={vertical + horizontal}
  >
    <Alert onClose={handleClose} severity={severity}>
      {message}
    </Alert>
  </Snackbar></>
  )
}
