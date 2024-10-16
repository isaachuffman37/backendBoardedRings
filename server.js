var express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const swaggerUI = require('swagger-ui-express');
const port = process.env.PORT || 8080;

mongodb.connectDb((err, mongodb) => {
  if (err) {
    console.log('The returned DB: ', mongodb);
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to a mongo database and listening on ${port}`);
  }
});
