interface IEnvironment {
  NODE_ENV: 'development' | 'production';
  USE_ENV: string;
  ENV: string;
  JWT_SECRET: string;
  JWT_VALID_MIN: string;
  DATABASE: string;
  REDIS_URL: string;
  REDIS_PORT: string;
  LOG_LEVEL: string;
}

declare const ENVIRONMENT: IEnvironment;
