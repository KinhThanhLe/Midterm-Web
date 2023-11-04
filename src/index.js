const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

//implement routers
require('./routers/index.router')(app);

app.use((err, req, res, next) => {
    res.status(500).send(err.message)
})

app.listen(port, ()=> {
    console.log('listening on port', port);
})

console.log("Hello Bao Trang!")