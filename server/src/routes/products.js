const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const productsController = require("../app/controllers/ProductsController");
const getRedisCache = require("../middleware/redis");

router.get("/hide", verifyToken, productsController.hideProducts);
router.post("/store", productsController.store);
router.put("/:id", productsController.updateProductByIdProduct);
router.put("/hide/:id", productsController.hideProductByIdProduct);
router.put("/unhide/:id", productsController.unhideProductByIdProduct);
router.delete("/:id", productsController.destroy);
router.get("/most-viewed", productsController.views);
router.put("/most-viewed/:id", productsController.updateViews);
router.get(
  "/getAllProducts/:key",
  getRedisCache,
  productsController.getAllProduct
);

module.exports = router;
