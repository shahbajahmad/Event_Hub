import React, { useEffect, useRef } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Paper,
  Checkbox,
  FormGroup,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  Divider,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import FileUploader from "./FileUploader";
import { createEvent, resetEvent } from "../service/features/eventSlice";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "../service/features/snackbarSlice";
import {fetchUser} from "../service/features/userSlice"
const defaultValues = {
  event_type: "Physical",
  entry_type: "Free",
  name: "Tech Innovation Expo 2024",
  date_from: "2024-09-15",
  date_to: "2024-09-17",
  ticket_quantity:100,
  location: "San Francisco, CA",
  address: "1234 Innovation Way, San Francisco, CA 94107",
  contact_number: "123-456-7890",
  description:
    "Join us for the Tech Innovation Expo 2024, where industry leaders showcase the latest in technology and innovation.",
  banner: "",
  terms_conditions:
    "All attendees must follow the event code of conduct. No refunds will be issued.",
  video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  social_links: {
    facebook: "https://www.facebook.com/TechInnovationExpo",
    instagram: "https://www.instagram.com/tech_innovation_expo",
    linkedin: "https://www.linkedin.com/company/techinnovationexpo",
    website: "https://www.techinnovationexpo.com",
  },
  tags: ["Technology", "Innovation", "Expo"],
  highlights: [
    'In-Depth Talks and Workshops',
    'Networking Opportunities',
    'Exhibitor Showcase'
  ],
};

export default function CreateEvent() {
  const dispatch = useDispatch();
  const {
    user,
  } = useSelector((state) => state.auth);
  const { isLoading, error, event } = useSelector((state) => state.event);
  const hasMounted = useRef(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });
  const entry_type = watch("entry_type");

  const onSubmit = (data) => {
    dispatch(createEvent({ ...data, organizer_id: user._id }));
  };

  useEffect(() => {
    if (hasMounted.current) {
      if (error) {
        dispatch(showSnackbar({ message: error, severity: "error" }));
      } else if (event) {
        dispatch(fetchUser(user))
        dispatch(
          showSnackbar({
            message: "Event created successfully",
          })
        );
        dispatch(resetEvent())
       
      }
    } else {
      hasMounted.current = true;
    }
  
  }, [event, error, isLoading]);

  return (
    <>
      <Paper elevation={3} sx={{ maxWidth: "1200px", mx: "auto", p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create An Event
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Create an event to enjoy all the services
        </Typography>

        <div className="w-full overflow-y-hidden h-[100px] sm:h-[200px] relative my-2 sm:my-8">
          <img
            src="/images/event-banner.jpg"
            alt="Event Banner"
            className="absolute -bottom-10 sm:-bottom-32 left-0 w-full object-cover"
            style={{ width: "100%", borderRadius: "8px", marginBottom: "24px" }}
          />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          encType="multipart/form-data"
        >
          <Grid container spacing={4} className="p-2 sm:p-5">
            <Grid item xs={12} md={5}>
              <FormLabel component="legend">Event Type</FormLabel>
              <Controller
                name="event_type"
                control={control}
                rules={{ required: "Event type is required" }}
                render={({ field }) => (
                  <RadioGroup row aria-label="event-type" {...field}>
                    <FormControlLabel
                      value="Physical"
                      control={<Radio />}
                      label="Physical"
                    />
                    <FormControlLabel
                      value="Online"
                      control={<Radio />}
                      label="Online"
                    />
                    <FormControlLabel
                      value="Hybrid"
                      control={<Radio />}
                      label="Hybrid"
                    />
                  </RadioGroup>
                )}
              />
              {errors.event_type && (
                <Typography color="error">
                  {errors.event_type.message}
                </Typography>
              )}

              <FormLabel component="legend" sx={{ mt: 3 }}>
                Entry Type
              </FormLabel>
              <Controller
                name="entry_type"
                control={control}
                rules={{ required: "Entry type is required" }}
                render={({ field }) => (
                  <RadioGroup row aria-label="entry-type" {...field}>
                    <FormControlLabel
                      value="Free"
                      control={<Radio />}
                      label="Free"
                    />
                    <FormControlLabel
                      value="Paid"
                      control={<Radio />}
                      label="Paid"
                    />
                  </RadioGroup>
                )}
              />
              {errors.entry_type && (
                <Typography color="error">
                  {errors.entry_type.message}
                </Typography>
              )}
              {entry_type === "Paid" && (
                <FormControl fullWidth error={!!errors.ticket_price}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Amount
                  </InputLabel>
                  <OutlinedInput
                    {...register("ticket_price", {
                      required: "Amount is required",
                      min: {
                        value: 10,
                        message: "Amount cannot be less than $10",
                      },
                    })}
                    id="outlined-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Amount"
                    type="number"
              
                  />
                  {errors.ticket_price && (
                    <FormHelperText >{errors.ticket_price.message}</FormHelperText>
                  )}
                </FormControl>
              )}

              <TextField
                fullWidth
                label="Event Name"
                required
                margin="normal"
                placeholder="Enter Event Name"
                {...register("name", { required: "Event name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
<TextField
  fullWidth
  label="Ticket Quantity"
  required
  margin="normal"
  type="number"
  {...register("ticket_quantity", {
    required: "Ticket quantity is required",
    min: {
      value: 1,
      message: "Ticket quantity must be at least 1",
    },
  })}
  InputLabelProps={{
    shrink: true,
  }}
  error={!!errors.ticket_quantity}
  helperText={errors.ticket_quantity?.message}
/>

              <TextField
                fullWidth
                label="Date From"
                required
                margin="normal"
                type="date"
                {...register("date_from", {
                  required: "Date from is required",
                })}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.date_from}
                helperText={errors.date_from?.message}
              />

              <TextField
                fullWidth
                label="Date To"
                margin="normal"
                type="date"
                {...register("date_to")}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                fullWidth
                label="Select Location"
                required
                margin="normal"
                placeholder="Enter Location"
                {...register("location", { required: "Location is required" })}
                error={!!errors.location}
                helperText={errors.location?.message}
              />

              <TextField
                fullWidth
                label="Full Address"
                margin="normal"
                placeholder="Enter Full Address"
                {...register("address")}
              />

              <TextField
                fullWidth
                label="Contact No."
                required
                margin="normal"
                placeholder="Enter Contact Number"
                type="tel"
                {...register("contact_number", {
                  required: "Contact number is required",
                })}
                error={!!errors.contact_number}
                helperText={errors.contact_number?.message}
              />

              <TextField
                fullWidth
                label="Event Description"
                required
                margin="normal"
                placeholder="Enter Event Description Here..."
                multiline
                rows={4}
                {...register("description", {
                  required: "Event description is required",
                  minLength: {
                    value: 100,
                    message: "Minimum 100 characters required",
                  },
                  maxLength: {
                    value: 1000,
                    message: "Maximum 1000 characters allowed",
                  },
                })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>

            <Divider orientation="vertical" flexItem className="ms-10" />

            <Grid item xs={12} md={5}>
              <FormLabel component="legend">Upload Banner</FormLabel>
              <FileUploader
                name="banner"
                control={control}
                accept="image/jpeg,image/png,image/gif"
                rules={{
                  required: "Banner image is required",
                  validate: {
                    checkFileType: (value) => {
                      const file = value[0];
                      if (!file) return true;
                      const fileTypes = [
                        "image/jpeg",
                        "image/png",
                        "image/gif",
                      ];
                      return (
                        fileTypes.includes(file.type) ||
                        "Only JPEG, PNG, and GIF images are allowed"
                      );
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Terms and Conditions"
                margin="normal"
                rows={4}
                multiline
                placeholder="Add the Terms and Conditions for the Event"
                {...register("terms_conditions", {
                  required: "Terms and conditions are required",
                })}
                error={!!errors.terms_conditions}
                helperText={errors.terms_conditions?.message}
              />

              <TextField
                fullWidth
                label="Add Video URL"
                margin="normal"
                placeholder="Add Video URL"
                {...register("video_url", {
                  pattern: {
                    value: /^https:\/\//,
                    message: "Please enter a valid URL",
                  },
                })}
              />

              <TextField
                fullWidth
                label="Facebook"
                margin="normal"
                placeholder="Account Link"
                {...register("social_links.facebook", {
                  pattern: {
                    value: /^https:\/\//,
                    message: "Please enter a valid URL",
                  },
                })}
                error={!!errors.social_links?.facebook}
                helperText={errors.social_links?.facebook?.message}
              />

              <TextField
                fullWidth
                label="Instagram"
                margin="normal"
                placeholder="Account Link"
                {...register("social_links.instagram", {
                  pattern: {
                    value: /^https:\/\//,
                    message: "Please enter a valid URL",
                  },
                })}
                error={!!errors.social_links?.instagram}
                helperText={errors.social_links?.instagram?.message}
              />

              <TextField
                fullWidth
                label="LinkedIn"
                margin="normal"
                placeholder="Account Link"
                {...register("social_links.linkedin", {
                  pattern: {
                    value: /^https:\/\//,
                    message: "Please enter a valid URL",
                  },
                })}
              />

              <TextField
                fullWidth
                label="Website"
                margin="normal"
                placeholder="Website Link"
                {...register("social_links.website", {
                  pattern: {
                    value: /^https:\/\//,
                    message: "Please enter a valid URL",
                  },
                })}
              />
              <TextField
                fullWidth
                label="Event Highlights"
                margin="normal"
                multiline
                rows={4}
                placeholder="Enter Event Highlights (comma-separated)"
                {...register("highlights", {
                  required:
                   
                   "e.g., In-Depth Talks, Networking Opportunities",
             
                })}
                error={!!errors.highlights}
                helperText={errors.highlights?.message}
                
              />
              <FormLabel component="legend" sx={{ mt: 3 }}>
                Tags
              </FormLabel>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox {...register("tags")} value="Technology" />
                  }
                  label="Technology"
                />
                <FormControlLabel
                  control={<Checkbox {...register("tags")} value="Sports" />}
                  label="Sports"
                />
                <FormControlLabel
                  control={<Checkbox {...register("tags")} value="Health" />}
                  label="Health"
                />
                <FormControlLabel
                  control={<Checkbox {...register("tags")} value="Media" />}
                  label="Media"
                />
                <FormControlLabel
                  control={<Checkbox {...register("tags")} value="Fitness" />}
                  label="Fitness"
                />
              </FormGroup>
            </Grid>
            <Grid container className="justify-end" sx={{ mt: 0 }}>
              <Button variant="contained" color="primary" type="submit">
                Create Event
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Full-Screen Loader */}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
