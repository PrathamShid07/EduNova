module.exports = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ error: true, message: `Access denied. ${role} role required.`, statusCode: 403, timestamp: new Date().toISOString() });
    }
    next();
};