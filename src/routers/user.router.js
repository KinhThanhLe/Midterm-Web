const express = require(`express`);
const router = express.Router();

const userRouter = require('../app/controllers/user.controller')

router.get('/list', userRouter.getUsers);

module.exports = router;