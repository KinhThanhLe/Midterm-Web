const userStore = require("../storages/user.store");
const hasher = require("../../configs/hasher");
const jwt = require("../../configs/jwt");
const tokenStore = require("../storages/token.store");

class USerController {
  // get all users
  async getUser(req, res) {
    var username = req.user;
    const user = await userStore.findUser(username);
    if (!user) {
      res.status(404).json({ status: false, message: "User not found" });
    }
    res.status(200).json({ status: true, message: "Success!", data: user });
  }

  // register POST /user/register
  async register(req, res) {
    var data = req.body;
    if (!data.username || !data.password) {
      return res.status(400).json({
        status: false,
        message: "Username or password should not be blank!",
      });
    }
    const existingUser = await userStore.findUser(data.username);
    if (existingUser) {
      return res
        .status(400)
        .json({ status: false, message: "Username is existed!" });
    }
    data.password = hasher.encode(data.password);
    userStore.createUser(data);

    res.status(201).json({ status: true, message: "Sign Up Success!" });
  }

  // login POST /user/login
  async login(req, res) {
    const data = req.body;

    const user = await userStore.findUser(data.username);

    if (!user || !hasher.compare(user.password, data.password)) {
      return res
        .status(400)
        .json({ status: false, message: "Username or password is incorrect!" });
    }

    const token = jwt.generateToken(data);
    // if user re-login save new token
    // else create new token in database

    await tokenStore.createToken({
      token: token,
      username: data.username,
    });

    res.status(201).json({
      status: true,
      message: "Sign In Success!",
      token: token,
    });
  }

  // [PATCH] /user/profile
  async editProfile(req, res) {
    const username = req.user;
    const data = req.body;

    if (!username || !data) {
      res.status(400).json({ status: false, message: "Bad request!" });
    }

    await userStore.editProfile(username, data);
    const newData = await userStore.findUser(username);
    res.status(200).json({ status: true, message: "Success!", data: newData });
  }

  // [DELETE] /user/logout
  async logout(req, res) {
    const authorizationHeader = req.header("Authorization");
    let tokenStr = "";
    const parts = authorizationHeader.split(" ");
    if (parts.length === 2 && parts[0] === "Bearer") {
      tokenStr = parts[1];
    }

    await tokenStore.deleteTokenByTokenStr(tokenStr);
    res.status(200).json({ status: true, message: "Signed out successfully!" });
  }
}

module.exports = new USerController();
