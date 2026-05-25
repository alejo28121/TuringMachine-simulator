const express = require('express');
const router = express.Router();

const machinesController = require('../controllers/machines.controller');

router.post('/', machinesController.createMachine);

module.exports = router;