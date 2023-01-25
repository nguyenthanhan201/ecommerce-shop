const express = require("express");
const ratingController = require("../app/controllers/RatingController");
const router = express.Router();

router.get("/getRatingByIdAuth/:id", ratingController.getRatingByIdAuth);
router.get("/getRatingByIdProduct/:id", ratingController.getRatingByIdProduct);
router.put("/updateRatingById/:id", ratingController.updateRatingById);

module.exports = router;
