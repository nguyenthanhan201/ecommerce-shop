const express = require("express");
const router = express.Router();

const orderController = require("../app/controllers/OrderController");
const verifyToken = require("../middleware/auth");
const getRedisCache = require("../middleware/redis");

router.get(
  "/getAllOrder/:key",
  verifyToken,
  getRedisCache,
  orderController.getAllOrder
);
router.get("/show/:id", orderController.getOrdersByIdAuth);
router.post("/create_payment_url", orderController.createPaymentUrl);
router.get("/vnpay_return", orderController.vnpayReturn);
router.post("/add-order", orderController.addOrder);
// router.get("/vnpay_ipn", orderController.vnpayIPN);

module.exports = router;
