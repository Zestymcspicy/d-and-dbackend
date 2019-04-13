const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const comment_controller = require("../controllers/comments.controller");

router.post("/add", comment_controller.comment_add);

module.exports = router;
