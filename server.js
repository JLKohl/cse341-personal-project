require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
require('./middleware/passport');
const authRoute = require('./routes/auth');
const flash = require('connect-flash');

const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const homeRoute = require('./routes/home');
const attractionsRoute = require('./routes/attractionsRoute');
const tripsRoute = require('./routes/tripsRoute');
const { ensureAuthenticated } = require('./middleware/authMiddleware');

const port = process.env.PORT || 8080;
const app = express();
app.set('trust proxy', 1);

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // optional if you use form submissions

// Sessions & Passport
app.use(session({
  secret: 'someSecretString',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Flash messages
app.use(flash());
app.use((req, res, next) => {
  res.locals.errorMessage = req.flash('error');
  next();
});

// --- View engine & static files ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// --- Routes ---
app.use('/', homeRoute);
app.use('/auth', authRoute);
app.use('/attractions', attractionsRoute);
app.use('/trips', tripsRoute);


// Swagger docs protected by authentication
app.use('/api-docs',
  ensureAuthenticated,
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

// --- Start server after DB is connected ---
mongodb.initDb((err, client) => {
  if (err) {
    console.error('Failed to connect to database', err);
    process.exit(1);
  } else {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  }
});
