import React, { useState } from 'react';
import {
  Paper,
  Avatar,
  Typography,
  Grid,
  Button,
  Divider,
  IconButton,
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useSelector ,useDispatch} from 'react-redux';
import { useForm } from "react-hook-form";
import { updateUser } from '../service/features/userSlice';

export default function ProfilePage() {
  const { avatarColor } = useSelector((state) => state.userDetail);
  const { user: { _id,first_name, last_name, email, city = "", gender = "" } } = useSelector((state) => state.auth);

  const [isEditable, setIsEditable] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    defaultValues: {
      first_name: first_name,
      last_name: last_name,
      email: email,
      city: city,
      gender: gender,
    },
  });

  const dispatch = useDispatch()

  const onSubmit = (data) => {
    console.log(data)
    dispatch(updateUser({ ...data, _id }));
    setIsEditable(false);
  };

  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };

  return (
    <Box sx={{ maxWidth: '900px', mx: 'auto', mt: 4, p: 2 }}>
      {/* Profile Header */}
      <Paper elevation={3} sx={{ mb: 4, paddingBlock: 5 }}>
        <Box
          sx={{
            backgroundImage: 'url(/images/profile-banner.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '150px',
            borderRadius: '8px 8px 0 0',
          }}
        />
        <Box sx={{ textAlign: 'center', mt: '-50px' }}>
          <Avatar
            sx={{ fontSize: 30, width: 100, height: 100, mx: 'auto', border: '4px solid white', bgcolor: avatarColor }}
          >
            {first_name[0]}
          </Avatar>
          <Typography variant="h5" sx={{ mt: 2 }} className="capitalize">
            {`${first_name} ${last_name}`} <span style={{ color: '#00f' }}>•</span>
          </Typography>
          <Grid container justifyContent="center" sx={{ mt: 2 }}>
            <Grid item xs={6} sm={3}>
              <Typography variant="h6">0</Typography>
              <Typography variant="body2" color="textSecondary">
                Events Attended
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="h6">0.00</Typography>
              <Typography variant="body2" color="textSecondary">
                Total Spending on Tickets (Rupees)
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Personal Info Section */}
      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Personal Info</Typography>
          <IconButton aria-label="edit" onClick={handleEditClick}>
            {isEditable ? <SaveIcon /> : <EditIcon />}
          </IconButton>
        </Box>
        <Divider sx={{ my: 2 }} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">First Name:</Typography>
              {isEditable ? (
                <TextField
                  {...register("first_name", { required: "First name is required" })}
                  fullWidth
                  error={!!errors.first_name}
                  helperText={errors.first_name?.message}
                />
              ) : (
                <Typography variant="body1" className="normal-case">
                  {watch("first_name")} {watch("last_name")}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
           
              {isEditable ? (<>
                <Typography variant="subtitle2">Last Name:</Typography>
                <TextField
                {...register("last_name", { required: "First name is required" })}
                  fullWidth
                  error={!!errors.last_name}
                  helperText={errors.last_name?.message}
                /></>
              ) : (<> <Typography variant="subtitle2">Email:</Typography>
              <Typography variant="body1">{email}
                </Typography></>
                
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">City:</Typography>
              {isEditable ? (
                <TextField
                  {...register("city")}
                  fullWidth
                />
              ) : (
                <Typography variant="body1">{watch("city") || '-'}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Gender:</Typography>
              {isEditable ? (
                <RadioGroup
                  value={watch("gender")}
                  onChange={(e) => setValue("gender", e.target.value)}
                  row
                >
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              ) : (
                <Typography variant="body1">{watch("gender") || '-'}</Typography>
              )}
            </Grid>
          </Grid>
          {isEditable && (
            <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </Grid>
          )}
        </form>
      </Paper>

      {/* Ticket Preview Section */}
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Ticket Preview
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ textAlign: 'right' }}>
          <Button endIcon={<EditIcon />}>scroll</Button>
        </Box>
      </Paper>
    </Box>
  );
}
