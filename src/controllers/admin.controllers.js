const adminServices = require('../services/admin.services');
const { Logger, customLogger } = require('../utils/logger');

exports.addProduct = async (req, res) => {
    try {
        const response = await adminServices.addProduct(req.body);
        customLogger.admin(`Admin ${req.user.id} added a new product: ${req.body.name}`);
        res.status(200).json(response);
    } catch (error) {
        Logger.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.addProducer = async (req, res) => {
    try {
        const response = await adminServices.addProducer(req.body);
        customLogger.admin(`Admin ${req.user.id} added a new producer: ${req.body.name}`);
        res.status(200).json(response);
    } catch (error) {
        Logger.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.editProduct = async (req, res) => {
    try {
        const response = await adminServices.editProduct(req.body);
        customLogger.admin(`Admin ${req.user.id} edited the product: ${req.body.id}`);
        res.status(200).json(response);
    } catch (error) {
        Logger.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.editProducer = async (req, res) => {
    try {
        const response = await adminServices.editProducer(req.body);
        customLogger.admin(`Admin ${req.user.id} edited the producer: ${req.body.id}`);
        res.status(200).json(response);
    } catch (error) {
        Logger.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const response = await adminServices.deleteProduct(req.body);
        customLogger.admin(`Admin ${req.user.id} deleted the product: ${req.body.id}`);
        res.status(200).json(response);
    } catch (error) {
        Logger.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.deleteProducer = async (req, res) => {
    try {
        const response = await adminServices.deleteProducer(req.body);
        customLogger.admin(`Admin ${req.user.id} deleted the producer: ${req.body.id}`);
        res.status(200).json(response);
    } catch (error) {
        Logger.error(error.message);
        res.status(500).json({ error: error.message });
    }
}