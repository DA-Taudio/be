import { INestApplication } from '@nestjs/common';
import { Queue } from 'bull';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';
import * as expressBasicAuth from 'express-basic-auth';

export function setupBullBoard(app: INestApplication) {
  const aQueue = app.get<Queue>(`BullQueue_sms`);
  const { router: bullRouter } = createBullBoard([new BullAdapter(aQueue)]);
  app.use(
    '/bull-board',
    expressBasicAuth({
      users: {
        dev: 'dev',
      },
      challenge: true,
    }),
    bullRouter,
  );
}
