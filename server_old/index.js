const express = require("express");
const app = express();
const port = 8080;
const methodOverride = require("method-override");
const { engine } = require("express-handlebars");
const path = require("path");
const route = require("./src/routes/index.js");
const dbMongo = require("./src/config/db/init.mongo");
const cors = require("cors");
const compression = require("compression");
const { Worker } = require("worker_threads");
// const os = require("os");
require("dotenv").config();

// process.env.UV_THREADPOOL_SIZE = os.cpus().length;

// Connect to MongoDB
dbMongo.connect();

app.use(cors());
// config này giúp dùng static file
// app.use(express.static(path.join(__dirname, "./src/public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// HTTP logger
// dùng để xem các request gửi lên server
// app.use(morgan("combined"));

// Template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./src/resources", "views"));

app.use(
  compression({
    level: 6,
    threshold: 100 * 1024,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        // don't compress responses with this request header
        return false;
      }

      // fallback to standard filter function
      return compression.filter(req, res);
    },
  })
);

// Test worker threads
// app.get("/", (req, res) => {
//   const worker = new Worker("./src/workers/getProductsWorker.js");
//   worker.on("message", (data) => {
//     res.json(data);
//   });
// });
// Routes init
route(app);

// const autocannon = require("autocannon");

// autocannon(
//   {
//     url: "http://localhost:8080",
//     connections: 10, //default
//     pipelining: 1, // default
//     duration: 10, // default
//   },
//   console.log
// );

app.listen(port, () => console.log(`App listening on port ${port}!`));
