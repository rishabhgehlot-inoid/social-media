const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRETORPRIVATEKEY = process.env.SECRET_KEY;

const generateJWTToken = (inputdata) => {
  let data = {
    time: Date(),
    ...inputdata,
  };

  const token = jwt.sign(data, SECRETORPRIVATEKEY);

  return token;
};

module.exports = { generateJWTToken };
