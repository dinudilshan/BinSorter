const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const Dustbin = require("../models/Dustbin");
const dustbinController = require("../controllers/dustbin-controller");

router.post("/sortpath", dustbinController.getSortedDustbinPath); 
router.post("/resortpath", dustbinController.getreSortedDustbinPath); 
router.post("/add", dustbinController.addDustbin); //Add a new item to dustbin
router.get("/",dustbinController.getAllBins);

module.exports = router;