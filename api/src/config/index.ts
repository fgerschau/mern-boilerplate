import database from './database';
import dotenv from 'dotenv';
import { logger } from '@typegoose/typegoose/lib/logSettings';

const environment = ENVIRONMENT.NODE_ENV || 'development';
if (!environment) {
  throw new Error('No environment specified');
}

// When set to true, we'll use the environment variables instead of another .env file
const useEnv = ENVIRONMENT.USE_ENV === 'true';

const envPath = `./.env.${environment}`;
logger.info(`Environment: ${environment}\n`);
const res = dotenv.config({ path: envPath });
if (!useEnv && res.error) {
  logger.error(`Something went wrong while parsing the .env file: \n ${res.error}`);
  process.exit(1);
}
logger.info(`.env file parsed successfully`);

const envSource = useEnv ? ENVIRONMENT : res.parsed;
const env = {
  ENV: envSource.NODE_ENV || 'development',
  JWT_SECRET: envSource.JWT_SECRET,
  JWT_VALID_MIN: envSource.JWT_VALID_MIN,
  DATABASE: envSource.DATABASE,
  REDIS_URL: envSource.REDIS_URL,
  REDIS_PORT: (envSource.REDIS_PORT as any) as number,
  LOG_LEVEL: envSource.LOG_LEVEL || 'error',
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
