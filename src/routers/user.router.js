const express = require(`express`);
const router = express.Router();

const userRouter = require("../app/controllers/user.controller");

router.get("/list", userRouter.getUsers);
router.post("/register", userRouter.register);
router.post("/login", userRouter.login);

module.exports = router;
