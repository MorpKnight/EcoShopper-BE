const userServices = require('../services/user.services');

exports.getUserProfile = async (req, res) => {
    try {
        const response = await userServices.getUserProfile(req.user.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.buyProduct = async (req, res) => {
    try {
        const response = await userServices.buyProduct(req.user.id, req.body);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}