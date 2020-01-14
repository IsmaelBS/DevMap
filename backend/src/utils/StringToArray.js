module.exports = function convertStringToArray(string) {
  return string.split(",").map(index => {
    return index.trim();
  });
};
