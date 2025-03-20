import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Alert } from '@mui/material';
import PostCard from '../components/PostCard';
import Loading from '../components/Loading';
import apiService from '../services/api';

const TrendingPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        setLoading(true);
        const data = await apiService.getTrendingPosts();
        setPosts(data);
      } catch (err) {
        setError('Failed to load trending posts. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingPosts();
  }, []);

  if (loading) return <Loading />;

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Trending Posts
        </Typography>
        <Typography variant="subtitle1" gutterBottom color="text.secondary">
          Posts with the most comments on our platform
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mt: 4 }}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.id} post={post} trending={true} />
          ))
        ) : (
          <Typography variant="body1" textAlign="center">
            No trending posts available at the moment.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default TrendingPosts;