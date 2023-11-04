const fs = require("fs");
const User = require("../models/user.model");

class userStore {
  readData = () => {
    const jsonData = fs.readFileSync("users.json", "utf8");
    const data = JSON.parse(jsonData);

    // Tạo danh sách các đối tượng User
    const users = data.map((item) => {
      return new User(
        item.full_name,
        item.username,
        item.password,
        item.created_at,
        item.updated_at,
        item.email,
        item.phone_number,
        item.birthday,
        item.social_id,
        item.address
      );
    });

    return users;
  };

  writeData = (user) => {
    var users = this.readData();
    users.push(user);
    const jsonData = JSON.stringify(users, null, 2);

    fs.writeFileSync("users.json", jsonData, "utf8");
  };

  isExisted = (username) => {
    var users = this.readData();

    const user = users.find((user) => user.username === username);
    if (user) {
      return user.password;
    } else {
      return false;
    }
  };
}

module.exports = new userStore();
