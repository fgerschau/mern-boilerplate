import express from 'express';
import bodyParser from 'body-parser';
import controllers from '#/controllers';
import { initializeConfig } from '#/config';
import { initializeMiddlewares } from '#/middleware';
import cors from 'cors';
import { initializePassportStrategies } from '#/config/passport';
import { router as bullBoardRouter } from 'bull-board';
import { initJobs } from '#/jobs';
import morgan from 'morgan';
import logger from '#/utils/logger';

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(cors());

// TODO: Protect route
app.use('/admin/queues', bullBoardRouter);

initializeConfig();
initializePassportStrategies(app);
controllers(app);
initializeMiddlewares(app); // has to be initialized last
initJobs();

const port = 8080; // default port to listen

// start the Express server
app.listen(port, () => {
  logger.info(`server started at http://localhost:${port}`);
});
