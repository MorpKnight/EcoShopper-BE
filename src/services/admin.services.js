const { pool } = require("../config/db.config");

exports.addProduct = async (body) => {
    const { name, description, category, price, image, sustainability_rating, producer_id } = body;
    if(!name || !description || !category || !price || !image || !sustainability_rating || !producer_id) throw new Error('Failed to add product');

    const response = await pool.query(`INSERT INTO products (product_name, product_description, product_category, product_price, product_image, product_sustainability_rating, product_producer_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [name, description, category, price, image, sustainability_rating, producer_id]);
    if(response.rowCount === 0) throw new Error('Failed to add product');

    return { success: true, message: 'Product added successfully', product: response.rows[0] };
}

exports.addProducer = async (body) => {
    const { name, location, description, image } = body;
    if(!name || !location || !description || !image) throw new Error('Failed to add producer');

    const response = await pool.query(`INSERT INTO producers (producer_name, producer_location, producer_description, producer_image) VALUES ($1, $2, $3, $4) RETURNING *`, [name, location, description, image]);
    if(response.rowCount === 0) throw new Error('Failed to add producer');

    return { success: true, message: 'Producer added successfully', producer: response.rows[0] };
}

exports.editProduct = async (body) => {
    const { id, name, description, category, price, image, sustainability_rating, producer_id } = body;
    if(!id || !name || !description || !category || !price || !image || !sustainability_rating || !producer_id) throw new Error('Failed to edit product');

    const response = await pool.query(`UPDATE products SET product_name = $1, product_description = $2, product_category = $3, product_price = $4, product_image = $5, product_sustainability_rating = $6, product_producer_id = $7 WHERE product_id = $8 RETURNING *`, [name, description, category, price, image, sustainability_rating, producer_id, id]);
    if(response.rowCount === 0) throw new Error('Failed to edit product');

    return { success: true, message: 'Product edited successfully', product: response.rows[0] };
}

exports.editProducer = async (body) => {
    const { id, name, location, description, image } = body;
    if(!id || !name || !location || !description || !image) throw new Error('Failed to edit producer');

    const response = await pool.query(`UPDATE producers SET producer_name = $1, producer_location = $2, producer_description = $3, producer_image = $4 WHERE producer_id = $5 RETURNING *`, [name, location, description, image, id]);
    if(response.rowCount === 0) throw new Error('Failed to edit producer');

    return { success: true, message: 'Producer edited successfully', producer: response.rows[0] };
}

exports.deleteProduct = async (body) => {
    const { id } = body;
    if(!id) throw new Error('Failed to delete product');

    const response = await pool.query(`DELETE FROM products WHERE id = $1 RETURNING *`, [id]);
    if(response.rowCount === 0) throw new Error('Failed to delete product');

    return { success: true, message: 'Product deleted successfully', product: response.rows[0] };
}

exports.deleteProducer = async (body) => {
    const { id } = body;
    if(!id) throw new Error('Failed to delete producer');

    const response = await pool.query(`DELETE FROM producers WHERE id = $1 RETURNING *`, [id]);
    if(response.rowCount === 0) throw new Error('Failed to delete producer');

    return { success: true, message: 'Producer deleted successfully', producer: response.rows[0] };
}