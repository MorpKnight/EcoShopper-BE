const adminServices = require('../services/admin.services');

exports.addProduct = async (req, res) => {
    try {
        const response = await adminServices.addProduct(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

exports.addProducer = async (req, res) => {
    try {
        const response = await adminServices.addProducer(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

exports.editProduct = async (req, res) => {
    try {
        const response = await adminServices.editProduct(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

exports.editProducer = async (req, res) => {
    try {
        const response = await adminServices.editProducer(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const response = await adminServices.deleteProduct(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

exports.deleteProducer = async (req, res) => {
    try {
        const response = await adminServices.deleteProducer(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}