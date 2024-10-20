const { pool } = require('../config/db.config');

exports.keepDBAlive = async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        return res;
    } catch (error) {
        return { message: error.message };
    }
}