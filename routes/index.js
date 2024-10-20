const routes = require('express').Router();

routes.use('/', require('./swagger'));
routes.use('/', require('./rings'));
routes.use('/', require('./users'));


module.exports = routes;

