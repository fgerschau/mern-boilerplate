import config from '#/config';
import { configure, getLogger } from 'log4js';

configure({
  appenders: { file: { type: 'file', filename: 'app.log' }, out: { type: 'stdout' } },
  categories: { default: { appenders: ['file', 'out'], level: 'error' } },
});

const logger = getLogger();

logger.level = config.LOG_LEVEL;

export default logger;
