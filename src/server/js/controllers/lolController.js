const axios = require("axios");

// just saying "hello: world"
exports.index = (req, res) => {
    res.json( { hello: "world"} );
};

//
exports.get_summoner_by_name = (req, res) => {

    let output = {};

    // get matches for the summoner
    axios.get(process.env.RIOT_BASE_URL + "/lol/summoner/v3/summoners/by-name/"+ req.params.name + "?api_key=" + process.env.RIOT_API_KEY)
        .then((riotRes) => {
            output = riotRes.data;

            // get the last 10 matches, for this example
            return axios.get(process.env.RIOT_BASE_URL + "/lol/match/v3/matchlists/by-account/" + output.accountId + "?api_key=" + process.env.RIOT_API_KEY + "&beginIndex=0&endIndex=10");
        })
        .then((riotRes) => { // chain dat shizz
            output.matches = riotRes.data.matches;
            res.json(output);
        })
        .catch((error) => {
            if (error.response.status == 404) {
                //console.log(error);
                res.json({accountId: null, matches: null});
            }
            //res.status(404);
        });


    //res.json(output);
};

exports.get_matches_by_summoner = (req, res) => {

}

exports.get_match_by_id = (req, res) => {
    let output = {};

    // get match data. this is going to be fun.
    axios.get(process.env.RIOT_BASE_URL + "/lol/match/v3/matches/"+ req.params.gameId + "?api_key=" + process.env.RIOT_API_KEY)
        .then((riotRes) => {
            let participantIdentity = {}
            let participant = {};
            //output = riotRes.data;

            output.gameId = riotRes.data.gameId;
            output.gameCreated = riotRes.data.gameCreation;
            output.duration = parseInt(riotRes.data.gameDuration / 60) + "m " + riotRes.data.gameDuration % 60 + "s";
            output.accountId = req.query.accountId;

            // this is... silly.
            riotRes.data.participantIdentities.forEach((participantIdentity, index) => {
                if (participantIdentity.player.accountId == req.query.accountId) {
                    participant = riotRes.data.participants[index];

                    output.outcome = participant.stats.win;
                    output.summonerName = participantIdentity.summonerName;
                    output.totalCreepScore = participant.stats.neutralMinionsKilled + participant.stats.totalMinionsKilled; // ehhh..? was comparing this data with op.gg
                    output.creepScorePerMin = output.totalCreepScore / (riotRes.data.gameDuration / 60);

                    output.kills = participant.stats.kills;
                    output.deaths = participant.stats.deaths;
                    output.assists = participant.stats.assists;

                    output.championId = participant.championId;

                    output.championLevel = participant.stats.champLevel;

                    output.spells = [
                        participant.spell1Id,
                        participant.spell2Id
                    ];

                    output.items = [
                        participant.stats.item0,
                        participant.stats.item1,
                        participant.stats.item2,
                        participant.stats.item3,
                        participant.stats.item4,
                        participant.stats.item5,
                        participant.stats.item6,
                    ];

                    output.runes = [];

                    res.json(output);
                }
            });

        })
        .catch((error) => {
            res.status(500);
            console.log("Error: " + error);
        });

}


exports.get_champion_by_id = (req, res) => {

    // oh man....
    axios.get(process.env.RIOT_STATIC_DATA_CHAMPIONS_URL)
        .then((riotRes) => {

            let champions = riotRes.data.data;

            for (var name in champions)
            {
                if (parseInt(champions[name].key) == req.params.championId) 
                    res.json(champions[name]);
            }
        })
        .catch((error) => {
            res.status(500);
            console.log("Error: " + error);
        });
}

exports.get_item_by_id = (req, res) => {

    axios.get(process.env.RIOT_STATIC_DATA_ITEMS_URL)
        .then((riotRes) => {
            let items = riotRes.data.data;
            res.json(items[req.params.itemId]);

        })
        .catch((error) => {
            res.status(500);
            console.log("Error: " + error);
        });
}

exports.get_spell_by_id = (req, res) => {

    // oh man....
    axios.get(process.env.RIOT_STATIC_DATA_SPELLS_URL)
        .then((riotRes) => {

            let spells = riotRes.data.data;

            for (var name in spells)
            {
                if (parseInt(spells[name].key) == req.params.spellId) 
                    res.json(spells[name]);
                
            }
        })
        .catch((error) => {
            res.status(500);
            console.log("Error: " + error);
        });
}

exports.get_rune_by_id = (req, res) => {

    axios.get(process.env.RIOT_STATIC_DATA_RUNES_URL)
        .then((riotRes) => {

            let runes = riotRes.data.data;

            for (var name in runes)
            {
                if (parseInt(name) == req.params.runeId) 
                    res.json(runes[name]);
                
            }
        })
        .catch((error) => {
            res.status(500);
            console.log("Error: " + error);
        });
}