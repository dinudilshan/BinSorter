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

// define local constants for frequently used functions
const asin = Math.asin
const cos = Math.cos
const sin = Math.sin
const PI_180 = Math.PI / 180

function hav(x) {
  const s = sin(x / 2)
  return s * s
}

function relativeHaversineDistance(lat1, lon1, lat2, lon2) {
  const aLatRad = lat1 * PI_180
  const bLatRad = lat2 * PI_180
  const aLngRad = lon1 * PI_180
  const bLngRad = lon2 * PI_180

  const ht = hav(bLatRad - aLatRad) + cos(aLatRad) * cos(bLatRad) * hav(bLngRad - aLngRad)
  // since we're only interested in relative differences,
  // there is no need to multiply by earth radius or to sqrt the squared differences
  return asin(ht)
}
const getSortedDustbinPath = async (req, res, next) => {
    const { bin_locations ,current_location} = req.body;
    let newdustbin;
    try {
    
      const distanceTo =current_location[0];

      // console.log(distanceTo)

      const sorted = bin_locations.sort((a, b) => relativeHaversineDistance(a.latitude, a.longitude, distanceTo.latitude, distanceTo.longitude) - relativeHaversineDistance(b.latitude, b.longitude, distanceTo.latitude, distanceTo.longitude))
      
      // console.log(sorted)

      // res.status(200).json({sorted})
      res.status(200).json({sorted})


    } catch (err) {
      console.log(err);
    res.status(201).json({ err });

    }
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

 

// const bin_locations = [
//   { "id": 279, "latitude": 6.912283, "longitude": 79.853239 },
//   { "id": 284, "latitude": 6.885697 , "longitude": 79.865699},
//   { "id": 13, "latitude": 6.912220 , "longitude": 79.851187},
//   { "id": 282, "latitude": 6.871041, "longitude": 79.858904 },
//   { "id": 281, "latitude": 6.899757, "longitude": 79.853346 },
//   { "id": 16, "latitude": 6.894039 , "longitude": 79.854786}
// ]

// const distanceTo = {
//   "id": 279,
//   "longitude": 79.853239,
//   "latitude": 6.912283
// }




module.exports = {
addDustbin: addDustbin,
getSortedDustbinPath:getSortedDustbinPath,
getAllBins:getAllBins,

};