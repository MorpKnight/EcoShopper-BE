const producerServices = require('../services/producer.services');

exports.getProducer = async (req, res) => {
    try {
        const response = await producerServices.getProducer(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

exports.getProducers = async (req, res) => {
    try {
        const response = await producerServices.getProducers();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

exports.getProducerGoods = async (req, res) => {
    try {
        const response = await producerServices.getProducerGoods(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

exports.getProducerByName = async (req, res) => {
    try {
        const response = await producerServices.getProducerByName(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

exports.getProducerByLocation = async (req, res) => {
    try {
        const response = await producerServices.getProducerByLocation(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}