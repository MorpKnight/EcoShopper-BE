const passport = require('passport');
const { pool } = require('../config/db.config');
const jwt = require('jsonwebtoken');

exports.loginGoogle = passport.authenticate('google', {
    scope: ['profile', 'email']
});

exports.callbackGoogle = passport.authenticate('google', {
    failureRedirect: '/'
});

exports.login = async (userInfo) => {
    if(!userInfo) throw new Error('Failed to retrieve user info');
    
    const checkUserResponse = await pool.query('SELECT * FROM users WHERE id = $1', [userInfo.id]);
    let userRole = 'user';
    if(checkUserResponse.rows.length === 0) {
        const insertUserResponse = await pool.query('INSERT INTO users (id, email, display_name, display_picture) VALUES ($1, $2, $3, $4)', [userInfo.id, userInfo.emails[0].value, userInfo.displayName, userInfo.photos[0].value]);
        if(insertUserResponse.rowCount === 0) throw new Error('Failed to insert user into database');
    } else {
        userRole = checkUserResponse.rows[0].role;
    }

    const token = jwt.sign({ id: userInfo.id, role: userRole }, process.env.JWT_SECRET, { expiresIn: '30d' });
    return { success : true, message : 'User logged in successfully', token };
};