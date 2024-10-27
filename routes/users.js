const routes = require('express').Router();
const controller = require('../controllers');
const { buyerValidationRules, buyerPutValidationRules, validate } = require('../validator.js')

routes.post('/buyer', buyerValidationRules(), validate, controller.insertOneBuyer);
routes.put('/buyer/:id',buyerPutValidationRules(), validate, controller.changeOneBuyer);

module.exports = routes;
