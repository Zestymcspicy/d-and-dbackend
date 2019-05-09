const express = require("express");
const router = express.Router();

const sign_s3_controller = require("../controllers/sign-s3.controller");

router.get("/", sign_s3_controller.get_signature);

module.exports = router;
