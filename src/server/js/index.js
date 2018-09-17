require("dotenv").load();
const express = require("express");
const lolRouter = require("./routes/lolRoute");
//console.log(process.env);
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var port = 80;
if (process.env.APP_SERVER_PORT)
    port = process.env.APP_SERVER_PORT;

app.use("/", lolRouter);


app.listen(port, () => console.log("Listening on port " + port));