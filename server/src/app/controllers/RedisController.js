const client = require("../../config/db/init.redis");

class RedisController {
  async setPromise({ key, value }) {
    return await new Promise((resolve, reject) => {
      // EX: accepts a value with the cache duration in seconds
      // NX: when set to true, it ensures that the set() method should only set a key that doesn’t already exist in Redis.
      client.set(key, value, (err, reply) => {
        return err ? reject(err) : resolve(reply);
      });
    });
  }
  async getPromise({ key }) {
    return await new Promise((resolve, reject) => {
      client.get(key, (err, reply) => {
        return err ? reject(err) : resolve(reply);
      });
    });
  }
  async deletePromise({ key }) {
    return await new Promise((resolve, reject) => {
      client.del(key, (err, reply) => {
        return err ? reject(err) : resolve(reply);
      });
    });
  }
}

module.exports = new RedisController();
