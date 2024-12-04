const { pool } = require("../config/db.config");

exports.getGoods = async () => {
    const response = await pool.query('SELECT * FROM products');

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
    if(response.rowCount === 0) throw new Error('There are no products in this category');

    return { success: true, message: 'Products retrieved successfully', goods: response.rows };
}

exports.getGoodsByName = async (body) => {
    const { name } = body;
    if(!name) throw new Error('Failed to retrieve products');

    const response = await pool.query('SELECT * FROM products WHERE product_name ILIKE $1', [`%${name}%`]);
    if(response.rowCount === 0) throw new Error('THere are no products with this name');

    return { success: true, message: 'Products retrieved successfully', goods: response.rows };
}

exports.getGoodsBySR = async (body) => {
    const { sustainability_rating } = body;
    if(!sustainability_rating) throw new Error('Failed to retrieve products');

    const response = await pool.query('SELECT * FROM products WHERE product_sustainability_rating <= $1', [sustainability_rating]);
    if(response.rowCount === 0) throw new Error('There are no products with this sustainability rating');

    return { success: true, message: 'Products retrieved successfully', goods: response.rows };
}

exports.getGoodsByProducer = async (body) => {
    const { producer_id } = body;
    if(!producer_id) throw new Error('Failed to retrieve products');

    const response = await pool.query('SELECT * FROM products WHERE product_producer_id = $1', [producer_id]);
    if(response.rowCount === 0) throw new Error('There are no products from this producer');

    return { success: true, message: 'Products retrieved successfully', goods: response.rows };
}

exports.goodsAlternative = async (body) => {
    const { id } = body;
    if(!id) throw new Error('Failed to retrieve products');

    const response = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if(response.rowCount === 0) throw new Error('There are no alternative products for this product');

    const good = response.rows[0];
    const { name, category, food_subcategory, product_type } = good;
    const altResponse = await pool.query(
        'SELECT * FROM products WHERE product_name ILIKE $1 AND product_category = $2 AND food_subcategory = $3 AND product_type = $4 ORDER BY product_sustainability_rating ASC',
        [`%${name}%`, category, food_subcategory, product_type]
    );

    return { success: true, message: 'Products retrieved successfully', goods: altResponse.rows };
}
