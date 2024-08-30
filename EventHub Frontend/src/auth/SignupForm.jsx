import { Alert, Button, Grid, Snackbar, TextField, Typography } from "@mui/material";
import React,{useEffect,useRef,useState} from "react";
import { useForm } from "react-hook-form";
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../service/features/authSlice';
import { switchtoLoginModal } from "../service/features/modalSlice";
import { showSnackbar } from "../service/features/snackbarSlice";


function SignupForm() {
  const dispatch = useDispatch();
 
  const { isLoading, signupError } = useSelector((state) => state.auth);
  const prevIsLoading = useRef(isLoading);
  const form = useForm();
  const { register,control ,handleSubmit, watch, formState: { errors } } = form;
 

  const password = watch("password");

  const onSubmit =  (data) => {
    dispatch(signupUser(data));
   
  };  

  useEffect(() => {
    if (!isLoading && prevIsLoading.current) {
      if (!signupError) {
          // Signup was successful
          dispatch(switchtoLoginModal());
          dispatch(showSnackbar({ message: "Account created successfully", severity: 'success' }));
      } else {
          // Signup encountered an error
          dispatch(showSnackbar({ message: signupError, severity: 'error' }));
      }
  }
  prevIsLoading.current = isLoading;

  }, [isLoading, signupError, dispatch]);


  return (
    
    <div>
      
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="first_name"
              {...register("first_name", {
                required: "First name is required",
                minLength:{value:3,message:"Minimum 3 characters required"}
              })}
              label="First Name"
              error={!!errors.first_name}
              helperText={errors.first_name?.message}
              fullWidth
              autoComplete="given-name"
            ></TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="last_name"
              {...register("last_name", {
                required: "Last name is required",
                minLength:{value:3,message:"Minimum 3 characters required"}
              })}
              label="Last Name"
              fullWidth
              error={!!errors.last_name}
              helperText={errors.last_name?.message}
              autoComplete="given-name"
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email",
                },
              })}
              label="Email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              autoComplete="given-name"
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Minimum 8 characters required",
                },
              })}
              label="Password"
              type="password"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
              autoComplete="given-name"
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="confirmpassword"
              {...register("confirmpassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              label="Confirm Password"
              type="password"
              fullWidth
              error={!!errors.confirmpassword}
              helperText={errors.confirmpassword?.message}
              autoComplete="given-name"
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              variant="contained"
              fullWidth
              sx={{ paddingBlock: "13px" }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Sign Up"}
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Typography align="center">
              Already have an account?{" "}
              <span
                onClick={() => dispatch(switchtoLoginModal())}
                style={{ color: "#1976d2", cursor: "pointer" }}
              >
                Login
              </span>
            </Typography>
          </Grid>
        </Grid>
      </form>
     
    </div>
  );
}

export default SignupForm;
