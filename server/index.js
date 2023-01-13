const express = require("express");
const app = express();
const port = 8080;
const methodOverride = require("method-override");
const { engine } = require("express-handlebars");
const path = require("path");
const route = require("./src/routes/index.js");
const db = require("./src/config/db");
const cors = require("cors");
require("dotenv").config();

// Connect to DB
db.connect();

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

// Routes init
route(app);

app.listen(port, () => console.log(`App listening on port ${port}!`));
