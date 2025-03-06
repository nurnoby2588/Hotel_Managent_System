const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyControllers');
const validateProperty = require('../middleware/validdateProperty');

router.post('/', validateProperty, propertyController.createProperty);
router.get('/', propertyController.getAllProperties);
router.get('/:id', propertyController.getProperty);
router.put('/:id', validateProperty, propertyController.updateProperty);
router.delete('/:id', propertyController.deleteProperty);

module.exports = router;
