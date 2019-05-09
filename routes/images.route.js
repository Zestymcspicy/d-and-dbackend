const express = require('express');
const router = express.Router();

const image_controller = require('../controllers/images.controller');

router.post('/upload', image_controller.image_upload);
router.get(':id', image_controller.image_get);
router.get('/', image_controller.image_get_all);

module.exports = router;
