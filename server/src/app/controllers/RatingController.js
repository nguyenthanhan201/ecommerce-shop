const Rating = require("../models/Rating");

class RatingController {
  getRatingByIdAuth(req, res) {
    const idAuth = req.params.id;
    if (!idAuth) return res.status(400).json({ error: "idAuth is required" });
    Rating.find({ idAuth })
      .then((rating) => {
        Rating.populate(rating, { path: "idProduct" }, function (err, rating) {
          if (err) return res.status(400).json({ error: err });
          res.json(rating);
        });
      })
      .catch((err) => {
        return res.status(400).json({ error: err });
      });
  }
  updateRatingById(req, res) {
    const id = req.params.id;
    const { rating, comment } = req.body;
    if (!id) return res.status(400).json({ error: "id is required" });
    if (!comment) return res.status(400).json({ error: "comment is required" });
    if (!rating) return res.status(400).json({ error: "rating is required" });
    Rating.findByIdAndUpdate(id, { rating, comment }, { new: true })
      .then((rating) => {
        res.json(rating);
      })
      .catch((err) => {
        return res.status(400).json({ error: err });
      });
  }
  getRatingByIdProduct(req, res) {
    const idProduct = req.params.id;
    if (!idProduct)
      return res.status(400).json({ error: "idProduct is required" });
    Rating.find({ idProduct })
      .then((rating) => {
        Rating.populate(rating, { path: "idAuth" }, function (err, rating) {
          Rating.populate(
            rating,
            { path: "idProduct" },
            function (err, rating) {
              if (err) return res.status(400).json({ error: err });
              res.json(rating);
            }
          );
        });
      })
      .catch((err) => {
        return res.status(400).json({ error: err });
      });
  }
}

module.exports = new RatingController();
