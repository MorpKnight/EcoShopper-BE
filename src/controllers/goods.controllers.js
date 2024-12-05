const goodServices = require('../services/goods.services');
const { Logger } = require('../utils/logger');

exports.getGoods = async (req, res) => {
    try {
        const response = await goodServices.getGoods();
        Logger.info("Goods were successfully fetched");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

exports.getGood = async (req, res) => {
    try {
        const response = await goodServices.getGood(req.params);
        Logger.info("Good was successfully fetched");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

exports.getGoodsByCategory = async (req, res) => {
    try {
        const response = await goodServices.getGoodsByCategory(req.params);
        Logger.info("Goods were successfully fetched by category");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

exports.getGoodsByName = async (req, res) => {
    try {
        const response = await goodServices.getGoodsByName(req.params);
        Logger.info("Goods were successfully fetched by name");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

exports.getGoodsBySR = async (req, res) => {
    try {
        const response = await goodServices.getGoodsBySR(req.params);
        Logger.info("Goods were successfully fetched by SR");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

exports.getGoodsByProducer = async (req, res) => {
    try {
        const response = await goodServices.getGoodsByProducer(req.params);
        Logger.info("Goods were successfully fetched by producer");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

exports.goodsAlternative = async (req, res) => {
    try {
        const response = await goodServices.goodsAlternative(req.params);
        Logger.info("Goods alternatives were successfully fetched");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}