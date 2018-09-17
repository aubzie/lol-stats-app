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

app.use("/", lolRouter);


app.listen(8080, () => console.log("Listening on port 8080.."));