require('dotenv').config(); // Load .env variables
const axios = require('axios');
const NodeCache = require('node-cache');

const TEST_SERVER_URL = 'http://20.244.56.144/test';
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const cache = new NodeCache({ stdTTL: 300 }); 

async function getTopUsers() {
    try {
        const cachedData = cache.get('topUsers');
        if (cachedData) return cachedData;

        const { data: users } = await axios.get(`${TEST_SERVER_URL}/users`, {
            headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
        });

        if (!users || !users.users) throw new Error('Failed to fetch users');

        const userPostCounts = await Promise.all(
            Object.keys(users.users).map(async (userId) => {
                const { data: posts } = await axios.get(`${TEST_SERVER_URL}/users/${userId}/posts`, {
                    headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
                });
                return { userId, name: users.users[userId], postCount: posts.posts.length };
            })
        );

        const topUsers = userPostCounts.sort((a, b) => b.postCount - a.postCount).slice(0, 5);
        cache.set('topUsers', topUsers);

        return topUsers;
    } catch (error) {
        throw { status: 500, message: 'Failed to fetch top users. Please try again later.' };
    }
}

module.exports = { getTopUsers };
