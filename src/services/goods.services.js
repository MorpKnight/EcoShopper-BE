const { pool } = require("../config/db.config");

exports.getGoods = async () => {
    const response = await pool.query('SELECT * FROM products');
    if(response.rowCount === 0) throw new Error('Failed to retrieve products');

    return { success: true, message: 'Products retrieved successfully', goods: response.rows };
}

exports.getGood = async (body) => {
    const { id } = body;
    if(!id) throw new Error('Failed to retrieve products');

    const response = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if(response.rowCount === 0) throw new Error('Failed to retrieve products');

    return { success: true, message: 'Product retrieved successfully', good: response.rows[0] };
}

exports.getGoodsByCategory = async (body) => {
    const { category } = body;
    if(!category) throw new Error('Failed to retrieve products');

    const response = await pool.query('SELECT * FROM products WHERE product_category = $1', [category]);
    if(response.rowCount === 0) throw new Error('Failed to retrieve products');

    return { success: true, message: 'Products retrieved successfully', goods: response.rows };
}

exports.getGoodsByName = async (body) => {
    const { name } = body;
    if(!name) throw new Error('Failed to retrieve products');

    const response = await pool.query('SELECT * FROM products WHERE product_name ILIKE $1', [`%${name}%`]);
    if(response.rowCount === 0) throw new Error('Failed to retrieve products');

    return { success: true, message: 'Products retrieved successfully', goods: response.rows };
}

exports.getGoodsBySR = async (body) => {
    const { sustainability_rating } = body;
    if(!sustainability_rating) throw new Error('Failed to retrieve products');

    const response = await pool.query('SELECT * FROM products WHERE product_sustainability_rating <= $1', [sustainability_rating]);
    if(response.rowCount === 0) throw new Error('Failed to retrieve products');

    return { success: true, message: 'Products retrieved successfully', goods: response.rows };
}

exports.getGoodsByProducer = async (body) => {
    const { producer_id } = body;
    if(!producer_id) throw new Error('Failed to retrieve products');

    const response = await pool.query('SELECT * FROM products WHERE product_producer_id = $1', [producer_id]);
    if(response.rowCount === 0) throw new Error('Failed to retrieve products');

    return { success: true, message: 'Products retrieved successfully', goods: response.rows };
}

exports.goodsAlternative = async (body) => {
    const { id } = body;
    if(!id) throw new Error('Failed to retrieve products');

    const response = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if(response.rowCount === 0) throw new Error('Failed to retrieve products');

    const good = response.rows[0];
    const { name, category, sustainability_rating } = good;
    const altResponse = await pool.query('SELECT * FROM products WHERE product_name = $1 AND product_category = $2 AND product_sustainability_rating > $3', [name, category, sustainability_rating]);

    return { success: true, message: 'Products retrieved successfully', goods: altResponse.rows };
}
