const express = require("express");
const router = express.Router();

const authsController = require("../app/controllers/AuthsController");

router.post("/getUserByEmail", authsController.getUserByEmail);
router.post("/login", authsController.login);
router.post("/token", authsController.token);
router.post("/logout", authsController.logout);

module.exports = router;
