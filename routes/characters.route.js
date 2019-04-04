const express = require('express');
const router = express.Router();

const characters_controller = require('../controllers/characters.controller');

router.get('/test', characters_controller.test);

module.exports = router;
