const routes = require('express').Router();
const controller = require('../controllers');
const { ringDeleteValidationRules, validate } = require('../validator.js')

routes.get('/rings', controller.getAllRings);
routes.delete('/rings/:id', ringDeleteValidationRules(), validate, controller.deleteOneRing);

module.exports = routes;
