const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { ensureAuthenticated } = require('./middleware/authMiddleware');
const session = require('express-session');
const passport = require('passport');
const attractionsRoute = require('./routes/attractionsRoute');
const tripsRoute = require('./routes/tripsRoute');
const flash = require('connect-flash');
const path = require('path');


const port = process.env.PORT || 8080;
const app = express();

app.use(cors()); 
app.use(express.json());
app.use(session({
  secret: 'someSecretString', 
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.errorMessage = req.flash('error');
  next();
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.ejs');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/attractions', attractionsRoute);
app.use('/trips', tripsRoute);
app.use('/api-docs',
  ensureAuthenticated,
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument))


mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});