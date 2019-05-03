const express = require("express");
const router = express.Router();

const image_controller = require("../controllers/images.controller");

router.post("/upload", image_controller.image_upload);

module.exports = router;
