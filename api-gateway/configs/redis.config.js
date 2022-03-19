const { createClient } = require("redis");

let redisClient;

const connect = async () => {
  try {
    redisClient = createClient(); //Default port 6379
    await redisClient.connect();
    await redisClient.flushAll("ASYNC");
    console.log("Redis connected!!");
  } catch (err) {
    console.log(err);
  }
};

connect();

module.exports = { redisClient };
