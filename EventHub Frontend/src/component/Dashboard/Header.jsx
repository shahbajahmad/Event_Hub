// components/Header.js
import React from 'react';
import { Box, Typography, Breadcrumbs, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="textPrimary">My Dashboard</Typography>
        <Typography color="textPrimary">Downloads</Typography>
      </Breadcrumbs>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <SearchIcon />
        <InputBase placeholder="Search" style={{ marginLeft: 8 }} />
      </Box>
    </Box>
  );
};

export default Header;
