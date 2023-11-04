const jwt = require("jsonwebtoken");

const secret_key = process.env.SECRET_KEY;

class jwtAuth {
  verifyToken(token) {
    try {
      const payload = jwt.verify(token, secret_key);
      return payload;
    } catch (error) {
      return null;
    }
  }

  generateToken(data) {
    var token = jwt.sign(data, secret_key, { expiresIn: "7d" });
    return token;
  }
}

module.exports = new jwtAuth();
