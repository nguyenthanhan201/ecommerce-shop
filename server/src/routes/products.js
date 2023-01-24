const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const productsController = require("../app/controllers/ProductsController");

// verifyToken(router.get("/hide", productsController.hideProducts));
router.get("/hide", verifyToken, productsController.hideProducts);
router.post("/store", productsController.store);
router.put("/:id", productsController.update);
router.put("/hide/:id", productsController.hide);
router.put("/unhide/:id", productsController.unhide);
router.delete("/:id", productsController.destroy);
// verifyToken(router.get("/most-viewed", productsController.views));
router.get("/most-viewed", productsController.views);
router.put("/most-viewed/:id", productsController.updateViews);
router.get("/getAllProduct", productsController.getAllProduct);

module.exports = router;
