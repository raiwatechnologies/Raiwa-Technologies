
import {
  Video,
  Tag,
  ShoppingCart,
  Store,
  Package,
  Layers,
  ShoppingBag,
  Globe,
  Smartphone,
  Gamepad2,
  Code,
  Megaphone,
  Share2,
  Target,
  MousePointerClick,
  Search,
  LayoutDashboard,
  ClipboardList,
  Workflow,
  Palette,
  Image,
} from 'lucide-react';

const A = '/service-assets/';

/* =====================================================
   INDIVIDUAL SERVICES
   Each service has four unique benefits.
===================================================== */

export const services = [
  // ECOMMERCE

  {
    title: 'TikTok Shop',
    slug: 'tiktok-shop',
    logoUrl: A + 'tiktok-shop-logo.png',
    themeImage: A + 'tiktok-shop-theme.jpg',
    image: A + 'tiktok-shop-theme.jpg',
    category: 'Ecommerce',
    icon: Video,
    accent: '#DA0807',
    soft: '#E5E5E5',
    description:
      'Launch and grow your TikTok Shop with a store setup, optimized product listings and social-commerce support.',
    benefits: [
      {
        title: 'Shop Setup',
        description: 'Set up your TikTok Shop with organized products and a professional storefront.',
      },
      {
        title: 'Product Listings',
        description: 'Create engaging listings with clear descriptions and attractive product visuals.',
      },
      {
        title: 'Content Promotion',
        description: 'Support product visibility through engaging content and promotional activities.',
      },
      {
        title: 'Order Management',
        description: 'Keep orders, inventory and daily store operations organized.',
      },
    ],
    label: 'TikTok Shop',
  },

  {
    title: 'eBay',
    slug: 'ebay',
    logoUrl: A + 'ebay-logo.png',
    themeImage: A + 'ebay-theme.jpg',
    image: A + 'ebay-theme.jpg',
    category: 'Ecommerce',
    icon: Tag,
    accent: '#DA0807',
    soft: '#E5E5E5',
    description:
      'Build a stronger eBay presence with clear listings, store organization and ongoing marketplace support.',
    benefits: [
      {
        title: 'Store Setup',
        description: 'Organize your eBay seller store for a professional shopping experience.',
      },
      {
        title: 'Listing Optimization',
        description: 'Improve product titles, descriptions, images and item details.',
      },
      {
        title: 'Pricing Strategy',
        description: 'Review product pricing and promotions to support competitiveness.',
      },
      {
        title: 'Account Management',
        description: 'Monitor store activity, orders and everyday account operations.',
      },
    ],
    label: 'eBay',
  },

  {
    title: 'Amazon',
    slug: 'amazon',
    logoUrl: A + 'amazon-logo.png',
    themeImage: A + 'amazon-theme-image.jpg',
    image: A + 'amazon-theme-image.jpg',
    category: 'Ecommerce',
    icon: ShoppingCart,
    accent: '#DA0807',
    soft: '#E5E5E5',
    description:
      'Create a healthy, discoverable Amazon store with seller onboarding, keyword-focused listings and account care.',
    benefits: [
      {
        title: 'Seller Account Setup',
        description: 'Prepare your Amazon seller account and organize essential store details.',
      },
      {
        title: 'Keyword Research',
        description: 'Identify relevant search terms to improve product discoverability.',
      },
      {
        title: 'Listing Optimization',
        description: 'Improve product titles, bullet points, descriptions and images.',
      },
      {
        title: 'Account Health',
        description: 'Monitor account performance, policy notifications and seller metrics.',
      },
    ],
    label: 'Amazon',
  },

  {
    title: 'Walmart Marketplace',
    slug: 'walmart-marketplace',
    logoUrl: A + 'wall-mart-logo.png',
    themeImage: A + 'wall-mart-theme.jpg',
    image: A + 'wall-mart-theme.jpg',
    category: 'Ecommerce',
    icon: Store,
    accent: '#DA0807',
    soft: '#E5E5E5',
    description:
      'Reach more shoppers with marketplace onboarding, catalog organization and ongoing Walmart account support.',
    benefits: [
      {
        title: 'Seller Onboarding',
        description: 'Organize seller registration and marketplace account requirements.',
      },
      {
        title: 'Catalog Management',
        description: 'Keep product information, categories and catalog details organized.',
      },
      {
        title: 'Listing Optimization',
        description: 'Improve product titles, descriptions and listing presentation.',
      },
      {
        title: 'Performance Tracking',
        description: 'Review store performance and identify opportunities for improvement.',
      },
    ],
    label: 'Walmart Marketplace',
  },

  {
    title: 'Temu',
    slug: 'temu',
    logoUrl: A + 'temu-logo.png',
    themeImage: A + 'temu-theme.jpg',
    image: A + 'temu-theme.jpg',
    category: 'Ecommerce',
    icon: Package,
    accent: '#DA0807',
    soft: '#E5E5E5',
    description:
      'Prepare your products for Temu with structured setup, accurate product information and reliable account support.',
    benefits: [
      {
        title: 'Store Setup',
        description: 'Organize your Temu seller presence and essential store information.',
      },
      {
        title: 'Product Upload',
        description: 'Add products with accurate details, images and category information.',
      },
      {
        title: 'Product Optimization',
        description: 'Improve product presentation and listing information for shoppers.',
      },
      {
        title: 'Order Support',
        description: 'Keep order processing and account activities organized.',
      },
    ],
    label: 'Temu',
  },

  {
    title: 'Mercari',
    slug: 'mercari',
    logoUrl: A + 'mercari-logo.png',
    themeImage: A + 'mercari-theme.jpg',
    image: A + 'mercari-theme.jpg',
    category: 'Ecommerce',
    icon: Layers,
    accent: '#DA0807',
    soft: '#E5E5E5',
    description:
      'Keep your Mercari shop organized with compelling listings, thoughtful pricing and consistent operational support.',
    benefits: [
      {
        title: 'Shop Organization',
        description: 'Organize your Mercari shop and maintain accurate product information.',
      },
      {
        title: 'Product Listings',
        description: 'Create clear listings with useful descriptions and product images.',
      },
      {
        title: 'Pricing Management',
        description: 'Review product prices and adjust offers to remain competitive.',
      },
      {
        title: 'Order Handling',
        description: 'Keep orders, customer communication and shop activities organized.',
      },
    ],
    label: 'Mercari',
  },

  {
    title: 'Shopify',
    slug: 'shopify',
    logoUrl: A + 'shopify-logo.png',
    themeImage: A + 'shopify-theme.jpg',
    image: A + 'shopify-theme.jpg',
    category: 'Ecommerce',
    icon: ShoppingBag,
    accent: '#DA0807',
    soft: '#E5E5E5',
    description:
      'Launch a beautiful, conversion-focused Shopify storefront that gives your brand control of its customer experience.',
    benefits: [
      {
        title: 'Store Design',
        description: 'Create a professional storefront that reflects your brand identity.',
      },
      {
        title: 'Product Management',
        description: 'Organize products, collections, variants and store information.',
      },
      {
        title: 'App Integrations',
        description: 'Connect useful Shopify apps and tools to extend store functionality.',
      },
      {
        title: 'Conversion Optimization',
        description: 'Improve navigation, product pages and shopping experiences.',
      },
    ],
    label: 'Shopify',
  },

  {
    title: 'Daraz',
    slug: 'daraz',
    logoUrl: A + 'daraz-logo.png',
    themeImage: A + 'daraz-theme.png',
    image: A + 'daraz-theme.png',
    category: 'Ecommerce',
    icon: Globe,
    accent: '#DA0807',
    soft: '#E5E5E5',
    description:
      'Grow your South Asian marketplace presence through seller setup, product listing improvements and campaign support.',
    benefits: [
      {
        title: 'Seller Account Setup',
        description: 'Organize your Daraz seller account and marketplace requirements.',
      },
      {
        title: 'Product Listings',
        description: 'Upload products with accurate details, images and descriptions.',
      },
      {
        title: 'Campaign Management',
        description: 'Prepare products and promotions for relevant marketplace campaigns.',
      },
      {
        title: 'Order Management',
        description: 'Monitor orders, product availability and everyday store activities.',
      },
    ],
    label: 'Daraz',
  },

  // DEVELOPMENT

  {
    title: 'App Development',
    slug: 'app-development',
    logoUrl: A + 'app-development-logo.png',
    themeImage: A + 'app-development-theme.jpg',
    image: A + 'app-development-theme.jpg',
    category: 'Development',
    icon: Smartphone,
    accent: '#DA0807',
    soft: '#E5E5E5',
    description:
      'Create mobile apps designed around your customers, with thoughtful interfaces, dependable performance and room to scale.',
    benefits: [
      {
        title: 'Android & iOS Apps',
        description: 'Build mobile applications for Android and Apple devices.',
      },
      {
        title: 'UI/UX Design',
        description: 'Design intuitive interfaces and smooth user experiences.',
      },
      {
        title: 'App Functionality',
        description: 'Develop features, integrations and interactive app experiences.',
      },
      {
        title: 'Testing & Launch',
        description: 'Test app performance and prepare applications for release.',
      },
    ],
    label: 'App Development',
  },

  {
    title: 'Game Development',
    slug: 'game-development',
    logoUrl: A + 'game-development-logo.png',
    themeImage: A + 'game-development-theme.webp',
    image: A + 'game-development-theme.webp',
    category: 'Development',
    icon: Gamepad2,
    accent: '#DA0807',
    soft: '#E5E5E5',
    description:
      'Turn a game concept into a playable experience with engaging systems, polished presentation and performance-minded development.',
    benefits: [
      {
        title: 'Game Concept & Design',
        description: 'Transform creative ideas into structured game concepts and mechanics.',
      },
      {
        title: 'Gameplay Development',
        description: 'Build interactive gameplay, controls and engaging game systems.',
      },
      {
        title: 'Graphics & Animation',
        description: 'Create visual assets, animations and immersive game environments.',
      },
      {
        title: 'Testing & Updates',
        description: 'Improve gameplay quality through testing, fixes and updates.',
      },
    ],
    label: 'Game Development',
  },

  {
    title: 'Web Development',
    slug: 'web-development',
    logoUrl: A + 'web-development-logo.png',
    themeImage: A + 'web-development-theme.jpg',
    image: A + 'web-development-theme.jpg',
    category: 'Development',
    icon: Code,
    accent: '#DA0807',
    soft: '#E5E5E5',
    description:
      'Build fast, responsive websites that present your brand professionally and guide visitors toward meaningful action.',
    benefits: [
      {
        title: 'Website Development',
        description: 'Build business websites and ecommerce platforms around your goals.',
      },
      {
        title: 'Responsive Design',
        description: 'Create layouts that work smoothly across desktop, tablet and mobile.',
      },
      {
        title: 'Custom Functionality',
        description: 'Develop interactive features and integrations for your website.',
      },
      {
        title: 'Speed & Security',
        description: 'Improve website performance, reliability and security practices.',
      },
    ],
    label: 'Web Development',
  },

  {
    title: 'Graphic Design',
    slug: 'graphic-design',
    logoUrl: A + 'graphics-design-logo.jpg',
    themeImage: A + 'graphics-design-theme.jpeg',
    image: A + 'graphics-design-theme.jpeg',
    category: 'Development',
    icon: Palette,
    accent: '#DA0807',
    soft: '#E5E5E5',
    description:
      'Create a consistent visual identity with thoughtful brand assets and design that communicates clearly across channels.',
    benefits: [
      {
        title: 'Brand Graphics',
        description: 'Design visual assets that communicate your brand identity clearly.',
      },
      {
        title: 'Social Media Designs',
        description: 'Create platform-ready graphics for posts, stories and promotions.',
      },
      {
        title: 'Marketing Creatives',
        description: 'Design banners, advertisements and promotional materials.',
      },
      {
        title: 'Creative Templates',
        description: 'Build reusable design templates for consistent visual communication.',
      },
    ],
    label: 'Graphic Design',
  },

  // BRANDING & CREATIVE

  {
    title: 'Brand Identity',
    slug: 'brand-identity',
    logoUrl: A + 'brand-identity-logo.png',
    themeImage: A + 'brand-identity-theme.jpg',
    image: A + 'brand-identity-theme.jpg',
    category: 'Branding & Creative',
    icon: Palette,
    accent: '#DA0807',
    soft: '#E5E5E5',
    description:
      'Build a distinctive and consistent brand identity with professional visual direction that helps your business stand out and become recognizable.',
    benefits: [
      {
        title: 'Logo Design',
        description: 'Create a distinctive logo that represents your business identity.',
      },
      {
        title: 'Color & Typography',
        description: 'Choose consistent brand colors and typography for recognition.',
      },
      {
        title: 'Visual Identity',
        description: 'Develop supporting graphics and visual elements for your brand.',
      },
      {
        title: 'Brand Guidelines',
        description: 'Establish clear guidelines for consistent brand presentation.',
      },
    ],
    label: 'Brand Identity',
  },

  {
    title: 'Visual Content Creation',
    slug: 'visual-content-creation',
    logoUrl: A + 'visual-content-creation-logo.png',
    themeImage: A + 'visual-content-creation-theme.jpg',
    image: A + 'visual-content-creation-theme.jpg',
    category: 'Branding & Creative',
    icon: Image,
    accent: '#DA0807',
    soft: '#E5E5E5',
    description:
      'Create engaging visual content for digital platforms, campaigns and business promotions with professional and consistent creative assets.',
    benefits: [
      {
        title: 'Social Media Content',
        description: 'Create engaging graphics and visuals for social media platforms.',
      },
      {
        title: 'Promotional Designs',
        description: 'Develop creative visuals for products, offers and promotions.',
      },
      {
        title: 'Digital Campaign Assets',
        description: 'Prepare visual materials for online marketing campaigns.',
      },
      {
        title: 'Consistent Visual Style',
        description: 'Maintain a recognizable look across all digital content.',
      },
    ],
    label: 'Visual Content Creation',
  },

  // MARKETING

  {
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    logoUrl: A + 'digital-marketing-logo.png',
    themeImage: A + 'digital-marketing-theme.webp',
    image: A + 'digital-marketing-theme.webp',
    category: 'Marketing',
    icon: Megaphone,
    accent: '#DA0807',
    soft: '#E5E5E5',
    description:
      'Bring strategy, content and channel planning together to reach the right audience and support measurable business goals.',
    benefits: [
      {
        title: 'Marketing Strategy',
        description: 'Build marketing plans around your audience and business objectives.',
      },
      {
        title: 'Content Marketing',
        description: 'Develop useful content that communicates your brand message.',
      },
      {
        title: 'Channel Management',
        description: 'Coordinate digital marketing activities across relevant channels.',
      },
      {
        title: 'Performance Reporting',
        description: 'Track campaign results and identify opportunities for improvement.',
      },
    ],
    label: 'Digital Marketing',
  },

  {
    title: 'Social Media Marketing',
    slug: 'social-media-marketing',
    logoUrl: A + 'social-media-marketing-logo.jpg',
    themeImage: A + 'social-media-marketing-theme.jpg',
    image: A + 'social-media-marketing-theme.jpg',
    category: 'Marketing',
    icon: Share2,
    accent: '#DA0807',
    soft: '#E5E5E5',
    description:
      'Build a recognizable social presence with consistent content, audience engagement and channel-specific planning.',
    benefits: [
      {
        title: 'Content Planning',
        description: 'Plan relevant posts and content around your brand objectives.',
      },
      {
        title: 'Post Management',
        description: 'Organize publishing schedules and maintain consistent posting.',
      },
      {
        title: 'Audience Engagement',
        description: 'Support community interaction and meaningful audience connections.',
      },
      {
        title: 'Social Performance',
        description: 'Review engagement and platform insights to improve content strategy.',
      },
    ],
    label: 'Social Media Marketing',
  },

  {
    title: 'SEO Optimization',
    slug: 'seo-optimization',
    logoUrl: A + 'seo-optimization-logo.png',
    themeImage: A + 'seo-optimization-theme.jpg',
    image: A + 'seo-optimization-theme.jpg',
    category: 'Marketing',
    icon: Search,
    accent: '#DA0807',
    soft: '#E5E5E5',
    description:
      'Improve search visibility through technical fixes, useful content and keyword strategy for long-term organic discovery.',
    benefits: [
      {
        title: 'Technical SEO',
        description: 'Review website structure, indexing and technical search issues.',
      },
      {
        title: 'Keyword Research',
        description: 'Find relevant search terms based on your audience and services.',
      },
      {
        title: 'On-Page Optimization',
        description: 'Improve page titles, headings, content and internal links.',
      },
      {
        title: 'SEO Performance',
        description: 'Monitor search visibility and identify further optimization opportunities.',
      },
    ],
    label: 'SEO Optimization',
  },

  {
    title: 'Automation Solutions',
    slug: 'automation-solutions',
    logoUrl: A + 'automation-logo.avif',
    themeImage: A + 'automation-solution-theme.jpg',
    image: A + 'automation-solution-theme.jpg',
    category: 'Marketing',
    icon: Workflow,
    accent: '#DA0807',
    soft: '#E5E5E5',
    description:
      'Streamline marketing operations and repetitive workflows, reporting and data integrations with dependable automation solutions.',
    benefits: [
      {
        title: 'Workflow Automation',
        description: 'Automate repetitive tasks and connect everyday business processes.',
      },
      {
        title: 'Data Integration',
        description: 'Connect relevant platforms to support smoother information flow.',
      },
      {
        title: 'Automated Reporting',
        description: 'Organize data collection and recurring performance reports.',
      },
      {
        title: 'Process Monitoring',
        description: 'Review automated workflows and improve their ongoing reliability.',
      },
    ],
    label: 'Automation Solutions',
  },

  // ADS

  {
    title: 'Meta Ads',
    slug: 'meta-ads',
    logoUrl: A + 'meta-ads-logo.png',
    themeImage: A + 'meta-ads-theme.jpg',
    image: A + 'meta-ads-theme.jpg',
    category: 'Ads',
    icon: Target,
    accent: '#DA0807',
    soft: '#E5E5E5',
    description:
      'Plan and optimize Facebook and Instagram advertising with thoughtful targeting, creative testing and clear reporting.',
    benefits: [
      {
        title: 'Audience Targeting',
        description: 'Define relevant audiences based on interests and campaign goals.',
      },
      {
        title: 'Ad Creative Design',
        description: 'Prepare engaging visuals and copy for Facebook and Instagram ads.',
      },
      {
        title: 'Campaign Optimization',
        description: 'Review campaign performance and refine advertising settings.',
      },
      {
        title: 'Retargeting & Reporting',
        description: 'Reconnect with interested audiences and monitor campaign results.',
      },
    ],
    label: 'Meta Ads',
  },

  {
    title: 'Google Ads',
    slug: 'google-ads',
    logoUrl: A + 'google-ads-logo.png',
    themeImage: A + 'google-ads-theme.png',
    image: A + 'google-ads-theme.png',
    category: 'Ads',
    icon: MousePointerClick,
    accent: '#DA0807',
    soft: '#E5E5E5',
    description:
      'Reach customers when they search for your products with focused search and shopping campaigns and conversion tracking.',
    benefits: [
      {
        title: 'Search Campaigns',
        description: 'Create targeted search ads for relevant customer queries.',
      },
      {
        title: 'Keyword Strategy',
        description: 'Research search terms that align with your products and services.',
      },
      {
        title: 'Shopping Ads',
        description: 'Organize product advertising to showcase items in Google Shopping.',
      },
      {
        title: 'Conversion Tracking',
        description: 'Measure important actions and review advertising performance.',
      },
    ],
    label: 'Google Ads',
  },

  // MANAGEMENT

  {
    title: 'Web Management',
    slug: 'web-management',
    logoUrl: A + 'web-management-logo.png',
    themeImage: A + 'web-management-theme.jpg',
    image: A + 'web-management-theme.jpg',
    category: 'Management',
    icon: LayoutDashboard,
    accent: '#DA0807',
    soft: '#E5E5E5',
    description:
      'Keep your website reliable, secure and current with ongoing maintenance and practical technical support.',
    benefits: [
      {
        title: 'Website Updates',
        description: 'Manage content changes, page updates and website improvements.',
      },
      {
        title: 'Performance Monitoring',
        description: 'Review loading speed and website functionality regularly.',
      },
      {
        title: 'Security Maintenance',
        description: 'Monitor website security and maintain essential updates.',
      },
      {
        title: 'Technical Support',
        description: 'Identify website issues and coordinate practical fixes.',
      },
    ],
    label: 'Web Management',
  },

  {
    title: 'Account Management',
    slug: 'account-management',
    logoUrl: A + 'account-management-logo.png',
    themeImage: A + 'account-management-theme.jpg',
    image: A + 'account-management-theme.jpg',
    category: 'Management',
    icon: ClipboardList,
    accent: '#DA0807',
    soft: '#E5E5E5',
    description:
      'Keep marketplace and advertising accounts organized with attentive monitoring, operational support and regular reporting.',
    benefits: [
      {
        title: 'Account Monitoring',
        description: 'Keep track of account activity, status and important notifications.',
      },
      {
        title: 'Order & Operations',
        description: 'Organize order handling and everyday account operations.',
      },
      {
        title: 'Customer Support',
        description: 'Coordinate customer queries and relevant account communication.',
      },
      {
        title: 'Performance Reports',
        description: 'Review account activity and share regular performance insights.',
      },
    ],
    label: 'Account Management',
  },
];


/* =====================================================
   MAIN SERVICE CATEGORIES
   Each sub-service appears once in its parent category.
===================================================== */

export const mainServices = [
  {
    title: 'Ecommerce',
    slug: 'ecommerce',
    category: 'Ecommerce',
    accent: '#DA0807',
    description:
      'Launch, optimize and manage your stores across leading online marketplaces and ecommerce platforms.',
    image: A + 'ecommerce-theme.jpeg',
    themeImage: A + 'ecommerce-theme.jpeg',
    logoUrl: A + 'ecommerce-logo.png',
    children: [
      'tiktok-shop',
      'ebay',
      'amazon',
      'walmart-marketplace',
      'temu',
      'mercari',
      'shopify',
      'daraz',
    ],
  },

  {
    title: 'Marketing',
    slug: 'marketing',
    category: 'Marketing',
    accent: '#DA0807',
    description:
      'Create a consistent marketing engine that builds awareness, attracts the right audience and supports sustainable growth.',
    image: A + 'marketing-theme-image.jpeg',
    themeImage: A + 'marketing-theme-image.jpeg',
    logoUrl: A + 'marketing-logo.png',
    children: [
      'digital-marketing',
      'social-media-marketing',
      'seo-optimization',
      'automation-solutions',
    ],
  },

  {
    title: 'Development',
    slug: 'development',
    category: 'Development',
    accent: '#DA0807',
    description:
      'Build the digital products your business needs, from high-performing websites and apps to games and creative assets.',
    image: A + 'development-theme-image.jpeg',
    themeImage: A + 'development-theme-image.jpeg',
    logoUrl: A + 'development-logo.png',
    children: [
      'app-development',
      'game-development',
      'web-development',
      'graphic-design',
    ],
  },

  {
    title: 'Branding & Creative',
    slug: 'branding-and-creative',
    category: 'Branding & Creative',
    accent: '#DA0807',
    description:
      'Brand identity and visual content creation.',
    image: A + 'branding-and-creativity-theme.jpeg',
    themeImage: A + 'branding-and-creativity-theme.jpeg',
    children: [
      'brand-identity',
      'visual-content-creation',
    ],
  },

  {
    title: 'Ads',
    slug: 'ads',
    category: 'Ads',
    accent: '#DA0807',
    description:
      'Run focused, measurable paid campaigns across search and social platforms with ongoing optimization.',
    image: A + 'ads-theme-image.jpeg',
    themeImage: A + 'ads-theme-image.jpeg',
    children: [
      'meta-ads',
      'google-ads',
    ],
  },

  {
    title: 'Management',
    slug: 'management',
    category: 'Management',
    accent: '#DA0807',
    description:
      'Keep websites, stores and business accounts organized, maintained and moving forward with reliable ongoing support.',
    image: A + 'management-theme-image.jpeg',
    themeImage: A + 'management-theme-image.jpeg',
    children: [
      'web-management',
      'account-management',
    ],
  },
];


/* =====================================================
   ROUTE HELPERS
===================================================== */

// Individual service URL.
export const servicePath = (service) =>
  `/services/${service.slug}`;

// Main service category URL.
export const mainServicePath = (service) =>
  `/services/${service.slug}`;

// Find a main service using its slug.
export const getMainService = (slug) =>
  mainServices.find((item) => item.slug === slug);

// Find an individual service using its slug.
export const getService = (slug) =>
  services.find((item) => item.slug === slug);

// Get the direct sub-services of a main category.
export const getMainServiceChildren = (group) =>
  group?.children
    ?.map((slug) => getService(slug))
    .filter(Boolean) || [];