const { pool } = require("../config/db.config");

exports.getProducer = async (body) => {
    const { id } = body;
    if(!id) throw new Error('Failed to retrieve producer');

    const response = await pool.query('SELECT * FROM producers WHERE id = $1', [id]);
    if(response.rowCount === 0) throw new Error('Failed to retrieve producer');

    return { success: true, message: 'Producer retrieved successfully', producer: response.rows[0] };
}

exports.getProducers = async () => {
    const response = await pool.query('SELECT * FROM producers');
    if(response.rowCount === 0) throw new Error('Failed to retrieve producers');

    return { success: true, message: 'Producers retrieved successfully', producers: response.rows };
}

exports.getProducerGoods = async (body) => {
    const { producer_id } = body;
    if(!producer_id) throw new Error('Failed to retrieve products');

    const response = await pool.query('SELECT * FROM products WHERE product_producer_id = $1', [producer_id]);
    if(response.rowCount === 0) throw new Error('Failed to retrieve products');

    return { success: true, message: 'Products retrieved successfully', goods: response.rows };
}

exports.getProducerByName = async (body) => {
    const { name } = body;
    if(!name) throw new Error('Failed to retrieve producers');

    const response = await pool.query('SELECT * FROM producers WHERE producer_name ILIKE $1', [`%${name}%`]);
    if(response.rowCount === 0) throw new Error('Failed to retrieve producers');

    return { success: true, message: 'Producers retrieved successfully', producers: response.rows };
}

exports.getProducerByLocation = async (body) => {
    const { location } = body;
    if(!location) throw new Error('Failed to retrieve producers');

    const response = await pool.query('SELECT * FROM producers WHERE producer_location ILIKE $1', [`%${location}%`]);
    if(response.rowCount === 0) throw new Error('Failed to retrieve producers');

    return { success: true, message: 'Producers retrieved successfully', producers: response.rows };
}
