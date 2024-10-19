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
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addEditEvent, approveEvent, rejectEvent, deleteEvent } from '../../service/features/eventSlice';
import { setActiveTab } from '../../service/features/sideBarSlice';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

export default function EditEventRow({ event }) {
  const dispatch = useDispatch();
  const currentDate = new Date();
  const { user: { role } } = useSelector((state) => state.auth);

  // Modal state for delete confirmation
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleEdit = () => {
    dispatch(addEditEvent(event));
    dispatch(setActiveTab('editEvents'));
  };

  const handleApprove = () => {
    dispatch(approveEvent(event._id));
  };

  const handleReject = () => {
    dispatch(rejectEvent(event._id));
  };

  const handleDelete = () => {
    dispatch(deleteEvent(event._id));
    setOpenDeleteModal(false); // Close modal after deletion
  };

  // Open and close the delete modal
  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2} borderBottom="1px solid #e0e0e0">
      <Box display="flex" textOverflow={"ellipsis"} alignItems="center" width="25%">
        <img
          src={event.banner}
          alt={event.name}
          style={{ marginRight: 16, width: 50, height: 50, objectFit: 'contain' }}
        />
        <Typography variant="body1" className='font-semibold'>
          {event.name}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" width="25%">
        <Typography pl={5} textTransform={"capitalize"} variant="body2">
          {event.organizer_id?.first_name} {event.organizer_id?.last_name}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" width="15%">
        <Typography variant="body2">{new Date(event.date_from).toLocaleDateString()}</Typography>
      </Box>
      <Box display="flex" alignItems="center" width="15%">
        <Typography variant="body2">
          {event.entry_type === 'Free' ? 'Free' : `$${event.ticket_price}`}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" width="15%">
        <Typography 
          variant="body2" 
          style={{ 
            color: event.status === "Approved" ? "green" : event.status === "Complete" ? "purple" : "orange" 
          }}
          className='font-bold'
        >
          {event.status}
        </Typography>
      </Box>

      <Box display="flex" gap={2} alignItems="center">
        {role === "Admin" ? (
          <>
            {/* Approve with Icon */}
            <IconButton color="success" onClick={handleApprove} disabled={event.status === "Approved" || event.status === "Complete"}>
              <CheckIcon />
            </IconButton>

            {/* Reject with Icon */}
            <IconButton color="warning" onClick={handleReject} disabled={event.status === "Reject" || event.status === "Complete"}>
              <CloseIcon />
            </IconButton>

            {/* Delete with Icon */}
            <IconButton color="error" onClick={handleOpenDeleteModal} >
              <DeleteIcon />
            </IconButton>
          </>
        ) : (
          <>
            {/* View Details with Icon */}
            <Link to={`/event/${event._id}`}>
              <IconButton color="primary">
                <VisibilityIcon />
              </IconButton>
            </Link>

            {/* Edit with Icon */}
            <IconButton color="secondary" disabled={!(event.status === "In Process" || event.status === "Reject")} onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          </>
        )}
      </Box>

      {/* Confirmation Modal for Delete */}
      <Dialog
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', alignItems: 'center' }}>
          <WarningRoundedIcon sx={{ marginRight: '10px', color: '#f44336' }} />
          <Typography variant="h6" component="span">Confirm Deletion</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete <strong>{event.name}</strong>? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal} color="primary">
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
