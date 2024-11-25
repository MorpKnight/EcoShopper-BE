const express = require('express');
const session = require('express-session');
const passport = require('passport');
const sanitizer = require('perfect-express-sanitizer');
const cors = require('cors');
const { pool } = require('./src/config/db.config');

require('dotenv').config();
require('./src/utils/passport');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(sanitizer.clean({
        xss: true,
        noSql: true,
        sql: true,
      },
      only = ["body", "query"]
    )
);

app.use(passport.initialize());
app.use(passport.session());

const morganMiddleware = require('./src/middlewares/morgan.middlewares');
app.use(morganMiddleware);

pool.connect().then(() => {
    console.log('connected to the database');
}).catch((err) => {
    console.log(err);
});

const authRoutes = require('./src/routes/auth.routes');
const goodsRoutes = require('./src/routes/goods.routes');
const producerRoutes = require('./src/routes/producer.routes');
const adminRoutes = require('./src/routes/admin.routes');
const userRoutes = require('./src/routes/user.routes');
const { keepDBAlive } = require('./src/utils/utils');

app.use('/auth', authRoutes);
app.use('/goods', goodsRoutes);
app.use('/producers', producerRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

setInterval(keepDBAlive, 1000 * 60 * 60);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});