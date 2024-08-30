import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../service/features/authSlice';
import { closeModal, switchtoSignupModal } from '../service/features/modalSlice';
import { showSnackbar } from "../service/features/snackbarSlice";

function SignupForm() {
  const dispatch = useDispatch();
  const { isLoading, loginError, token } = useSelector((state) => state.auth);
  
  const form = useForm();
  const { register, handleSubmit, formState: { errors } } = form;

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (!isLoading && loginError) {
      dispatch(showSnackbar({ message: loginError, severity: 'error' }));
    }
    if (token) {
      dispatch(closeModal());
    }
  }, [token, dispatch,isLoading,loginError]);
 
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Minimum 8 characters required",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              label="Password"
              type="password"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              sx={{ paddingBlock: "13px" }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </Grid>
          <Grid item xs={12} container justifyContent="center" alignItems="center">
            <Typography align="center">
              Create a new account{" "}
              <span
                onClick={() => dispatch(switchtoSignupModal())}
                style={{ color: "#1976d2", cursor: "pointer" }}
              >
                Signup
              </span>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default SignupForm;
