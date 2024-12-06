const passport = require('passport');
const { pool } = require('../config/db.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Logger } = require('../utils/logger');
const fs = require('fs');
const privateKey = fs.readFileSync('private.key');
const publicKey = fs.readFileSync('public.key', 'utf8');

const TOKEN_PASSPHRASE = process.env.TOKEN_PASSPHRASE;

exports.loginGoogle = passport.authenticate('google', {
    scope: ['profile', 'email']
});

exports.callbackGoogle = passport.authenticate('google', {
    failureRedirect: '/'
});

exports.login = async (userInfo) => {
    if (!userInfo) throw new Error('Failed to retrieve user info');

    const checkUserResponse = await pool.query('SELECT * FROM users WHERE google_id = $1 AND login_type = $2', [userInfo.id, 'google']);
    let userRole = 'user';
    const firstName = userInfo.displayName.split(' ')[0];
    if (checkUserResponse.rows.length === 0) {
        const insertUserResponse = await pool.query('INSERT INTO users (google_id, email, display_name, display_picture, login_type, fullname) VALUES ($1, $2, $3, $4, $5)', [userInfo.id, userInfo.emails[0].value, firstName, userInfo.photos[0].value, 'google', userInfo.displayName]);
        if (insertUserResponse.rowCount === 0) throw new Error('Failed to insert user into database');
    } else {
        userRole = checkUserResponse.rows[0].role;
    }

    const token = jwt.sign({ id: userInfo.id, role: userRole }, { key: privateKey, passphrase: TOKEN_PASSPHRASE }, { algorithm: 'RS256', expiresIn: '30d' });
    return { success: true, message: 'User logged in successfully', token };
};

exports.registerEmail = async (body) => {
    const { email, password, displayname, fullname } = body;
    if (!email || !password || !displayname || !fullname) throw new Error('Missing required fields');

    const checkUserResponse = await pool.query('SELECT * FROM users WHERE email = $1 AND login_type = $2', [email, 'email']);
    if (checkUserResponse.rowCount > 0) throw new Error('Email already registered');

    const hashedPassword = await bcrypt.hash(password, 10);
    const insertUserResponse = await pool.query('INSERT INTO users (email, password, display_name, fullname, login_type) VALUES ($1, $2, $3, $4, $5)', [email, hashedPassword, displayname, fullname, 'email']);
    if (insertUserResponse.rowCount === 0) throw new Error('Failed to insert user into database');

    Logger.info(`User registered: ${email}`);
    return { success: true, message: 'User registered successfully' };
}

exports.loginEmail = async (body) => {
    const { email, password } = body;
    if (!email || !password) throw new Error('Missing required fields');

    const checkUserResponse = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (checkUserResponse.rowCount === 0) throw new Error('User not found');

    const user = checkUserResponse.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new Error('Invalid password');

    Logger.info(`User logged in: ${email}`);
    const token = jwt.sign({ id: user.id, role: user.role }, { key: privateKey, passphrase: TOKEN_PASSPHRASE }, { algorithm: 'RS256', expiresIn: '30d' });
    return { success: true, message: 'User logged in successfully', token };
}

exports.loginEmailAdmin = async (body) => {
    const { email, password } = body;
    if (!email || !password) throw new Error('Missing required fields');

    const checkUserResponse = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (checkUserResponse.rowCount === 0) throw new Error('User not found');

    const user = checkUserResponse.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new Error('Invalid password');
    if (user.role !== 'admin') throw new Error('User is not an admin');

    Logger.info(`Admin logged in: ${email}`);
    const token = jwt.sign({ id: user.id, role: user.role }, { key: privateKey, passphrase: TOKEN_PASSPHRASE }, { algorithm: 'RS256', expiresIn: '30d' });
    return { success: true, message: 'Admin logged in successfully', token };
}

exports.logout = async (body) => {
    const { id } = body;
    if (!id) throw new Error('Failed to logout user');

    return { success: true, message: 'User logged out successfully' };
}