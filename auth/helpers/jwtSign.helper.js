const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const PATH_TO_PUB = __dirname + "/../private.pem";
const PUB_KEY = fs.readFileSync(PATH_TO_PUB, "utf8");

const expiresIn = 3 * 24 * 60 * 60 * 1000;

const signJWT = async (payload) => {
  return new Promise((resolve, reject) => {
    if (payload && "_id" in payload) {
      jsonwebtoken.sign(
        payload,
        PUB_KEY,
        { expiresIn: expiresIn },
        (error, signedToken) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(signedToken);
          return;
        }
      );
    } else reject("Payload not provided");
  });
};

module.exports = {
  signJWT,
};
