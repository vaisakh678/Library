let decode = (token) => {
  return JSON.parse(atob(token.split(".")[1]));
};

module.exports = decode;
