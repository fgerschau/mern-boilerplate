import { logger } from '@typegoose/typegoose/lib/logSettings';
import mongoose from 'mongoose';
import config from './index';

export default (): void => {
  // Connect to the database
  try {
    const databaseUrl = config.DATABASE;
    if (!databaseUrl) throw new Error('No database url set!');

    logger.info(`Connecting to database: ${databaseUrl}`);
    mongoose.connect(databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.set('useCreateIndex', true);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`Couldn't connect to the database: ${e}`);
    process.exit(1);
  }
};
