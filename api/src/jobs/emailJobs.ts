import { Queue, QueueEvents, QueueScheduler } from 'bullmq';
import { setQueues, BullMQAdapter } from 'bull-board';
import { bullmqConfig } from '#/config';
import { logger } from '@typegoose/typegoose/lib/logSettings';

export const EMAIL_JOB_QUEUE = 'EMAIL';

// needed for cronjobs
new QueueScheduler(EMAIL_JOB_QUEUE, bullmqConfig);

const queueEvents = new QueueEvents(EMAIL_JOB_QUEUE, bullmqConfig);

queueEvents.on('completed', () => {
  logger.info('email job completed');
});

queueEvents.on('failed', (_jobId, err) => {
  logger.error('email job failed', err);
});

export const queue = new Queue(EMAIL_JOB_QUEUE, bullmqConfig);

// necessary for bullmq dashboard
setQueues([new BullMQAdapter(queue)]);
