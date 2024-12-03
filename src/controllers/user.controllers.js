const userServices = require('../services/user.services');
const { customLogger, Logger } = require('../utils/logger');

exports.getUserProfile = async (req, res) => {
    try {
        const response = await userServices.getUserProfile(req.user.id);
        customLogger.user(`User ${req.user.id} fetched their profile`);
        res.status(200).json(response);
    } catch (error) {
        Logger.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.buyProduct = async (req, res) => {
    try {
        const response = await userServices.buyProduct(req.user.id, req.body);
        if (Array.isArray(req.body.productId)) {
            req.body.productId.forEach(product => {
                customLogger.user(`User ${req.user.id} bought the product: ${product}`);
            });
        }

        res.status(200).json(response);
    } catch (error) {
        Logger.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}