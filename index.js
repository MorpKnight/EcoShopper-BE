const express = require('express');
const cors = require('cors');
const sanitizer = require('perfect-express-sanitizer');
require('dotenv').config();

const { pool } = require('./src/config/db.config');
const { keepDBAlive } = require('./src/utils/utils');
const app = express();
pool.connect().then(
    () => console.log('Connected to the database')
).catch(
    (error) => console.error('Error connecting to the database', error)
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(sanitizer.clean({
    xss: true,
    noSql: true,
    sql: true,
    sqlLevel: 5,
    noSqlLevel: 5
}));

setInterval(keepDBAlive, 1000*60*5);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});