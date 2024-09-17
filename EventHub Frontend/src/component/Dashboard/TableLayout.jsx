import React from 'react';
import { Box, Typography } from '@mui/material';

export default function TableLayout() {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2} borderBottom="2px solid #e0e0e0" fontWeight="bold">
      <Box display="flex" alignItems="center" width="20%"> {/* Set consistent width */}
        <Typography variant="body1" fontWeight="bold">Event Name</Typography>
      </Box>
      <Box display="flex" alignItems="center" width="20%"> {/* Set consistent width */}
        <Typography pl={5} variant="body1" fontWeight="bold">Organizer Name</Typography>
      </Box>
      <Box display="flex" alignItems="center" width="10%"> {/* Adjust width as needed */}
        <Typography variant="body1" fontWeight="bold">Date</Typography>
      </Box>
      <Box display="flex" alignItems="center" width="12%"> {/* Adjust width as needed */}
        <Typography variant="body1" fontWeight="bold">Price</Typography>
      </Box>
      <Box display="flex" alignItems="center" width="10%"> {/* Adjust width as needed */}
        <Typography variant="body1" fontWeight="bold">Status</Typography>
      </Box>
      <Box display="flex" justifyContent={"center"} alignItems="center" width="15%"> {/* Adjust width as needed */}
        <Typography variant="body1" fontWeight="bold">Action</Typography>
      </Box>
    </Box>
  );
}
