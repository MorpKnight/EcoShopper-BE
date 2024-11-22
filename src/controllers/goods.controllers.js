const goodServices = require('../services/goods.services');

exports.getGoods = async (req, res) => {
    try {
        const response = await goodServices.getGoods();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

exports.getGood = async (req, res) => {
    try {
        const response = await goodServices.getGood(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

exports.getGoodsByCategory = async (req, res) => {
    try {
        const response = await goodServices.getGoodsByCategory(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

exports.getGoodsByName = async (req, res) => {
    try {
        const response = await goodServices.getGoodsByName(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

exports.getGoodsBySR = async (req, res) => {
    try {
        const response = await goodServices.getGoodsBySR(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

exports.goodsAlternative = async (req, res) => {
    try {
        const response = await goodServices.goodsAlternative(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}