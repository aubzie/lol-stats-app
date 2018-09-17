const express = require("express");
const router = express.Router();
const http = require("https");

const lolController = require('../controllers/lolController');

router.get("/", lolController.index);
router.get("/summoners/by-name/:name", lolController.get_summoner_by_name);
router.get("/summoners/:accountId/matches", lolController.get_matches_by_summoner); // not used

router.get("/matches/:gameId", lolController.get_match_by_id);


// routes that call the Riot API without limits / static data
router.get("/champions/:championId", lolController.get_champion_by_id);
router.get("/items/:itemId", lolController.get_item_by_id);
router.get("/spells/:spellId", lolController.get_spell_by_id);
router.get("/runes/:runeId", lolController.get_rune_by_id);

module.exports = router;