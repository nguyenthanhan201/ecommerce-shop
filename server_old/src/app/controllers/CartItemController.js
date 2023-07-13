const CartItem = require("../models/CartItem");

class CartItemController {
  // [GET] /cart-items
  index(req, res) {
    CartItem.find({})
      .then((cartItems) => {
        res.json(cartItems);
      })
      .catch((err) => {
        res.json(err);
      });
  }

  // [GET] /cart-items/:id
  getCartItemsByIdAuth(req, res) {
    CartItem.find({ idAuth: req.params.id })
      .then((cartItem) => {
        CartItem.populate(
          cartItem,
          { path: "idProduct" },
          function (err, cartItems) {
            if (err) return res.status(400).json({ error: err });
            // groupBy cartItem by idProduct and size and color
            const grouped = {};
            // const cartItemsGroupBy = lodash.groupBy(
            //   cartItems,
            //   function (item) {
            //     return item.idProduct._id + item.size + item.color;
            //   }
            // );
            cartItems.forEach(function (a) {
              if (grouped[a.idProduct._id + a.size + a.color]) {
                grouped[a.idProduct._id + a.size + a.color][0].quantity +=
                  a.quantity;
              } else {
                grouped[a.idProduct._id + a.size + a.color] = [a];
              }
            });
            res.json(grouped);

            // CartItem.populate(
            //   cartItem,
            //   { path: "idAuth" },
            //   function (err, cartItems) {

            //   }
            // );
          }
        );
      })
      .catch((err) => {
        res.json(err);
      });

    // get product by idproduct
    // Claim.findOne({ _id: req.params.id })
    //   .populate({ path: "idAuth" })
    //   .then((cartItem) => {
    //     res.json(cartItem);
    //   });
  }

  // [POST] /cart-items
  create(req, res) {
    const cartItem = new CartItem(req.body);
    cartItem
      .save()
      .then((cartItem) => {
        res.json(cartItem);
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  }

  // [POST] /cart-items/delete
  delete(req, res) {
    CartItem.deleteMany({
      idAuth: req.body.idAuth,
      idProduct: req.body.idProduct,
      size: req.body.size,
      color: req.body.color,
    })
      .then((cartItem) => {
        res.json(cartItem);
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  }

  clearCart(req, res) {
    CartItem.deleteMany({
      idAuth: req.body.idAuth,
    })
      .then((cartItem) => {
        res.json({ message: "Xóa giỏ hàng thành công" });
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  }
}

module.exports = new CartItemController();
