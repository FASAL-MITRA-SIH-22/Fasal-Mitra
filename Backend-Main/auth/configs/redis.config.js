const { createClient } = require("redis");
require("dotenv").config();

let redisClient;
const connect = async () => {
  try {
    redisClient = createClient({ url: process.env.REDIS_URI || 'redis://redis:6379' })
    await redisClient.connect();
    await redisClient.flushAll("ASYNC");
    console.log("Redis connected!!");
  } catch (err) {
    console.log(err);
    // throw new Error(err)
  }
};

connect();

module.exports = { redisClient };
