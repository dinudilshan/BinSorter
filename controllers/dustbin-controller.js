const Dustbin = require("../models/Dustbin")

const addDustbin = async (req, res, next) => {
    const { bin_id, bin_name, lat, lon } = req.body;
    let newdustbin;
    try {
      newdustbin = new Dustbin({
        bin_id,
        bin_name, 
        lat, 
        lon,
      });
      await newdustbin.save();
    } catch (err) {
      console.log(err);
    }
    if (!newdustbin) {
      return res.status(404).json({ message: "Dustbin not added" });
    }
    res.status(201).json({ newdustbin });
};

const getSortedDustbinPath = async (req, res, next) => {
    const { bin_id, bin_name, lat, lon } = req.body;
    let newdustbin;
    try {
      newdustbin = new Dustbin({
        bin_id,
        bin_name, 
        lat, 
        lon,
      });
    //   await newdustbin.save();

    } catch (err) {
      console.log(err);
    }
    if (!newdustbin) {
      return res.status(404).json({ message: "Dustbin not added" });
    }
    res.status(201).json({ newdustbin });
};

const getAllBins = async (req, res, next) => {
    let dustbins;
    try {
        dustbins = await Dustbin.find();
    } catch (err) {
      console.log(err);
    }
    if (!dustbins) {
      return res.status(404).json({ message: "No Dustbin found" });
    }
    res.status(200).json({ dustbins });
  };

module.exports = {
addDustbin: addDustbin,
getSortedDustbinPath:getSortedDustbinPath,
getAllBins:getAllBins,

};