import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, updateUser } from '../../service/features/userSlice';
import { setActiveTab } from '../../service/features/sideBarSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function UserRow({ user }) {
  const dispatch = useDispatch();
  const { user: authUser } = useSelector((state) => state.auth);

  const handleDelete = () => {
    dispatch(deleteUser(user._id));
  };

  const handleUpdate = () => {
    dispatch(updateUser(user));
    dispatch(setActiveTab('editUser')); // Assuming 'editUser' tab is present
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
          <Link to={`/user/${user._id}`}>
            <IconButton color="primary">
              <VisibilityIcon />
            </IconButton>
          </Link>

          {/* Edit User */}
          <IconButton color="secondary" onClick={handleUpdate}>
            <EditIcon />
          </IconButton>

          {/* Delete User */}
          <IconButton color="error" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
