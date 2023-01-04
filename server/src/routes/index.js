const productRouter = require("./products.js");
const authRouter = require("./auth.js");
const cartItemRouter = require("./cartItem.js");
const orderRouter = require("./order.js");

function route(app) {
  app.use("/order", orderRouter);
  app.use("/cart-item", cartItemRouter);
  app.use("/auth", authRouter);
  app.use("/products", productRouter);
}

module.exports = route;
