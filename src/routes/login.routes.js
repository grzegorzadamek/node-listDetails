const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/login.controller.js');

router.post('/items', LoginController.getAllItems);
router.post('/item/add', LoginController.addItem);      // This will now be matched first
router.post('/item/:itemId', LoginController.getItem);  // This will handle other /item/... routes
router.post('/auth', LoginController.auth);
router.put('/item', LoginController.updateItem);
router.delete('/item/:itemId', LoginController.deleteItem);

module.exports = router;
