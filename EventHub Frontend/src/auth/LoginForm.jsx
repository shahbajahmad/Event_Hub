import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect,useState} from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import CircularProgress from '@mui/material/CircularProgress';
const apiUrl = import.meta.env.VITE_API_BASE_URL; 
function SignupForm({ switchModel }) {

  const [isLoginError, isLoginErrorset] = useState(false)
  const [loginErrorText, loginErrorTextset] = useState("")
  const form = useForm();
 
  const { register, control, handleSubmit, formState } = form;

  const { errors ,isSubmitting,isSubmitSuccessful} = formState;
  
  const onSubmit =async (data) => {
      isLoginErrorset(false)
    try {

     console.log(apiUrl)

      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("token", result.token);
      }else{
      isLoginErrorset(true)
      loginErrorTextset(result?.error)
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

 
  
  return (
    <div >
 {isLoginError&&
 
 <Typography sx={{marginBottom:3 ,textTransform:"capitalize",textAlign:"center",color:"red",}} variant="h6">{loginErrorText}</Typography>
   }  <form onSubmit={handleSubmit(onSubmit)} className="mt-" noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
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
          <Grid item xs={12} sm={12}>
            <TextField
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Minimun 8 characters required",
                },
              validate:async()=>{

              }})}
              error={!!errors.password}
              helperText={errors.password?.message}
              label="Password"
              type="password"
              fullWidth
              autoComplete="given-name"
            ></TextField>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Button
            id="login"
              variant="contained"
              fullWidth
              sx={{ paddingBlock: "13px" }}
              type="submit"
              {...register("login",{disabled:isSubmitting})}
            >
           {  isSubmitting   ? <CircularProgress />: `Login`}</Button>
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
              <span
                onClick={() => {
                  switchModel(true);
                }}
                style={{ color: "#1976d2", cursor: "pointer" }}
              >
                Signup
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
