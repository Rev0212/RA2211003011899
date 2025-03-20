import React from 'react';
import { 
  Card, CardHeader, CardContent, CardMedia, Typography, 
  Avatar, IconButton, Box, Chip
} from '@mui/material';
import { Comment as CommentIcon, Favorite as FavoriteIcon } from '@mui/icons-material';
import { getRandomAvatar, getRandomPostImage, formatDate } from '../utils/helpers';

const PostCard = ({ post, trending = false }) => {
  return (
    <Card sx={{ maxWidth: 600, mb: 3, mx: 'auto' }}>
      <CardHeader
        avatar={<Avatar src={getRandomAvatar()} />}
        title={`User ${post.userId}`}
        subheader={formatDate(post.timestamp || Date.now())}
        action={
          trending && (
            <Chip 
              color="primary" 
              label="Trending" 
              icon={<FavoriteIcon />} 
              sx={{ fontWeight: 'bold' }} 
            />
          )
        }
      />
      
      <CardMedia
        component="img"
        height="300"
        image={getRandomPostImage()}
        alt="Post image"
      />
      
      <CardContent>
        <Typography variant="body1" gutterBottom>
          {post.content || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon color="error" />
          </IconButton>
          <Typography variant="body2">
            {post.likes || Math.floor(Math.random() * 100)}
          </Typography>
          
          <IconButton aria-label="comments" sx={{ ml: 2 }}>
            <CommentIcon color="primary" />
          </IconButton>
          <Typography variant="body2" fontWeight={trending ? 'bold' : 'normal'}>
            {post.commentCount || 0} comments
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;