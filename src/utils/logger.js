const winston = require('winston');
const { pool } = require('../config/db.config');
const Transport = require('winston-transport');

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const customLevels = {
  user: 0,
  admin: 0,
};

const level = () => {
  const env = process.env.NODE_ENV || 'production';
  const isDevelopment = env === 'production';
  return isDevelopment ? 'debug' : 'warn';
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

const customColors = {
  user: 'yellow',
  admin: 'green',
};

winston.addColors(colors);
winston.addColors(customColors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  ),
  winston.format.colorize({ all: true })
);

class PostgresTransport extends Transport {
  constructor(opts) {
    super(opts);
    this.pool = opts.pool;
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);

      info.level = info.level.substring(5);

      if (info.level.includes('http')) {

      } else if (info.level.includes('error')) {

      } else if (info.level.includes('warn')) {

      } else if (info.level.includes('info')) {

      } else if (info.level.includes('debug')) {

      }
    });
    callback();
  }
};

const postgresTransport = new PostgresTransport({ pool });

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({ filename: 'logs/http.log', level: 'http'}),
  new winston.transports.File({ filename: 'logs/debug.log', level: 'debug' }),
  new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  new winston.transports.File({ filename: 'logs/warn.log', level: 'warn' }),
  new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
  new winston.transports.File({ filename: 'logs/all.log' }),
  postgresTransport,
];

const customTransports = [
  new winston.transports.Console(),
  new winston.transports.File({ filename: 'logs/user.log', level: 'user' }),
  new winston.transports.File({ filename: 'logs/admin.log', level: 'admin' }),
];

const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

const customLogger = winston.createLogger({
  level: level(),
  levels: customLevels,
  format,
  transports: customTransports,
});

module.exports = { Logger, customLogger };
