const express = require('express');
const router = express.Router();
const { getTopOrLatestPosts } = require('../services/postService');

router.get('/', async (req, res) => {
    const { type } = req.query;

    // validate query param
    if (!type || (type !== 'popular' && type !== 'latest')) {
        return res.status(400).json({ error: "Bad request - type should be 'popular' or 'latest'" });
    }

    try {
        const posts = await getTopOrLatestPosts(type);
        res.json(posts);
    } catch (error) {
        console.error('Error in post route:', error);
        res.status(error.status || 500).json({ error: error.message || 'Failed to fetch posts' });
    }
});

module.exports = router;
