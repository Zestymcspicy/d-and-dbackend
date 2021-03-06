const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/user.controller");

router.post("/create", user_controller.user_create);
router.post("/login", user_controller.user_sign_in);
router.post("/refresh", user_controller.user_refresh);
router.post("/:id/image", user_controller.change_icon);
router.get("/user_icon_object", user_controller.user_icon_object)
module.exports = router;
