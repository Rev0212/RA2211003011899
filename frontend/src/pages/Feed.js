import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Alert, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import PostCard from '../components/PostCard';
import Loading from '../components/Loading';
import apiService from '../services/api';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchLatestPosts = async () => {
    try {
      setRefreshing(true);
      const data = await apiService.getLatestPosts();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load latest posts. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLatestPosts();
    
    // Set up polling for real-time updates
    const intervalId = setInterval(() => {
      fetchLatestPosts();
    }, 60000); // Refresh every minute
    
    return () => clearInterval(intervalId);
  }, []);

  const handleRefresh = () => {
    fetchLatestPosts();
  };

  if (loading) return <Loading />;

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Latest Posts
        </Typography>
        <Typography variant="subtitle1" gutterBottom color="text.secondary">
          Stay up to date with the newest content
        </Typography>
        
        <Button 
          variant="outlined" 
          startIcon={<RefreshIcon />} 
          onClick={handleRefresh}
          disabled={refreshing}
          sx={{ mt: 2, mb: 4 }}
        >
          {refreshing ? 'Refreshing...' : 'Refresh Feed'}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box>
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <Typography variant="body1" textAlign="center">
            No posts available at the moment.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Feed;