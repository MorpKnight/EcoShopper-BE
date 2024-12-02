const producerServices = require('../services/producer.services');

exports.getProducer = async (req, res) => {
    try {
        const response = await producerServices.getProducer(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

exports.getProducers = async (req, res) => {
    try {
        const response = await producerServices.getProducers();
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

exports.getProducerGoods = async (req, res) => {
    try {
        const response = await producerServices.getProducerGoods(req.params.producer_id);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

exports.getProducerByName = async (req, res) => {
    try {
        const response = await producerServices.getProducerByName(req.params.name);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

exports.getProducerByLocation = async (req, res) => {
    try {
        const response = await producerServices.getProducerByLocation(req.params.location);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}