require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const app = express();
const routes = require("./routes");
const cors = require("cors");
const { setupSocketio } = require("./websocket");

const server = http.Server(app);

setupSocketio(server);

app.use(cors());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());
app.use(routes);

server.listen(3333);
