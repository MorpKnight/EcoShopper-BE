const jwt = require('jsonwebtoken');
const { pool } = require('../config/db.config');

exports.verifyToken = async (req, res, next) => {
    console.log(req.headers);
    try {
        const token = req.headers.cookie.split('=')[1];
        if (!token) throw new Error('Token not found');
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const checkUserResponse = await pool.query('SELECT * FROM users WHERE id = $1', [decoded.id]);
        if (checkUserResponse.rows.length === 0) throw new Error('User not found');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
}

exports.isAdmin = async (req, res, next) => {
    try {
        const checkUserResponse = await pool.query('SELECT * FROM users WHERE id = $1', [req.user.id]);
        if (checkUserResponse.rows[0].role !== 'admin') throw new Error('Unauthorized');
        next();
    } catch (error) {
        res.status(403).json({ success: false, message: error.message });
    }
}