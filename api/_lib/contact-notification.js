const recipient = 'raiwatechnologies@gmail.com';

export async function notifyNewContact(contact) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_NOTIFICATION_FROM;
  if (!apiKey || !from) {
    console.warn('[contact] Email notification skipped: RESEND_API_KEY and CONTACT_NOTIFICATION_FROM are required');
    return;
  }

  const text = [
    `New contact form submission (${contact.id})`,
    `Name: ${contact.name}`,
    `Email: ${contact.email}`,
    `Phone: ${contact.phone}`,
    `Company: ${contact.company || 'Not provided'}`,
    `Marketing challenges: ${contact.marketing_challenges}`,
    `Preferred contact: ${contact.preferred_contact}`,
    `Submitted at: ${contact.created_at}`,
    '',
    'Message:',
    contact.message,
  ].join('\n');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        subject: `New Contact Form Submission from ${contact.name}`,
        text,
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error(`[contact] Email notification failed (${response.status}): ${details}`);
    }
  } catch (error) {
    console.error('[contact] Email notification failed:', error?.message ?? error);
  }
}
