import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" minHeight="50vh">
      <CircularProgress />
      <Typography variant="h6" sx={{ mt: 2 }}>Loading data...</Typography>
    </Box>
  );
};

export default Loading;