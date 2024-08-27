import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
function SignupForm({ switchModel }) {
  const form = useForm();
  const { register, control, handleSubmit,watch,formState } = form;
  const {errors} = formState;
  const password = watch("password");
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstname"
              {...register("firstname",{
                required: "First name is required"})}
              label="First Name"
              error={!!errors.firstname}
              helperText={errors.firstname?.message}
              fullWidth
              autoComplete="given-name"
            ></TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastname"
              {...register("lastname",{
                required: "Last name is required"})}
              label="Last Name"
              fullWidth
              error={!!errors.lastname}
              helperText={errors.lastname?.message}
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
                  message: "Minimun 8 characters required",
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
            >
              Sign Up
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
                onClick={() => {
                  switchModel(false);
                }}
                style={{ color: "#1976d2", cursor: "pointer" }}
              >
                Login
              </span>
            </Typography>
          </Grid>
        </Grid>
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default SignupForm;
