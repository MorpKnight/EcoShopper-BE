const { pool } = require("../config/db.config");

exports.getUserProfile = async (userId) => {
    if (!userId) throw new Error('Failed to retrieve user info');

    const userQuery = `
        SELECT * FROM users WHERE id = $1
    `;
    const productsQuery = `
        SELECT p.* FROM products p
        JOIN users_products up ON p.id = up.product_id
        WHERE up.user_id = $1
    `;

    const userResponse = await pool.query(userQuery, [userId]);
    const productsResponse = await pool.query(productsQuery, [userId]);

    if (userResponse.rows.length === 0) throw new Error('User not found');

    return { success: true, message: 'User profile retrieved successfully', user: userResponse.rows[0], products: productsResponse.rows };
}

exports.buyProduct = async (userId, body) => {
    const { productId, quantity } = body;
    if (!userId) throw new Error('Failed to retrieve user info');
    if (!productId) throw new Error('Failed to retrieve product info');
    if (!quantity) throw new Error('Failed to retrieve quantity info');

    const productIds = Array.isArray(productId) ? productId : [productId];
    const quantities = Array.isArray(quantity) ? quantity : [quantity];

    const productsQuery = `
        SELECT * FROM products WHERE id = ANY($1)
    `;
    const productsResponse = await pool.query(productsQuery, [productIds]);

    if (productsResponse.rows.length === 0) throw new Error('Product not found');

    const insertQuery = `
        INSERT INTO users_products (user_id, product_id, quantity) VALUES ($1, $2, $3)
    `;

    for (let i = 0; i < productIds.length; i++) {
        await pool.query(insertQuery, [userId, productIds[i], quantities[i]]);
    }

    const updateSustainabilityRatingQuery = `
        WITH user_products AS (
            SELECT up.quantity, p.product_sustainability_rating
            FROM users_products up
            JOIN products p ON up.product_id = p.id
            WHERE up.user_id = $1
        )
        UPDATE users
        SET sustainability_rating = (
            SELECT SUM(quantity * product_sustainability_rating) / SUM(quantity)
            FROM user_products
        )
        WHERE id = $1
    `;
    await pool.query(updateSustainabilityRatingQuery, [userId]);

    return { success: true, message: 'Product(s) bought successfully' };
}