const axios = require("axios");
const convertStringToArray = require("../utils/StringToArray");
const DevModel = require("../models/DevModel");

class DevController {
  async index() {
    const devs = await DevModel.find();
    return devs;
  }

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await DevModel.findOne({ github_username });

    if (!dev) {
      const responseApi = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const techsArray = convertStringToArray(techs);

      const { name = login, avatar_url, bio } = responseApi.data;

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await DevModel.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }

    return res.json(dev);
  }
}

module.exports = new DevController();
