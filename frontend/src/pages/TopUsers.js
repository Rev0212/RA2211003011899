import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Alert } from '@mui/material';
import UserCard from '../components/UserCard';
import Loading from '../components/Loading';
import apiService from '../services/api';

const TopUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        setLoading(true);
        const data = await apiService.getTopUsers();
        setUsers(data);
      } catch (err) {
        setError('Failed to load top users. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopUsers();
  }, []);

  if (loading) return <Loading />;

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Top 5 Users by Post Count
        </Typography>
        <Typography variant="subtitle1" gutterBottom color="text.secondary">
          These users are the most active content creators on our platform
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {users.map((user, index) => (
          <UserCard key={user.userId} user={user} rank={index + 1} />
        ))}
      </Box>
    </Container>
  );
};

export default TopUsers;