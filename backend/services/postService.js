require('dotenv').config(); 
const axios = require('axios');
const NodeCache = require('node-cache');

// API config
const TEST_SERVER_URL = 'http://20.244.56.144/test';
const AUTH_TOKEN = process.env.AUTH_TOKEN;
// cache for 5min to avoid hitting API limits
const cache = new NodeCache({ stdTTL: 300 }); 

async function getTopOrLatestPosts(type) {
    try {
        // check cache first
        const cacheKey = `posts_${type}`;
        const cachedPosts = cache.get(cacheKey);
        if (cachedPosts) return cachedPosts;

        // get all users
        const { data: users } = await axios.get(`${TEST_SERVER_URL}/users`, {
            headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
        });

        let allPosts = [];

        // get posts from each user - this is slow but works
        await Promise.all(
            Object.keys(users.users).map(async (userId) => {
                try {
                    const { data: posts } = await axios.get(`${TEST_SERVER_URL}/users/${userId}/posts`, {
                        headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
                    });
                    allPosts.push(...posts.posts);
                } catch (err) {
                    console.log(`Failed to get posts for user ${userId}`, err.message);
                }
            })
        );

        let result;
        // handle popular posts by counting comments
        if (type === 'popular') {
            let commentCounts = await Promise.all(
                allPosts.map(async (post) => {
                    try {
                        const { data: comments } = await axios.get(`${TEST_SERVER_URL}/posts/${post.id}/comments`, {
                            headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
                        });
                        return { ...post, commentCount: comments.comments.length };
                    } catch (err) {
                        return { ...post, commentCount: 0 };
                    }
                })
            );

            // find posts with most comments
            const maxComments = Math.max(...commentCounts.map(p => p.commentCount));
            result = commentCounts.filter(p => p.commentCount === maxComments);
        } else {
            // just sort by id for latest
            result = allPosts.sort((a, b) => b.id - a.id).slice(0, 5);
        }

        cache.set(cacheKey, result);
        return result;
    } catch (error) {
        console.error('Post fetch error:', error);
        throw { status: 500, message: `Error getting ${type} posts. Try again later.` };
    }
}

module.exports = { getTopOrLatestPosts };
