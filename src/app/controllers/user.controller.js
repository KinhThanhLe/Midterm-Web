const userStore = require("../storages/user.store");
const hasher = require("../../configs/hasher");
const jwt = require("../../configs/jwt");

class USerController {
  // get all users
  getUsers(req, res) {
    var result = userStore.readData();
    res.send(result);
  }

  // register POST /user/register
  register(req, res) {
    var data = req.body;
    if (
      !data.username ||
      !data.password ||
      userStore.isExisted(data.username) != false
    ) {
      return res
        .status(400)
        .json({ message: "Username or password should not be blank!" });
    }

    data.password = hasher.encode(data.password);
    userStore.writeData(data);

    res.status(201).json({ message: "Sign Up Success!" });
  }

  // login POST /user/login
  login(req, res) {
    const data = req.body;

    const PwUser = userStore.isExisted(data.username);

    if (!PwUser || !hasher.compare(PwUser, data.password)) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect!" });
    }

    res.status(201).json({
      message: "Sign In Success!",
      token: jwt.generateToken(data),
    });
  }
}

module.exports = new USerController();
