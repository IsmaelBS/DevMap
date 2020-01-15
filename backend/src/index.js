require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const server = express();
const routes = require("./routes");
const cors = require('cors');

server.use(cors());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

server.use(express.json());
server.use(routes);

server.listen(3333);
