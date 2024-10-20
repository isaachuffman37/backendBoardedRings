const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
router.use('/api-doc', swaggerUi.serve);
router.get('/api-doc', swaggerUi.setup(swaggerDocument));

module.exports = router;
