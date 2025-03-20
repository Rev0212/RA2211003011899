module.exports = (err, req, res, next) => {
    // log the error for debugging
    console.error("ERROR:", err.stack);
    
    // send error response back to client
    res.status(err.status || 500).json({
        error: err.message || 'Something broke!',
    });
};
