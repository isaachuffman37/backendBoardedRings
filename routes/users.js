const routes = require('express').Router();
const controller = require('../controllers');

routes.post('/buyer', controller.insertOneBuyer);
routes.delete('/buyer/delete', controller.deleteOneBuyer);
routes.put('/buyer/change', controller.changeOneBuyer);

module.exports = routes;
