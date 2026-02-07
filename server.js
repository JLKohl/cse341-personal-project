const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');
const professionalRoutes = require('./routes/professional');
const contactsRoutes = require('./routes/contactsRoute');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


const port = process.env.PORT || 8080;
const app = express();

app.use(cors()); 
app.use(express.json());
app.use(express.static(__dirname + '/frontend'));


app.use('/professional', professionalRoutes);
app.use('/contacts', contactsRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});