const goodServices = require('../services/goods.services');

exports.getGoods = async (req, res) => {
    try {
        const response = await goodServices.getGoods();
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

exports.getGood = async (req, res) => {
    try {
        const response = await goodServices.getGood(req.params);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

exports.getGoodsByCategory = async (req, res) => {
    try {
        const response = await goodServices.getGoodsByCategory(req.params);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

exports.getGoodsByName = async (req, res) => {
    try {
        const response = await goodServices.getGoodsByName(req.params);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

exports.getGoodsBySR = async (req, res) => {
    try {
        const response = await goodServices.getGoodsBySR(req.params);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

exports.getGoodsByProducer = async (req, res) => {
    try {
        const response = await goodServices.getGoodsByProducer(req.params);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

exports.goodsAlternative = async (req, res) => {
    try {
        const response = await goodServices.goodsAlternative(req.params);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}