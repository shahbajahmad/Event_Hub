import React from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

export default function FileUploader({ name, control, rules, label, accept }) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <>
          <TextField
            fullWidth
            margin="normal"
            type="file"
            label={label}
            InputLabelProps={{
              shrink: true,
            }}
         
            inputProps={{ accept: accept }}  // Limit file type
            error={!!error}
            helperText={error?.message}
            onChange={(e) => field.onChange(e.target.files)}
          />
        </>
      )}
    />
  );
}
