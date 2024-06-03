const jwt = require('jsonwebtoken');

async function authenticateToken(req, res, next){
    const tokenHeader = req.headers['authorization']
    const token = tokenHeader && tokenHeader.replace('Bearer ', "")

    if (!token) {
        return res.status(401).json({ message: 'Authentication failed!' })
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = decodedToken
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed!' })
    }
}

module.exports = authenticateToken;