/// <reference path="../pb_data/types.d.ts" />

onRecordAfterCreateSuccess((e) => {
  const escapeHtml = (value) => {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };

  const name = escapeHtml(e.record.get("name"));
  const email = escapeHtml(e.record.get("email"));
  const phone = escapeHtml(e.record.get("phone"));
  const company = escapeHtml(e.record.get("company"));
  const marketingChallenges = escapeHtml(e.record.get("marketing_challenges"));
  const preferredContact = escapeHtml(e.record.get("preferred_contact"));
  const message = escapeHtml(e.record.get("message")).replace(/\n/g, "<br>");
  const submittedAt = escapeHtml(e.record.get("created"));
  const recordId = escapeHtml(e.record.id);
  const rawEmail = String(e.record.get("email") || "");
  const rawPhone = String(e.record.get("phone") || "");
  const rawName = String(e.record.get("name") || "Someone");

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body { font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background: #f4f4f5; }
        .container { max-width: 600px; margin: 24px auto; background: #fff; border-radius: 8px; overflow: hidden; border: 1px solid #e4e4e7; }
        .header { background: #F20D20; color: #fff; padding: 24px; }
        .header h1 { margin: 0; font-size: 22px; }
        .header p { margin: 8px 0 0; font-size: 13px; opacity: 0.9; }
        .content { padding: 24px; }
        .section { margin-bottom: 20px; }
        .section-title { font-weight: bold; color: #F20D20; font-size: 13px; text-transform: uppercase; margin-bottom: 10px; border-bottom: 2px solid #292A2D; padding-bottom: 6px; }
        .field { margin-bottom: 12px; }
        .field-label { font-weight: bold; color: #3f3f46; font-size: 12px; }
        .field-value { color: #52525b; font-size: 14px; margin-top: 3px; line-height: 1.5; }
        .footer { background: #fafafa; padding: 14px; text-align: center; font-size: 12px; color: #71717a; border-top: 1px solid #e4e4e7; }
        a { color: #F20D20; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Contact Form Submission</h1>
          <p>Submission ID: ${recordId}</p>
        </div>
        <div class="content">
          <div class="section">
            <div class="section-title">Contact Information</div>
            <div class="field">
              <div class="field-label">Name</div>
              <div class="field-value">${name || "Not provided"}</div>
            </div>
            <div class="field">
              <div class="field-label">Email</div>
              <div class="field-value"><a href="mailto:${rawEmail}">${email || "Not provided"}</a></div>
            </div>
            <div class="field">
              <div class="field-label">Phone</div>
              <div class="field-value"><a href="tel:${rawPhone}">${phone || "Not provided"}</a></div>
            </div>
            <div class="field">
              <div class="field-label">Company</div>
              <div class="field-value">${company || "Not provided"}</div>
            </div>
          </div>
          <div class="section">
            <div class="section-title">Inquiry Details</div>
            <div class="field">
              <div class="field-label">Marketing Challenges</div>
              <div class="field-value">${marketingChallenges || "Not provided"}</div>
            </div>
            <div class="field">
              <div class="field-label">Preferred Contact Method</div>
              <div class="field-value">${preferredContact || "Not specified"}</div>
            </div>
          </div>
          <div class="section">
            <div class="section-title">Message</div>
            <div class="field">
              <div class="field-value">${message || "No message"}</div>
            </div>
          </div>
          <div class="section">
            <div class="section-title">Submission Details</div>
            <div class="field">
              <div class="field-label">Submitted At</div>
              <div class="field-value">${submittedAt || "Just now"}</div>
            </div>
          </div>
        </div>
        <div class="footer">
          <p>Automated notification from your Raiwa Technologies contact form.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const mailMessage = new MailerMessage({
      from: { name: "Raiwa Technologies Contact Form" },
      to: [{ address: "raiwatechnologies@gmail.com" }],
      subject: "New Contact Form Submission from " + rawName,
      html: htmlBody,
    });

    $app.newMailClient().send(mailMessage);
    $app.logger().info("contact form notification sent", "to", "raiwatechnologies@gmail.com", "id", e.record.id);
  } catch (err) {
    $app.logger().error(
      "contact form notification failed",
      "id", e.record.id,
      "err", String(err)
    );
  }

  e.next();
}, "contacts");
