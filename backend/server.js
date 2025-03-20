const express = require('express');
const usersRoutes = require('./routes/users');  
const postsRoutes = require('./routes/post'); 
const errorHandler = require('./errorHandler');

const app = express();
const PORT = process.env.PORT || 4001;

// routes
app.use('/users', usersRoutes);  
app.use('/posts', postsRoutes);

// catch-all for 404s
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

// error handling
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
