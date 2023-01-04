const Auth = require("../models/Auth");

class AuthsController {
  login(req, res) {
    const auth = new Auth(req.body);
    // console.log("👌 ~ req.body", req.body.email);
    // check auth has id already or not
    Auth.exists({ email: auth.email })
      .then((data) => {
        if (data) {
          res.json(data);
        } else {
          auth
            .save()
            .then((data) => {
              res.json(data);
            })
            .catch((err) => {
              return res.status(400).json({ error: err });
            });
        }
      })
      .catch((err) => {
        return res.status(400).json({ error: err });
      });
  }
}

module.exports = new AuthsController();
