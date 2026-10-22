import express from 'express';
import pb from '../utils/pocketbaseClient.js';
import logger from '../utils/logger.js';

const router = express.Router();

const asTrimmedString = (value) => (typeof value === 'string' ? value.trim() : '');

// POST /contacts - Create a new contact
// `company` and `preferred_contact` are optional (matching the contact form and the database schema).
router.post('/', async (req, res) => {
  const body = req.body ?? {};

  const name = asTrimmedString(body.name);
  const email = asTrimmedString(body.email);
  const phone = asTrimmedString(body.phone);
  const company = asTrimmedString(body.company);
  const marketing_challenges = asTrimmedString(body.marketing_challenges);
  const preferred_contact = asTrimmedString(body.preferred_contact) || 'Email';
  const message = asTrimmedString(body.message);

  const requiredFields = { name, email, phone, marketing_challenges, message };

  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      return res.status(400).json({
        error: `Missing or empty required field: ${field}`,
      });
    }
  }

  // Create contact record in PocketBase
  // Errors will be caught by errorMiddleware
  const record = await pb.collection('contacts').create({
    name,
    email,
    phone,
    company,
    marketing_challenges,
    preferred_contact,
    message,
  });

  logger.info(`Contact created: ${record.id}`);

  // Do not echo the stored record back to an anonymous caller
  res.status(201).json({ id: record.id });
});

// NOTE: there is intentionally no public "GET /contacts" route. This server talks to
// PocketBase as a superuser, so an open list endpoint would expose every visitor's
// name, email and phone number to anyone. Read submissions through the PocketBase
// admin (or an authenticated route) instead.

export default router;
