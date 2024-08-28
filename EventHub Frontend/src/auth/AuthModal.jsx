import {React,useState} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SignupForm from "../auth/SignupForm"
import LoginForm from "../auth/LoginForm"
import {  useSelector } from 'react-redux';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: screen.width <=1024 ? '80%':  '35%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

function AuthModal({openModal,handleCloseModal}) {

      const {isLoginForm} =  useSelector((state)=>state.modal)
  return (
    <div>  
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}  >
      {isLoginForm?<LoginForm />:<SignupForm />}
      </Box>
    </Modal></div>
  )
}

export default AuthModal