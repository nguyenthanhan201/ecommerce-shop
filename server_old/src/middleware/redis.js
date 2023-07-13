const RedisController = require("../app/controllers/RedisController");

const getRedisCache = async (req, res, next) => {
  const { key } = req.params;

  try {
    const cacheRedis = await RedisController.getPromise({ key }).then(
      (data) => {
        return data;
      }
    );
    if (cacheRedis) {
      res.json({
        fromCache: true,
        data: JSON.parse(cacheRedis),
      });
    } else {
      next();
    }
  } catch (err) {
    // console.log("err auth middleware", err);
    return res.status(400).json({ error: err });
  }
};

module.exports = getRedisCache;
