const morgan = require('morgan');
const logger = require('../utils/logger');

const whitelist = ['/auth/callback', '/auth/google'];

const stream = {
    write: (message) => logger.http(message.trim())
};

const skip = (req) => {
    const env = process.env.NODE_ENV || 'production';
    if (env !== 'production') return true;
    return !whitelist.includes(req.originalUrl);
};

const morganMiddleware = morgan(
    ':method :url :status :res[content-length] - :response-time ms :req[x-forwarded-for]',
    { stream, skip }
);

module.exports = morganMiddleware;