const express = require("express");
const router = express.Router();

const productsController = require("../app/controllers/ProductsController");

router.get("/hide", productsController.hideProducts);
router.post("/store", productsController.store);
router.put("/:id", productsController.update);
router.put("/hide/:id", productsController.hide);
router.put("/unhide/:id", productsController.unhide);
router.delete("/:id", productsController.destroy);
router.get("/most-viewed", productsController.views);
router.put("/most-viewed/:id", productsController.updateViews);
router.get("/", productsController.index);

module.exports = router;
