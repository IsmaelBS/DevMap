const socketio = require("socket.io");
const parseArrayfromString = require("./utils/StringToArray");
const calculateDistance = require("./utils/calculateCoordinates");
let io;
const connections = [];
exports.setupSocketio = server => {
  io = socketio(server);

  io.on("connection", socket => {
    const { id } = socket;
    const { latitude, longitude, techs } = socket.handshake.query;

    connections.push({
      socketId: id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude)
      },
      techs: parseArrayfromString(techs)
    });
  });
};

exports.findConnection = (coordinates, techs) => {
  return connections.filter(con => {
    return (
      calculateDistance(coordinates, con.coordinates) < 10 &&
      con.techs.some(tech => techs.includes(tech))
    );
  });
};

exports.sendMessage = (to, message, data) => {
  to.forEach(con => {
    io.to(con.socketId).emit(message, data);
  });
};
