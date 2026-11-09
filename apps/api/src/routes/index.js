import { Router } from 'express';
import healthCheckRouter from './health-check.js';
import contactsRouter from './contacts.js';
import trackClickRouter from './track-click.js';

export default function routes() {
  const router = Router();

  router.use('/health', healthCheckRouter);
  router.use('/contact', contactsRouter);
  router.use('/contacts', contactsRouter);
  router.use('/track-click', trackClickRouter);

  return router;
}