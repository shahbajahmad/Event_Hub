import { GroupAdd } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";

function SignupForm({switchModel}) {
  const handleSubmit = () => {};
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstname"
              name="firstname"
              label="First Name"
              fullWidth
              autoComplete="given-name"
            ></TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastname"
              name="lastname"
              label="Last Name"
              fullWidth
              autoComplete="given-name"
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="given-name"
            ></TextField>
          </Grid> 
           <Grid item xs={12} sm={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"     type="password"
              fullWidth
              autoComplete="given-name"
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="confirmpassword"
              name="confirmpassword"
              label="Confirm Password"     type="password"
              fullWidth
              autoComplete="given-name"
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={12}>
          <Button variant="contained" fullWidth sx={{paddingBlock:"13px"}}>Sign Up</Button>
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
             <span onClick={()=>{switchModel(false)}} style={{ color: "#1976d2", cursor: "pointer" }}>Login</span>
            </Typography>
          </Grid>
        </Grid>
        
      </form>
    </div>
  );
}

export default SignupForm;
