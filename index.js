const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { pool } = require('./src/config/db.config');

require('dotenv').config();
require('./src/utils/passport');

const app = express();
const port = process.env.PORT || 3000;

pool.connect().then(() => {
    console.log('connected to the database');
}).catch((err) => {
    console.log(err);
});

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./src/routes/auth.routes');
const goodsRoutes = require('./src/routes/goods.routes');
const producerRoutes = require('./src/routes/producer.routes');
const adminRoutes = require('./src/routes/admin.routes');
app.use('/auth', authRoutes);
app.use('/goods', goodsRoutes);
app.use('/producers', producerRoutes);
app.use('/admin', adminRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});