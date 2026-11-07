// apps/web/src/lib/serviceContext.js
// Derive WhatsApp context label from a React Router pathname.
// Returns a service title string, or null for non-service pages.

import { services, mainServices } from '@/lib/services.js';

/**
 * Given a pathname like "/services/digital-marketing" or "/services/amazon",
 * returns the human-readable title of that service (e.g. "Digital Marketing" or "Amazon").
 * Returns null for home, contact, about, etc.
 */
export function getServiceContextFromPath(pathname) {
  if (!pathname) return null;

  // Match /services/:slug
  const match = pathname.match(/^\/services\/([^/]+)/);
  if (!match) return null;

  const slug = match[1];

  // Check main services first (e.g. ecommerce, marketing, development)
  const mainService = mainServices.find((s) => s.slug === slug);
  if (mainService) return mainService.title;

  // Then check individual services (e.g. amazon, tiktok-shop)
  const service = services.find((s) => s.slug === slug);
  if (service) return service.title;

  return null;
}
