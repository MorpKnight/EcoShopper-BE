const morgan = require('morgan');
const logger = require('../utils/logger')

const stream = {
    write: (message) => logger.http(message.trim())
};

const skip = () => {
    const env = process.env.NODE_ENV || 'production';
    return env !== 'production';
};

const morganMiddleware = morgan(
    ':method :url :status :res[content-length] - :response-time ms :req[x-forwarded-for]',
    { stream, skip }
);

module.exports = morganMiddleware;
