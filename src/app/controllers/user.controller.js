class USerController {
    ping(req, res) {
        var result = {
            "message":"ping 5000"
        }
        res.send(result)
    }
}

module.exports = new USerController();