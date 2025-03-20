import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Social Media Analytics
        </Typography>
        <Box>
          <Button 
            color="inherit" 
            component={Link} 
            to="/"
            sx={{ 
              fontWeight: location.pathname === '/' ? 'bold' : 'normal',
              textDecoration: location.pathname === '/' ? 'underline' : 'none'
            }}
          >
            Top Users
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/trending"
            sx={{ 
              fontWeight: location.pathname === '/trending' ? 'bold' : 'normal',
              textDecoration: location.pathname === '/trending' ? 'underline' : 'none'
            }}
          >
            Trending Posts
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/feed"
            sx={{ 
              fontWeight: location.pathname === '/feed' ? 'bold' : 'normal',
              textDecoration: location.pathname === '/feed' ? 'underline' : 'none'
            }}
          >
            Feed
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;