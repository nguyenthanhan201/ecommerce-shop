// const productRouter = require("./products.js");

function route(app) {
  app.use("/order", require("./order.js"));
  app.use("/cart-item", require("./cartItem.js"));
  app.use("/auth", require("./auth.js"));
  app.use("/products", require("./products.js"));
  app.use("/rating", require("./rating.js"));
}

module.exports = route;
