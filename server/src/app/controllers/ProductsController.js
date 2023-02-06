const RedisController = require("../../app/controllers/RedisController");
const Product = require("../models/Product");
const { Worker, isMainThread } = require("node:worker_threads");

// the main thread creates a worker thread and sends it a message. The worker thread then receives the message, logs it, and sends a message back to the main thread. The main thread receives the message from the worker thread and logs it.
class ProductsController {
  async getAllProduct(req, res) {
    try {
      const results = await Product.find({ deletedAt: null }).then(
        (products) => products
      );
      await RedisController.setPromise({
        key: "products",
        value: JSON.stringify(results),
      });
      res.json({
        fromCache: false,
        data: results,
      });
    } catch (error) {
      console.error(error);
      res.status(404).send("Data unavailable");
    }
  }

  hideProducts(req, res) {
    // console.log("👌 ~ req", req);
    // get products that have deletedAt
    Product.find({ deletedAt: { $ne: null } })
      .then((products) => res.json(products))
      .catch((err) => {
        return res.status(400).json({ error: err });
      });
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

  updateProductByIdProduct(req, res) {
    delete req.body._id, // delete req.body._id để tránh lỗi khi update
      console.log(req.body, req.params.id);
    Product.updateOne(
      {
        _id: req.params.id,
      },

      req.body
    )
      .then(() =>
        RedisController.deletePromise({ key: "products" }).then(() => {
          res.json({
            message: "Update thành công",
          });
        })
      )
      .catch((err) => {
        return res.status(400).json({ error: err });
      });
  }

  hideProductByIdProduct(req, res) {
    Product.updateOne(
      {
        _id: req.params.id,
      },
      {
        deletedAt: Date.now(),
      }
    )
      .then(() =>
        RedisController.deletePromise({ key: "products" }).then(() => {
          res.json({
            message: "Ẩn thành công",
          });
        })
      )
      .catch((err) => {
        return res.status(400).json({ error: err });
      });
  }

  unhideProductByIdProduct(req, res) {
    Product.updateOne(
      {
        _id: req.params.id,
      },
      {
        deletedAt: null,
      }
    )
      .then(() =>
        RedisController.deletePromise({ key: "products" }).then(() => {
          res.json({
            message: "Hiện thành công",
          });
        })
      )
      .catch((err) => {
        return res.status(400).json({ error: err });
      });
  }

  destroy(req, res) {
    Product.deleteOne({ _id: req.params.id })
      .then(() =>
        RedisController.deletePromise({ key: "products" }).then(() =>
          res.json({
            message: "Xóa thành công",
          })
        )
      )
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
      .then(
        res.json({
          message: "Update views thành công",
        })
      )
      .catch((err) => {
        return res.status(400).json({ error: err });
      });
  }
}

module.exports = new ProductsController();
