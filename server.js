const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const attractionsRoute = require('./routes/attractionsRoute');
const tripsRoute = require('./routes/tripsRoute');


const port = process.env.PORT || 8080;
const app = express();

app.use(cors()); 
app.use(express.json());


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


app.use('/attractions', attractionsRoute);
app.use('/trips', tripsRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});