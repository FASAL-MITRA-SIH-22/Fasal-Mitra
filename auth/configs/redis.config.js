const { createClient } = require("redis");

let redisClient;

const connect = async () => {
  try {
    // redisClient = createClient("redis://redis:6379"); //Default port 6379
    redisClient = createClient({ url: 'redis://redis:6379' })//for docker
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
