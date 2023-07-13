const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authentication;
  // console.log("👌 ~ authHeader", authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) res.status(401).json({ error: "Access token not found" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log(decoded);

    next();
  } catch (err) {
    // console.log("err auth middleware", err);
    return res.status(400).json({ error: err });
  }

  // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
  //   if (err) return res.sendStatus(403);
  //   req.user = user;
  //   next();
  // });
};

module.exports = verifyToken;
