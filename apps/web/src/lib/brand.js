// Central place for Raiwa Technologies brand details.
// Change a value here and it updates everywhere on the website.
export const BRAND = {
  name: 'Raiwa Technologies',
  shortName: 'Raiwa',
  tagline: 'Ecommerce, Development & Digital Growth',
  email: 'raiwatechnologies@gmail.com',
  phoneDisplay: '+92 322 9160096',
  phoneTel: '+923229160096',
  // WhatsApp links need the number in digits only (no + or spaces)
  whatsappNumber: '923229160096',
  whatsappMessage: "Hi Raiwa Technologies, I'm interested in your services. Please contact me.",
  // Logo file lives in the /public folder. Replace public/logo.png with a new logo,
  // or change this path if the file has a different name.
  logoSrc: '/logo.png',
};

export const getWhatsAppUrl = (message = BRAND.whatsappMessage) =>
  `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(message)}`;
