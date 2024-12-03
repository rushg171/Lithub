const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    try {
        const token = req.cookies?.githubIntegrationToken ?? null;

        if (!token) {
            return res.status(400).send('JWT not found in cookies');
        }
        const decoded = jwt.verify(token, process.env.SIGNING_SECRET);

        req.user = decoded;

        next();
    } catch (err) {
        console.error('JWT verification failed:', err.message);
        return res.status(401).send('Invalid or expired JWT');
    }
};

module.exports = authenticateUser;
