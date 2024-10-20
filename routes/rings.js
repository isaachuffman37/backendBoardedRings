const routes = require('express').Router();
const controller = require('../controllers');

routes.get('/rings', controller.getAllRings);


module.exports = routes;