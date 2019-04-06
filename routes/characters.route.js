const express = require('express');
const router = express.Router();

const characters_controller = require('../controllers/characters.controller');

router.get('/test', characters_controller.test);
router.post('/create', characters_controller.character_create);
router.get('/:id', characters_controller.character_details);
router.put('/:id/update', characters_controller.character_update);
router.delete('/:id/delete', characters_controller.character_delete);
module.exports = router;
