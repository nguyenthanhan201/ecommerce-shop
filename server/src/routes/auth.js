const express = require("express");
const router = express.Router();

const authsController = require("../app/controllers/AuthsController");

router.post("/login", authsController.login);

module.exports = router;
