const express = require("express");
const router = express.Router();


const comment_controller = require("../controllers/comments.controller");

router.post("/add", comment_controller.comment_add);
router.get("/get", comment_controller.comments_get);
router.patch("/:id", comment_controller.comment_votes);

module.exports = router;
