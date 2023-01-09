const express = require("express");
const router = express.Router();

const orderController = require("../app/controllers/OrderController");
const verifyToken = require("../middleware/auth");

router.get("/getAllOrders", verifyToken, orderController.getAllOrders);
router.get("/show/:id", orderController.show);
router.post("/create_payment_url", orderController.create);
router.get("/vnpay_return", orderController.vnpayReturn);
router.post("/add-order", orderController.addOrder);
// router.get("/vnpay_ipn", orderController.vnpayIPN);

module.exports = router;
