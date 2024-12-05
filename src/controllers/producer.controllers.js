const producerServices = require('../services/producer.services');
const { Logger } = require('../utils/logger');

exports.getProducer = async (req, res) => {
    try {
        const response = await producerServices.getProducer(req.params.id);
        Logger.info("Producer was successfully fetched");
        res.status(200).json(response);
    } catch (error) {
        Logger.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.getProducers = async (req, res) => {
    try {
        const response = await producerServices.getProducers();
        Logger.info("Producers were successfully fetched");
        res.status(200).json(response);
    } catch (error) {
        Logger.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.getProducerGoods = async (req, res) => {
    try {
        const response = await producerServices.getProducerGoods(req.params.producer_id);
        Logger.info("Producer goods were successfully fetched");
        res.status(200).json(response);
    } catch (error) {
        Logger.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.getProducerByName = async (req, res) => {
    try {
        const response = await producerServices.getProducerByName(req.params.name);
        Logger.info("Producer was successfully fetched by name");
        res.status(200).json(response);
    } catch (error) {
        Logger.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.getProducerByLocation = async (req, res) => {
    try {
        const response = await producerServices.getProducerByLocation(req.params.location);
        Logger.info("Producer was successfully fetched by location");
        res.status(200).json(response);
    } catch (error) {
        Logger.error(error.message);
        res.status(500).json({ error: error.message });
    }
}