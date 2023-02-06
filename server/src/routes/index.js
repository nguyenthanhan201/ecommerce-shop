// const productRouter = require("./products.js");

function route(app) {
  app.use("/order", require("./order.js"));
  app.use("/cart-item", require("./cartItem.js"));
  app.use("/auth", require("./auth.js"));
  app.use("/products", require("./products.js"));
  app.use("/rating", require("./rating.js"));
  // app.use("/", (req, res) => {
  //   app.get("/", (req, res) => {
  //     const worker = new Worker("../workers/getProductsWorker.js");
  //     worker.on("message", (data) => {
  //       res.json(data);
  //     });
  //   });
  // });
}

module.exports = route;
