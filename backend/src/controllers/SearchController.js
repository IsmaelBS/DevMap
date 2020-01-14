const DevModel = require("../models/DevModel");
const parseStringFromArray = require("../utils/StringToArray");

class SearchController {
  async index(req, res) {
    const { latitude, longitude, techs } = req.query;
    const techsArray = parseStringFromArray(techs);

    const devs = await DevModel.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          type: "Point",
          coordinates: [longitude, latitude]
        }
      },
      $maxDistance: 10000
    });

    return res.json({ devs });
  }
}

module.exports = new SearchController();
