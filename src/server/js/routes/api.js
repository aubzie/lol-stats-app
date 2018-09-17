const express = require("express");
const router = express.Router();
const http = require("https");

router.get("/", (req, res) => res.send({ hello: "fjdslfjdslkfjdlsk" }));
router.get("/test", (req, res) => {
    var options = {
        host : process.env.RIOT_BASE_URL,
        path : "/lol/summoner/v3/summoners/by-name/RiotSchmick?api_key=" + process.env.RIOT_API_KEY,
        method : "GET"
    }

    let data = [];

    http.get(process.env.RIOT_BASE_URL + "/lol/summoner/v3/summoners/by-name/RiotSchmick?api_key=" + process.env.RIOT_API_KEY, (riotRes) => {
        riotRes.on("data", (chunk) => {
            data.push(chunk);
        });

        riotRes.on("end", () => {
            res.json(JSON.parse(data));
        });

    })
    .on("error", (err) => {
        console.log("Error: " + err.message);
    });

    //res.setHeader('Content-Type', 'application/json');
    //res.json(dataJson);
});

module.exports = router;