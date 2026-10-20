import { Router } from 'express';
import healthCheckRouter from './health-check.js';
import contactsRouter from './contacts.js';

export default function routes() {
  const router = Router();

  router.use('/health', healthCheckRouter);
  router.use('/contacts', contactsRouter);

  return router;
}