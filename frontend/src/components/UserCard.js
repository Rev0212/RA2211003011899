import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { getRandomAvatar } from '../utils/helpers';

const UserCard = ({ user, rank }) => {
  return (
    <Card sx={{ display: 'flex', mb: 2, maxWidth: 600 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
        <Typography variant="h3" sx={{ mx: 2, color: '#888', fontWeight: 'bold' }}>
          #{rank}
        </Typography>
        
        <CardMedia
          component="img"
          sx={{ width: 100, height: 100, borderRadius: '50%' }}
          image={getRandomAvatar()}
          alt={user.name}
        />
        
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {user.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            User ID: {user.userId}
          </Typography>
          <Typography variant="body1" color="primary" fontWeight="bold">
            {user.postCount} Posts
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default UserCard;