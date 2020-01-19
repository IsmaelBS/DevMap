const DevModel = require("../models/DevModel");
const parseStringFromArray = require("../utils/StringToArray");

class SearchController {
  async index(req, res) {
    const { latitude, longitude, techs } = req.query;
    const techsArray = parseStringFromArray(techs);
    
    try {
      const devs = await DevModel.find({
        techs: {
          $in: techsArray
        },
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [longitude, latitude]
            },
            $maxDistance: 10000
          }
        },
      });
  
      return res.json({ devs });
    } catch(e) {
      console.log(e);
    }

    return res.json([]);
  }
  
}

module.exports = new SearchController();
