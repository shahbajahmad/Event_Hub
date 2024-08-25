import { GroupAdd } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";

function SignupForm({switchModel}) {
  const handleSubmit = () => {};
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
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
          <Button variant="contained" fullWidth sx={{paddingBlock:"13px"}}>Login</Button>
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
              Create a new account{" "}
             <span onClick={()=>{switchModel(true)}} style={{ color: "#1976d2", cursor: "pointer" }}>Signup</span>
            </Typography>
          </Grid>
        </Grid>
        
      </form>
    </div>
  );
}

export default SignupForm;
