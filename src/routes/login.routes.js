const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/login.controller.js');

router.get('/items', LoginController.getAllItems);
router.get('/item/:itemId', LoginController.getItem);
router.post('/auth', LoginController.auth);
router.post('/item/add', LoginController.addItem);
router.put('/item', LoginController.updateItem);
router.delete('/item/:itemId', LoginController.deleteItem);

module.exports = router;
