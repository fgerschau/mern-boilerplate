import database from './database';
import dotenv from 'dotenv';
import { logger } from '@typegoose/typegoose/lib/logSettings';

const environment = process.env.NODE_ENV || 'development';
if (!environment) {
  throw new Error('No environment specified');
}

const envPath = `./.env.${environment}`;
logger.info(`Environment: ${environment}\n`);
const res = dotenv.config({ path: envPath });
if (res.error) {
  logger.error(`Something went wrong while parsing the .env file: \n ${res.error}`);
  process.exit(1);
}

logger.info(`.env file parsed successfully`);
const env = {
  ENV: res.parsed.NODE_ENV || 'development',
  JWT_SECRET: res.parsed.JWT_SECRET,
  JWT_VALID_MIN: res.parsed.JWT_VALID_MIN,
  DATABASE: res.parsed.DATABASE,
  REDIS_URL: res.parsed.REDIS_URL,
  REDIS_PORT: (res.parsed.REDIS_PORT as any) as number,
  LOG_LEVEL: res.parsed.LOG_LEVEL || 'error',
};

export const initializeConfig = (): void => {
  database();
};

export default { ...env };

export const bullmqConfig = {
  connection: {
    host: env.REDIS_URL,
    port: env.REDIS_PORT as number,
    connectTimeout: 20000,
  },
};
