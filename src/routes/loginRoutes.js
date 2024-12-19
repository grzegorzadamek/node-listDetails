const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Definicje tras
router.get('/items', loginController.getAllItems);
router.get('/item/:itemId', loginController.getItemById);
router.post('/item/add', loginController.addItem);
router.put('/item', loginController.updateItem);
router.delete('/item/:itemId', loginController.deleteItem);

module.exports = router;
