import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'; // Import the warning icon
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../service/features/userSlice';

export default function UserRow({ user, setSelectedUser }) {
  const dispatch = useDispatch();
  const { user: authUser } = useSelector((state) => state.auth);

  // State to control modal open/close
  const [open, setOpen] = useState(false);

  // Open modal
  const handleOpen = () => {
    setOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
  };

  // Handle delete user action
  const handleDelete = () => {
    dispatch(deleteUser(user._id));
   
    
    handleClose(); // Close modal after deletion
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2} borderBottom="1px solid #e0e0e0">
      {/* User Information */}
      <Box display="flex" alignItems="center" width="25%">
        <img
          src={`https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&size=50`} // You can replace with actual avatar
          alt={user.first_name}
          style={{ marginRight: 16, width: 50, height: 50, borderRadius: '50%' }}
        />
        <Typography variant="body1" fontWeight="bold">
          {user.first_name} {user.last_name}
        </Typography>
      </Box>

      {/* Email */}
      <Box display="flex" alignItems="center" width="25%">
        <Typography variant="body2">{user.email}</Typography>
      </Box>

      {/* Role */}
      <Box display="flex" alignItems="center" width="15%">
        <Typography variant="body2">{user.role}</Typography>
      </Box>

      {/* Actions for Admin */}
      {authUser.role === 'Admin' && (
        <Box display="flex" gap={2} alignItems="center">
          {/* View Details */}
          <IconButton
            color="primary"
            onClick={() => {
              setSelectedUser(user);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <VisibilityIcon />
          </IconButton>

          {/* Delete User */}
          <IconButton color="error" onClick={handleOpen}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}

      {/* Confirmation Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Warning Icon */}
          <WarningRoundedIcon className='text-xl' sx={{ marginRight: '10px', color: '#f44336' }} />
          <Typography variant="h6" component="span">Confirm Deletion</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete <strong>{user.first_name} {user.last_name}</strong>? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
