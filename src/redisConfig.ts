import Redis from 'ioredis';
import { promisify } from 'util';

const redisClient = new Redis();

function getRedis(_term: string) {
  const syncRedisGet = promisify(redisClient.get).bind(redisClient);
  return syncRedisGet(_term);
}

function setRedis(_term: string, _value: string) {
  const syncRedisSet = promisify(redisClient.set).bind(redisClient);
  return syncRedisSet(_term, _value);
}

export { redisClient, getRedis, setRedis };
