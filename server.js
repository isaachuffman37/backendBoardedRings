var express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const swaggerUI = require('swagger-ui-express');
const routes = require('./routes/index');
const swaggerFile = require('./swagger-output.json');
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

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', routes)
  .use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerFile));
