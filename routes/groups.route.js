const express = require('express');
const router = express.Router();

const groups_controller = require('../controllers/groups.controller')

router.get('/get_all', groups_controller.groups_get_all);

module.exports = router;
