import React from 'react';
import LegalPage from '@/components/LegalPage.jsx';
import { BRAND } from '@/lib/brand.js';

const PrivacyPolicyPage = () => {
  const sections = [
    {
      heading: 'Information We Collect',
      paragraphs: [
        'We collect only the information needed to respond to you and deliver our services. This includes information you give us directly and limited technical information collected automatically.'
      ],
      list: [
        'Contact details you submit through our forms or messages, such as your name, email address, phone number, company name and the details of your enquiry.',
        'Information you share while working with us, such as business details, product information and marketing goals.',
        'Basic technical data such as browser type, device type, pages visited and approximate location, collected through standard website technologies.'
      ]
    },
    {
      heading: 'How We Use Your Information',
      paragraphs: ['We use your information to:'],
      list: [
        'Respond to your enquiries and provide the services you request.',
        'Communicate with you about projects, proposals, updates and support.',
        'Improve our website, services and customer experience.',
        'Protect our website and business from fraud, abuse and security threats.',
        'Meet legal and accounting obligations.'
      ]
    },
    {
      heading: 'Account and Platform Access',
      paragraphs: [
        'When we manage marketplace, advertising or website accounts on your behalf (for example Amazon, eBay, Walmart, Shopify, TikTok Shop, Meta or Google accounts), you may share login or access details with us. We use this access only to perform the agreed services, we limit it to team members who need it, and we ask that you grant access through each platform\'s official permission features wherever possible.'
      ]
    },
    {
      heading: 'Sharing of Information',
      paragraphs: [
        'We do not sell your personal information. We may share information only in these limited situations:'
      ],
      list: [
        'With trusted service providers that help us operate our website, communicate with you or deliver our services, under appropriate confidentiality obligations.',
        'With third-party platforms and marketplaces, only as needed to carry out the services you ask us to perform.',
        'When required by law, regulation or valid legal process, or to protect our rights and the safety of others.'
      ]
    },
    {
      heading: 'WhatsApp and Third-Party Services',
      paragraphs: [
        'Our website lets you contact us through WhatsApp. If you choose to message us there, your use of WhatsApp is governed by WhatsApp\'s own terms and privacy policy. Our website may also link to other third-party sites, and we are not responsible for the privacy practices of those sites.'
      ]
    },
    {
      heading: 'Cookies and Analytics',
      paragraphs: [
        'Our website may use cookies and similar technologies to keep the site working properly, remember your preferences and understand how visitors use the site. You can control or disable cookies through your browser settings, although some parts of the website may not work as intended without them.'
      ]
    },
    {
      heading: 'Data Security',
      paragraphs: [
        'We use reasonable technical and organizational measures to protect your information from unauthorized access, loss or misuse. No method of transmission or storage is completely secure, so we cannot guarantee absolute security, but we take the protection of your information seriously.'
      ]
    },
    {
      heading: 'Data Retention',
      paragraphs: [
        'We keep your information only as long as needed to provide our services, respond to your requests, resolve disputes and meet legal obligations. When it is no longer needed, we delete or anonymize it.'
      ]
    },
    {
      heading: 'Your Rights and Choices',
      paragraphs: ['Depending on where you live, you may have the right to:'],
      list: [
        'Request access to the personal information we hold about you.',
        'Ask us to correct or update inaccurate information.',
        'Ask us to delete your information, subject to legal and contractual requirements.',
        'Opt out of marketing messages at any time.'
      ]
    },
    {
      heading: 'Children\'s Privacy',
      paragraphs: [
        'Our services are intended for businesses and adults. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will delete it.'
      ]
    },
    {
      heading: 'Changes to This Policy',
      paragraphs: [
        'We may update this Privacy Policy from time to time. When we do, we will post the updated version on this page and change the "Last updated" date. We encourage you to review this page periodically.'
      ]
    },
    {
      heading: 'Contact Us',
      paragraphs: [
        `If you have questions about this Privacy Policy or how we handle your information, please contact ${BRAND.name} at ${BRAND.email} or ${BRAND.phoneDisplay}.`
      ]
    }
  ];

  return (
    <LegalPage
      title="Privacy Policy"
      metaDescription="Read how Raiwa Technologies collects, uses and protects your personal information."
      lastUpdated="October 19, 2026"
      intro={`At ${BRAND.name}, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains what we collect, how we use it and the choices you have when you visit our website or use our services.`}
      sections={sections}
    />
  );
};

export default PrivacyPolicyPage;
