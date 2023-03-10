const Auth = require("../models/Auth");
const jwt = require("jsonwebtoken");

const generateTokens = (email) => {
  const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  const refeshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET, {
    // expiresIn 1 month
    expiresIn: "30d",
  });

  return { accessToken, refeshToken };
};

const updateRefeshToken = async (email, refeshToken) => {
  await Auth.updateOne({ email: email }, { refeshToken: refeshToken });
};

class AuthsController {
  getUserByEmail(req, res) {
    const auth = new Auth(req.body);
    // console.log("👌 ~ auth", auth);

    // check auth exists
    Auth.findOne({ email: auth.email })
      .then((data) => {
        if (data)
          return res.json({
            name: data.name,
            email: data.email,
            _id: data._id,
          });

        return res.status(400).json({ message: "User is not exits" });
      })
      .catch((err) => {
        return res.status(400).json({ error: err });
      });
  }
  token(req, res) {
    const email = req.body.email;
    // console.log("👌 ~ email", email);

    Auth.findOne({ email }).then((data) => {
      // console.log("👌 ~ data", data);
      if (!data) return res.sendStatus(401);
      // console.log("👌 ~ refeshToken", data.refeshToken);
      try {
        jwt.verify(data.refeshToken, process.env.REFRESH_TOKEN_SECRET);

        const tokens = generateTokens(email);

        updateRefeshToken(email, tokens.refeshToken).then(() => {
          res.json({ accessToken: tokens.accessToken });
        });
      } catch (err) {
        res.status(400).json({ message: "Invalid refesh token" });
      }
    });
  }
  async login(req, res) {
    const auth = await new Auth(req.body);
    const tokens = await generateTokens(auth.email);

    await Auth.findOne({ email: auth.email })
      .then((data) => {
        if (data)
          return updateRefeshToken(auth.email, tokens.refeshToken).then(() => {
            res.json({ accessToken: tokens.accessToken });
          });

        // save auth
        return auth
          .save()
          .then(() => {
            updateRefeshToken(auth.email, tokens.refeshToken).then(() => {
              res.json({ accessToken: tokens.accessToken });
            });
          })
          .catch((err) => {
            return res.status(400).json({ error: err });
          });
      })
      .catch((err) => {
        return res.status(400).json({ error: err });
      });
  }
  logout(req, res) {
    const email = req.body.email;

    Auth.updateOne({ email }, { refeshToken: null }).catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
  }
}

module.exports = new AuthsController();
