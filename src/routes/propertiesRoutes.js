const express = require('express');
const router = express.Router();
const propertiesController = require('../controllers/propertiesController');

// Define the routes
router.get('/', propertiesController.getAllProperties);
router.post('/search', propertiesController.searchForProperties);
router.post('/', propertiesController.create);
router.put('/:id', propertiesController.update);
router.delete('/:id', propertiesController.delete);

module.exports = router;
