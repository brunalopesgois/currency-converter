import { redisStore } from 'cache-manager-redis-store';

export default () => ({
  store: redisStore,
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT) || 6379,
  // username: process.env.REDIS_USERNAME,
  // password: process.env.REDIS_PASSWORD,
  // no_ready_check: true,
});
