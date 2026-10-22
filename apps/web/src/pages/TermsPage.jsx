import React from 'react';
import LegalPage from '@/components/LegalPage.jsx';
import { BRAND } from '@/lib/brand.js';

const TermsPage = () => {
  const sections = [
    {
      heading: 'Acceptance of Terms',
      paragraphs: [
        `By accessing our website or engaging ${BRAND.name} for any service, you agree to these Terms and Conditions. If you do not agree, please do not use our website or services.`
      ]
    },
    {
      heading: 'Our Services',
      paragraphs: [
        'We provide ecommerce and marketplace services (including TikTok Shop, eBay, Amazon, Walmart, Temu, Mercari, Shopify and Daraz), development services (apps, games and websites), digital and social media marketing, paid advertising, SEO optimization and web and account management. The exact scope, deliverables, timelines and fees for each project are agreed with you in writing, such as in a proposal, invoice or message confirmation.'
      ]
    },
    {
      heading: 'Client Responsibilities',
      paragraphs: ['To deliver our services effectively, you agree to:'],
      list: [
        'Provide accurate and complete information, content, product details and access we reasonably need.',
        'Respond to requests and approvals in a timely manner, as delays may affect timelines.',
        'Make sure you own or have the right to use all materials you provide to us.',
        'Comply with all laws and with the policies of the platforms you sell or advertise on.'
      ]
    },
    {
      heading: 'Third-Party Platforms and Accounts',
      paragraphs: [
        'Marketplaces and advertising platforms such as Amazon, eBay, Walmart, Shopify, TikTok, Meta and Google have their own rules, fees, approval processes and policy changes that are outside our control. While we work carefully to follow these rules, we cannot control a platform\'s decisions, including account reviews, suspensions, listing removals or policy changes.'
      ]
    },
    {
      heading: 'No Guarantee of Results',
      paragraphs: [
        'We work hard to deliver strong results, but sales, rankings, traffic, advertising performance and revenue depend on many factors outside our control, including market conditions, competition, product quality, pricing, ad budgets and platform algorithms. For this reason, we do not guarantee specific results, rankings or income.'
      ]
    },
    {
      heading: 'Fees and Payments',
      paragraphs: [
        'Fees are agreed before work begins and are payable as stated in the proposal or invoice. Unless otherwise agreed, advertising budgets, platform fees, software subscriptions and other third-party costs are separate from our service fees and are paid by you. Late payments may result in a pause of services until the balance is settled.'
      ]
    },
    {
      heading: 'Intellectual Property',
      paragraphs: [
        'Once full payment has been received, you own the final deliverables created specifically for you, such as custom designs, website content and developed code, unless otherwise agreed in writing. We keep ownership of our pre-existing tools, methods, templates and know-how, and we may reuse general knowledge and techniques gained while working with you. We may display non-confidential project work in our portfolio unless you ask us not to.'
      ]
    },
    {
      heading: 'Confidentiality',
      paragraphs: [
        'We treat your non-public business information, account details and access credentials as confidential and use them only to perform the agreed services. This obligation does not apply to information that is already public, that you have authorized us to share, or that we are required to disclose by law.'
      ]
    },
    {
      heading: 'Limitation of Liability',
      paragraphs: [
        `To the fullest extent permitted by law, ${BRAND.name} will not be liable for indirect, incidental, special or consequential damages, including loss of profits, revenue, data or business opportunities, arising from the use of our website or services. Our total liability for any claim relating to our services will not exceed the fees you paid to us for the specific service giving rise to the claim.`
      ]
    },
    {
      heading: 'Termination',
      paragraphs: [
        'Either party may end an ongoing service arrangement by giving reasonable written notice, unless a different notice period is agreed in writing. You remain responsible for fees for work completed and costs incurred up to the termination date. We may suspend or end services immediately if these terms are seriously breached or if the services would violate the law or platform rules.'
      ]
    },
    {
      heading: 'Use of Our Website',
      paragraphs: [
        'You agree not to misuse our website, attempt to gain unauthorized access to it, interfere with its operation, or use it for any unlawful purpose. All content on this website, including text, graphics and logos, belongs to us or our licensors and may not be copied or reused without permission.'
      ]
    },
    {
      heading: 'Changes to These Terms',
      paragraphs: [
        'We may update these Terms and Conditions from time to time. The updated version will be posted on this page with a new "Last updated" date. Continued use of our website or services after changes means you accept the updated terms.'
      ]
    },
    {
      heading: 'Governing Law',
      paragraphs: [
        'These Terms and Conditions are governed by the laws applicable in the jurisdiction where Raiwa Technologies operates. Any disagreement will first be addressed through good-faith discussion between the parties.'
      ]
    },
    {
      heading: 'Contact Us',
      paragraphs: [
        `For any questions about these Terms and Conditions, please contact ${BRAND.name} at ${BRAND.email} or ${BRAND.phoneDisplay}.`
      ]
    }
  ];

  return (
    <LegalPage
      title="Terms & Conditions"
      metaDescription="Read the terms and conditions that apply when you use the Raiwa Technologies website and services."
      lastUpdated="October 19, 2026"
      intro={`These Terms and Conditions set out the rules for using the ${BRAND.name} website and for working with us. Please read them carefully before using our website or engaging our services.`}
      sections={sections}
    />
  );
};

export default TermsPage;
