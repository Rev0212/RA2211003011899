// Helper function to get random images
export const getRandomAvatar = () => {
  const id = Math.floor(Math.random() * 10) + 1;
  return `/images/avatars/avatar${id}.jpg`;
};

export const getRandomPostImage = () => {
  const id = Math.floor(Math.random() * 20) + 1;
  return `/images/posts/post${id}.jpg`;
};

// Format date for display
export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};