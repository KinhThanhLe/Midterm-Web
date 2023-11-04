const userStore = require('../storages/user.store');

class USerController {
    getUsers(req, res) {
        var result = userStore.readData();
        res.send(result)
    }
}

module.exports = new USerController();