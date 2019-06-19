const express = require('express');
const router = express.Router();

const characters_controller = require('../controllers/characters.controller');

router.get('/get', characters_controller.character_get_all);
router.post('/create', characters_controller.character_create);
router.get('/:id', characters_controller.character_details);
router.put('/:id/update', characters_controller.character_update);
router.delete('/:id/delete', characters_controller.character_delete);
router.put('/delete-journal-or-carousel', characters_controller.delete_journal)
module.exports = router;
