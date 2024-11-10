var express = require('express');
const app = express();
const path = require('path');
const passport = require('passport')
const morgan = require('morgan')
const session = require('express-session');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const swaggerUI = require('swagger-ui-express');
const routes = require('./routes/index');
const authRoutes = require('./routes/auth')
const swaggerFile = require('./swagger-output.json');
const createError = require('http-errors')
const { engine } = require('express-handlebars');
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

// Passport Config
require('./config/passport')(passport)


//logging

if(process.env.HOST == 'localhost:8080'){
  app.use(morgan('dev'));
}


//Handlebars 
app.engine('.hbs', engine({ defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs')

//Sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))


//Passport Middlware

app.use(passport.initialize());
app.use(passport.session())

//static

app.use (express.static(path.join(__dirname, 'public')))

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', routes)
  .use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerFile))
  .use((reg, res, next)=> {
    next(createError(404, 'Not Found'))
  })
  .use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      error:{
        status: err.status || 500,
        message: err.message
      }
    })
  });
