const cacheMap = new Map();
const TTLHours = 5;
const TTLMinutes = TTLHours * 60;
const TTLSeconds = TTLMinutes * 60;
const TTLMilliseconds = TTLSeconds * 1000;

export const cacheMiddleware = (req, res, next) => {
  const cacheKey = `${req.method}:${req.url}`;
  console.log(cacheKey);

  if (cacheMap.has(cacheKey)) {
    const { data } = cacheMap.get(cacheKey);
    return res.json(data);
  }

  const oldResJson = res.json;

  res.json = function (data) {
    const time = Date.now();
    cacheMap.set(cacheKey, { data, time });

    return oldResJson.call(this, data);
  };

  next();
};

const evictionTimerSeconds = 10 * 60;

setInterval(() => {
  console.log(cacheMap);
  cacheMap.forEach((value, key, map) => {
    const shouldEvict = Date.now() > value.time + TTLMilliseconds;
    if (shouldEvict) {
      map.delete(key);
    }
  });
}, evictionTimerSeconds * 1000);
