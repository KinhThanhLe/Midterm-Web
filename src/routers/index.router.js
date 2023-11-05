const userRouter = require('./user.router');

function Routers(app) {
    app.use('/api/user', userRouter);
}

module.exports = Routers;