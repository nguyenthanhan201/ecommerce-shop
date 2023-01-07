const express = require("express");
const router = express.Router();

const orderController = require("../app/controllers/OrderController");

router.get("/show/:id", orderController.show);
router.post("/create_payment_url", orderController.create);
router.get("/vnpay_return", orderController.vnpayReturn);
router.post("/add-order", orderController.addOrder);
router.get("/", orderController.index);
// router.get("/vnpay_ipn", orderController.vnpayIPN);

module.exports = router;
