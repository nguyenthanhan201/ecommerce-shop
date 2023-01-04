const Product = require("../models/Product");

class ProductsController {
  index(req, res) {
    Product.find({ deletedAt: null }).then((products) => res.json(products));
  }

  hideProducts(req, res) {
    // get products that have deletedAt
    Product.find({ deletedAt: { $ne: null } }).then((products) =>
      res.json(products)
    );
  }

  store(req, res) {
    const formData = req.body;
    const product = new Product(formData);
    product
      .save()
      .then(() => {
        return res.json(product); // return để trả về kết quả cho client
      })
      .catch((err) => {
        return res.status(400).json({ error: err });
      });
  }

  update(req, res) {
    delete req.body._id, // delete req.body._id để tránh lỗi khi update
      console.log(req.body, req.params.id);
    Product.updateOne(
      {
        _id: req.params.id,
      },

      req.body
    )
      .then(() =>
        res.json({
          message: "Update thành công",
        })
      )
      .catch((err) => {
        return res.status(400).json({ error: err });
      });
  }

  hide(req, res) {
    Product.updateOne(
      {
        _id: req.params.id,
      },
      {
        deletedAt: Date.now(),
      }
    )
      .then(() =>
        res.json({
          message: "Ẩn thành công",
        })
      )
      .catch((err) => {
        return res.status(400).json({ error: err });
      });
  }

  unhide(req, res) {
    Product.updateOne(
      {
        _id: req.params.id,
      },
      {
        deletedAt: null,
      }
    )
      .then(() =>
        res.json({
          message: "Khôi phục thành công",
        })
      )
      .catch((err) => {
        return res.status(400).json({ error: err });
      });
  }

  destroy(req, res) {
    Product.deleteOne({ _id: req.params.id })
      .then(() => {
        res.json({
          message: "Xóa thành công",
        });
      })
      .catch((err) => {
        return res.status(400).json({ error: err });
      });
  }

  views(req, res) {
    // get top 10 products that have most views
    Product.find({ deletedAt: null })
      .sort({ views: -1 })
      .limit(5)
      .then((products) => res.json(products))
      .catch((err) => {
        return res.status(400).json({ error: err });
      });
  }

  updateViews(req, res) {
    Product.updateOne(
      {
        _id: req.params.id,
      },
      {
        $inc: { views: 1 },
      }
    )
      .then(() => {
        res.json({
          message: "Update views thành công",
        });
      })
      .catch((err) => {
        return res.status(400).json({ error: err });
      });
  }
}

module.exports = new ProductsController();
