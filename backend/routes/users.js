const express = require('express');
const router = express.Router();
const { getTopUsers } = require('../services/userService');

router.get('/', async (req, res) => {
    try {
        const topUsers = await getTopUsers();
        res.json(topUsers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch top users' });
    }
});

module.exports = router;
