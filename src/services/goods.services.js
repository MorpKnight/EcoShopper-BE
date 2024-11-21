const { pool } = require("../config/db.config");

exports.getGoods = async () => {
    const response = await pool.query('SELECT * FROM goods');
    if(response.rowCount === 0) throw new Error('Failed to retrieve goods');

    return { success: true, message: 'Goods retrieved successfully', goods: response.rows };
}

exports.getGood = async (body) => {
    const { id } = body;
    if(!id) throw new Error('Failed to retrieve good');

    const response = await pool.query('SELECT * FROM goods WHERE id = $1', [id]);
    if(response.rowCount === 0) throw new Error('Failed to retrieve good');

    return { success: true, message: 'Good retrieved successfully', good: response.rows[0] };
}

exports.getGoodsByCategory = async (body) => {
    const { category } = body;
    if(!category) throw new Error('Failed to retrieve goods');

    const response = await pool.query('SELECT * FROM goods WHERE category = $1', [category]);
    if(response.rowCount === 0) throw new Error('Failed to retrieve goods');

    return { success: true, message: 'Goods retrieved successfully', goods: response.rows };
}

exports.getGoodsByName = async (body) => {
    const { name } = body;
    if(!name) throw new Error('Failed to retrieve goods');

    const response = await pool.query('SELECT * FROM goods WHERE name ILIKE $1', [`%${name}%`]);
    if(response.rowCount === 0) throw new Error('Failed to retrieve goods');

    return { success: true, message: 'Goods retrieved successfully', goods: response.rows };
}

exports.getGoodsBySR = async (body) => {
    const { sustainability_rating } = body;
    if(!sustainability_rating) throw new Error('Failed to retrieve goods');

    const response = await pool.query('SELECT * FROM goods WHERE sustainability_rating <= $1', [sustainability_rating]);
    if(response.rowCount === 0) throw new Error('Failed to retrieve goods');

    return { success: true, message: 'Goods retrieved successfully', goods: response.rows };
}

exports.goodsAlternative = async (body) => {
    const { id } = body;
    if(!id) throw new Error('Failed to retrieve goods');

    const response = await pool.query('SELECT * FROM goods WHERE id = $1', [id]);
    if(response.rowCount === 0) throw new Error('Failed to retrieve goods');

    const good = response.rows[0];
    const { name, category, sustainability_rating } = good;
    const altResponse = await pool.query('SELECT * FROM goods WHERE name = $1 AND category = $2 AND sustainability_rating > $3', [name, category, sustainability_rating]);

    return { success: true, message: 'Goods retrieved successfully', goods: altResponse.rows };
}