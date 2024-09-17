import React, { useEffect } from 'react';
import { Grid, Paper, Typography, Divider, CircularProgress, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import UserRow from '../UserRow'; // Assuming you have a UserRow component like EventRow
import { fetchAllUsers } from '../../../service/features/userSlice'; // Adjust path to match your setup

export default function AllUserPage() {
  const dispatch = useDispatch();
  
  // Fetch users from the Redux store
  const { users, error, isLoading } = useSelector((state) => state.userDetail);

  // Fetch users when the component mounts
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="min-h-screen p-4">
      <Grid container spacing={3}>
        {/* All Users Section */}
        <Grid item xs={12}>
          <Typography variant="h5" className="font-light mb-4">All Users</Typography>
          <Paper elevation={3} className="p-4 overflow-auto">
         
    {/* Header */}
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2} borderBottom="2px solid #e0e0e0" fontWeight="bold">
  <Box display="flex" alignItems="center" width="30%">
    <Typography variant="body1" fontWeight="bold">User</Typography>
  </Box>
  <Box display="flex" alignItems="center" width="28%"> {/* Adjust width for Email */}
    <Typography variant="body1" fontWeight="bold">Email</Typography>
  </Box>
  <Box display="flex" alignItems="center" width="19%"> {/* Adjust width for Role */}
    <Typography variant="body1" fontWeight="bold">Role</Typography>
  </Box>
  <Box display="flex" alignItems="center" width="10%">
    <Typography variant="body1" fontWeight="bold">Action</Typography>
  </Box>
</Box>


            <Divider className="mb-4" />
            {isLoading ? (
              <CircularProgress />
            ) : error ? (
              <Typography>No users available.</Typography>
            ) : users.length > 0 ? (
              users.map(user => <UserRow key={user._id} user={user} />) // Render a UserRow component for each user
            ) : (
              <Typography>No users found.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
