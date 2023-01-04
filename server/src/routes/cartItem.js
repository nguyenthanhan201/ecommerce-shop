const express = require("express");
const router = express.Router();

const cartItemController = require("../app/controllers/CartItemController");

router.get("/:id", cartItemController.show);
router.post("/create", cartItemController.create);
router.post("/delete", cartItemController.delete);
router.post("/clear-cart", cartItemController.clearCart);

module.exports = router;
