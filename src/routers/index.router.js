const userRouter = require('./user.router');

function Routers(app) {
    app.use('/user', userRouter);
}

module.exports = Routers;