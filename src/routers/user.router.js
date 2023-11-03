const express = require(`express`);
const router = express.Router();

const userRouter = require('../app/controllers/user.controller')

router.get('/ping', userRouter.ping);

module.exports = router;