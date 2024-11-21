const { pool } = require('../config/db.config');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

exports.keepDBAlive = async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        return res;
    } catch (error) {
        return { message: error.message };
    }
}