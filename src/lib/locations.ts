// Chennai & Tamil Nadu Local SEO Configuration
// Business address and service area data for local search optimization

export const businessInfo = {
  name: 'Astute Computer',
  address: {
    street: '130 MTH Road, I Floor, Lucky Towers',
    landmark: 'Opp. Ambattur Estate Bus Stand',
    area: 'Padi',
    city: 'Chennai',
    state: 'Tamil Nadu',
    postalCode: '600058',
    country: 'India',
    countryCode: 'IN',
  },
  geo: {
    latitude: 13.0527,
    longitude: 80.1831,
  },
  phone: '+91-8667331224',
  email: 'astutecomputer.contact@gmail.com',
  url: 'https://astutecomputer.com',
  openingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
};

export const getFormattedAddress = () => {
  const { street, landmark, area, city, state, postalCode } = businessInfo.address;
  return `${street}, (${landmark}), ${area}, ${city}, ${state} ${postalCode}`;
};

export const getShortAddress = () => {
  const { area, city, state, postalCode } = businessInfo.address;
  return `${area}, ${city}, ${state} ${postalCode}`;
};

// Service definitions for location pages
export const localServices = [
  {
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    shortDescription: 'Bespoke software solutions tailored to your business needs',
    icon: 'Code',
  },
  {
    slug: 'ai-automation',
    title: 'AI Automation',
    shortDescription: 'Intelligent automation powered by artificial intelligence',
    icon: 'Bot',
  },
  {
    slug: 'document-digitization',
    title: 'Document Digitization',
    shortDescription: 'Transform paper records into searchable digital archives',
    icon: 'FileText',
  },
  {
    slug: 'digital-transformation',
    title: 'Digital Transformation',
    shortDescription: 'End-to-end digitalization of business operations',
    icon: 'Layers',
  },
];

// Chennai city hub page data
export const chennaiPage = {
  slug: 'chennai',
  name: 'Chennai',
  metaTitle: 'Software Development & Digital Transformation in Chennai | Astute Computer',
  metaDescription: 'Astute Computer provides custom software development, AI automation, and digital transformation services in Chennai. Visit our Padi office or call +91-8667331224.',
  heroTitle: 'Digital Transformation & Software Solutions in Chennai',
  heroSubtitle: 'Your Chennai-based partner for custom software, AI automation, and business digitalization',
  intro: `Chennai is rapidly emerging as India's technology hub, with businesses across healthcare, manufacturing, legal, and retail sectors embracing digital transformation. At Astute Computer, we've been serving Chennai businesses from our Padi office, helping local enterprises modernize operations, digitize records, and leverage AI for competitive advantage.

Whether you're a growing SMB in Anna Nagar, a manufacturing unit in Ambattur, or a healthcare provider in Velachery, our team delivers tailored solutions with the responsiveness and understanding that only a local partner can provide. We combine global technology expertise with deep knowledge of Chennai's business landscape.`,
  whyChennai: [
    {
      title: 'Local Presence',
      description: 'Visit our Padi office for face-to-face consultations. We understand Chennai business culture.',
    },
    {
      title: 'Same-Day Response',
      description: 'As a Chennai-based company, we provide rapid support and quick turnaround times.',
    },
    {
      title: 'Industry Experience',
      description: 'We serve Chennai\'s key sectors: healthcare, legal, manufacturing, retail, and education.',
    },
    {
      title: 'On-Site Support',
      description: 'Available for on-site consultations and implementation across Chennai and Tamil Nadu.',
    },
  ],
  faqs: [
    {
      question: 'Where is Astute Computer located in Chennai?',
      answer: 'Our office is located at 130 MTH Road, I Floor, Lucky Towers, opposite Ambattur Estate Bus Stand, Padi, Chennai 600058. We serve all areas across Chennai and Tamil Nadu.',
    },
    {
      question: 'Do you provide on-site services in Chennai?',
      answer: 'Yes, we offer on-site consultations, implementation support, and training for businesses across Chennai. Contact us to schedule a visit.',
    },
    {
      question: 'Which industries do you serve in Chennai?',
      answer: 'We work with healthcare providers, legal firms, manufacturing units, retail businesses, educational institutions, and financial services across Chennai and Tamil Nadu.',
    },
    {
      question: 'How quickly can you start a project in Chennai?',
      answer: 'Being a local Chennai company, we can typically begin discovery and planning within a week of initial contact. Contact us to discuss your timeline.',
    },
    {
      question: 'Do you work with small businesses in Chennai?',
      answer: 'Absolutely. We serve businesses of all sizes, from small shops looking to digitize operations to large enterprises needing custom software solutions.',
    },
    {
      question: 'What is your pricing for Chennai clients?',
      answer: 'Our pricing is competitive and transparent. Contact us for a free consultation and customized quote based on your specific requirements.',
    },
  ],
};

// Neighborhood pages data with unique content
export interface Neighborhood {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  intro: string;
  distanceFromOffice: string;
  typicalClients: string[];
  nearbyLandmarks: string[];
  whyChooseUs: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  relatedAreas: string[];
}

export const neighborhoods: Neighborhood[] = [
  {
    slug: 'anna-nagar',
    name: 'Anna Nagar',
    metaTitle: 'Software Development in Anna Nagar, Chennai | Astute Computer',
    metaDescription: 'Looking for software development in Anna Nagar? Astute Computer serves businesses in Anna Nagar with AI automation, document digitization, and custom software solutions.',
    heroTitle: 'Software Solutions in Anna Nagar, Chennai',
    heroSubtitle: 'Custom software development and digital transformation for Anna Nagar businesses',
    intro: 'Anna Nagar is one of Chennai\'s most prestigious residential and commercial areas, home to thriving retail businesses, healthcare clinics, educational institutions, and professional services. The area\'s businesses increasingly require modern digital solutions to serve their discerning clientele.',
    distanceFromOffice: '15 minutes',
    typicalClients: ['Retail showrooms', 'Healthcare clinics', 'Educational institutions', 'Professional services'],
    nearbyLandmarks: ['Anna Nagar Tower', 'VR Chennai Mall', 'Shanti Colonies'],
    whyChooseUs: [
      {
        title: 'Proximity',
        description: 'Just 15 minutes from our Padi office for quick consultations and support.',
      },
      {
        title: 'Retail Expertise',
        description: 'Experience with Anna Nagar\'s retail and healthcare sectors.',
      },
      {
        title: 'On-Site Support',
        description: 'Available for in-person meetings and implementation support.',
      },
    ],
    faqs: [
      {
        question: 'Do you provide software services in Anna Nagar?',
        answer: 'Yes, we serve businesses across Anna Nagar. Our Padi office is just 15 minutes away, making it convenient for consultations and support.',
      },
      {
        question: 'What types of businesses do you work with in Anna Nagar?',
        answer: 'We work with retail showrooms, healthcare clinics, educational institutions, and professional service firms in Anna Nagar.',
      },
      {
        question: 'Can you visit our Anna Nagar office for consultations?',
        answer: 'Absolutely. We provide on-site consultations for businesses in Anna Nagar. Contact us to schedule a visit.',
      },
    ],
    relatedAreas: ['ambattur', 'mogappair', 'kilpauk'],
  },
  {
    slug: 'ambattur',
    name: 'Ambattur',
    metaTitle: 'IT Solutions in Ambattur, Chennai | Astute Computer',
    metaDescription: 'IT solutions and software development in Ambattur. Astute Computer is located near Ambattur Estate, offering AI automation and digital transformation services.',
    heroTitle: 'IT Solutions in Ambattur, Chennai',
    heroSubtitle: 'Software development and automation for Ambattur\'s industrial and commercial sectors',
    intro: 'Ambattur is Chennai\'s industrial powerhouse, housing the Ambattur Industrial Estate and thousands of manufacturing and IT companies. Our office is located right opposite the Ambattur Estate Bus Stand, making us the most accessible technology partner for local businesses.',
    distanceFromOffice: '2 minutes',
    typicalClients: ['Manufacturing units', 'Industrial suppliers', 'IT companies', 'Logistics providers'],
    nearbyLandmarks: ['Ambattur Industrial Estate', 'Ambattur OT', 'Padi Junction'],
    whyChooseUs: [
      {
        title: 'Right Next Door',
        description: 'Our office is opposite Ambattur Estate Bus Stand - we\'re your neighbors.',
      },
      {
        title: 'Manufacturing Focus',
        description: 'Deep experience with Ambattur\'s manufacturing sector digitalization.',
      },
      {
        title: 'Immediate Support',
        description: 'Fastest response times in Chennai due to proximity.',
      },
    ],
    faqs: [
      {
        question: 'Where exactly is your office in relation to Ambattur?',
        answer: 'We\'re located at 130 MTH Road, Padi, directly opposite the Ambattur Estate Bus Stand. It\'s a 2-minute walk from Ambattur Industrial Estate.',
      },
      {
        question: 'Do you specialize in manufacturing software?',
        answer: 'Yes, we have extensive experience with manufacturing companies in Ambattur, including inventory management, production tracking, and quality control systems.',
      },
      {
        question: 'Can we visit your office from Ambattur Industrial Estate?',
        answer: 'Definitely! We welcome walk-in consultations. Our office is just across the road from the Ambattur Estate Bus Stand.',
      },
    ],
    relatedAreas: ['anna-nagar', 'avadi', 'mogappair'],
  },
  {
    slug: 'velachery',
    name: 'Velachery',
    metaTitle: 'Software Development in Velachery, Chennai | Astute Computer',
    metaDescription: 'Custom software and AI automation services in Velachery. Astute Computer serves businesses near Phoenix MarketCity with digital transformation solutions.',
    heroTitle: 'Digital Solutions in Velachery, Chennai',
    heroSubtitle: 'Software development and business automation for Velachery\'s growing commercial hub',
    intro: 'Velachery has transformed into a major commercial and IT hub in South Chennai, with Phoenix MarketCity and numerous IT parks driving business growth. The area\'s modern enterprises need cutting-edge digital solutions to maintain their competitive edge.',
    distanceFromOffice: '45 minutes',
    typicalClients: ['IT companies', 'Retail chains', 'Real estate developers', 'Startups'],
    nearbyLandmarks: ['Phoenix MarketCity', 'Velachery MRTS', 'Taramani IT Park'],
    whyChooseUs: [
      {
        title: 'Tech Understanding',
        description: 'We understand the expectations of Velachery\'s tech-savvy business community.',
      },
      {
        title: 'Startup Experience',
        description: 'Track record of working with Velachery startups and IT companies.',
      },
      {
        title: 'Remote Collaboration',
        description: 'Efficient remote delivery for South Chennai clients.',
      },
    ],
    faqs: [
      {
        question: 'Do you serve clients in Velachery?',
        answer: 'Yes, we work with many businesses in Velachery and South Chennai. While our office is in Padi, we provide efficient remote services and scheduled on-site visits.',
      },
      {
        question: 'What industries do you work with near Velachery?',
        answer: 'We serve IT companies, retail businesses, real estate developers, and startups in the Velachery, Taramani, and OMR corridors.',
      },
      {
        question: 'How do you handle projects for Velachery clients?',
        answer: 'We combine remote collaboration with scheduled on-site visits for key milestones. Many clients prefer our efficient digital-first approach.',
      },
    ],
    relatedAreas: ['t-nagar', 'adyar', 'guindy'],
  },
  {
    slug: 't-nagar',
    name: 'T. Nagar',
    metaTitle: 'Business Software Solutions in T. Nagar, Chennai | Astute Computer',
    metaDescription: 'Business software and digital solutions for T. Nagar enterprises. Astute Computer helps Chennai\'s retail hub with inventory, billing, and automation systems.',
    heroTitle: 'Business Solutions in T. Nagar, Chennai',
    heroSubtitle: 'Retail software and digitalization for Chennai\'s busiest commercial district',
    intro: 'T. Nagar (Thyagaraya Nagar) is Chennai\'s retail capital, with Ranganathan Street and Usman Road hosting thousands of shops, textile showrooms, and jewelry stores. The competitive retail environment demands efficient inventory management, billing systems, and customer engagement solutions.',
    distanceFromOffice: '30 minutes',
    typicalClients: ['Textile showrooms', 'Jewelry stores', 'Retail chains', 'Wholesale traders'],
    nearbyLandmarks: ['Ranganathan Street', 'Pondy Bazaar', 'T. Nagar Bus Terminus'],
    whyChooseUs: [
      {
        title: 'Retail Expertise',
        description: 'Specialized in retail software, POS systems, and inventory management.',
      },
      {
        title: 'High-Volume Ready',
        description: 'Solutions designed for T. Nagar\'s high-traffic retail environment.',
      },
      {
        title: 'Quick Implementation',
        description: 'Minimal disruption to your busy retail operations during setup.',
      },
    ],
    faqs: [
      {
        question: 'Do you develop retail software for T. Nagar shops?',
        answer: 'Yes, we specialize in retail solutions including POS systems, inventory management, billing software, and customer loyalty programs designed for T. Nagar\'s retail businesses.',
      },
      {
        question: 'Can you help digitize our textile showroom records?',
        answer: 'Absolutely. We provide document digitization and inventory management systems specifically designed for textile and jewelry showrooms.',
      },
      {
        question: 'How quickly can you implement a billing system?',
        answer: 'We understand retail urgency. Most billing and POS systems can be implemented within 2-3 weeks with minimal disruption to your operations.',
      },
    ],
    relatedAreas: ['velachery', 'adyar', 'guindy'],
  },
  {
    slug: 'adyar',
    name: 'Adyar',
    metaTitle: 'IT Services in Adyar, Chennai | Astute Computer',
    metaDescription: 'IT services and software development in Adyar. Astute Computer serves educational institutions, healthcare providers, and businesses near IIT Madras.',
    heroTitle: 'IT Services in Adyar, Chennai',
    heroSubtitle: 'Technology solutions for Adyar\'s educational and professional community',
    intro: 'Adyar is home to prestigious institutions like IIT Madras, Theosophical Society, and numerous research organizations. The area\'s educational, healthcare, and professional services require sophisticated technology solutions that match their intellectual standards.',
    distanceFromOffice: '40 minutes',
    typicalClients: ['Educational institutions', 'Research organizations', 'Healthcare providers', 'Professional firms'],
    nearbyLandmarks: ['IIT Madras', 'Theosophical Society', 'Adyar Cancer Institute'],
    whyChooseUs: [
      {
        title: 'Academic Understanding',
        description: 'Experience with educational institutions and research organizations.',
      },
      {
        title: 'Healthcare Expertise',
        description: 'HIPAA-aware solutions for healthcare providers in Adyar.',
      },
      {
        title: 'Data Security Focus',
        description: 'Emphasis on security for sensitive educational and medical data.',
      },
    ],
    faqs: [
      {
        question: 'Do you work with educational institutions in Adyar?',
        answer: 'Yes, we serve schools, colleges, and research organizations with learning management systems, student information systems, and research data management tools.',
      },
      {
        question: 'Can you help healthcare providers near Adyar?',
        answer: 'Absolutely. We provide EMR systems, patient management software, and document digitization services with a focus on healthcare data security.',
      },
      {
        question: 'What security measures do you implement?',
        answer: 'We follow industry best practices for data security, including encryption, access controls, and compliance with healthcare and educational data protection standards.',
      },
    ],
    relatedAreas: ['velachery', 't-nagar', 'guindy'],
  },
  {
    slug: 'guindy',
    name: 'Guindy',
    metaTitle: 'Software Development in Guindy, Chennai | Astute Computer',
    metaDescription: 'Software development and IT automation in Guindy. Astute Computer serves businesses in Guindy Industrial Estate and IT corridor with custom solutions.',
    heroTitle: 'Software Development in Guindy, Chennai',
    heroSubtitle: 'Custom software and automation for Guindy\'s industrial and IT sectors',
    intro: 'Guindy is a major industrial and IT hub, home to Guindy Industrial Estate, numerous IT parks, and the Chennai Trade Centre. The area\'s diverse business landscape—from traditional manufacturing to modern IT—demands versatile technology partners.',
    distanceFromOffice: '35 minutes',
    typicalClients: ['Manufacturing companies', 'IT firms', 'Engineering companies', 'Trade businesses'],
    nearbyLandmarks: ['Guindy Industrial Estate', 'Chennai Trade Centre', 'Guindy Metro'],
    whyChooseUs: [
      {
        title: 'Industrial Experience',
        description: 'Extensive work with Guindy\'s manufacturing and engineering sectors.',
      },
      {
        title: 'IT Integration',
        description: 'Experience integrating legacy systems with modern cloud solutions.',
      },
      {
        title: 'Scalable Solutions',
        description: 'Systems designed to grow with your business.',
      },
    ],
    faqs: [
      {
        question: 'Do you serve manufacturing companies in Guindy?',
        answer: 'Yes, we have extensive experience with Guindy Industrial Estate companies, providing production management, inventory tracking, and quality control systems.',
      },
      {
        question: 'Can you integrate with our existing factory systems?',
        answer: 'Absolutely. We specialize in integrating modern software with existing manufacturing systems, ERP platforms, and legacy databases.',
      },
      {
        question: 'What automation solutions do you offer for Guindy businesses?',
        answer: 'We provide workflow automation, document processing, quality inspection automation, and AI-powered analytics for manufacturing and IT operations.',
      },
    ],
    relatedAreas: ['velachery', 'adyar', 't-nagar'],
  },
  {
    slug: 'porur',
    name: 'Porur',
    metaTitle: 'IT Solutions in Porur, Chennai | Astute Computer',
    metaDescription: 'IT solutions and software services in Porur. Astute Computer serves businesses along Porur-OMR with custom software and digital transformation.',
    heroTitle: 'IT Solutions in Porur, Chennai',
    heroSubtitle: 'Software development and digitalization for Porur\'s growing business district',
    intro: 'Porur has emerged as a significant IT and commercial hub in West Chennai, with excellent connectivity to major tech parks and business centers. The area\'s mix of IT companies, healthcare facilities, and educational institutions creates demand for diverse technology solutions.',
    distanceFromOffice: '25 minutes',
    typicalClients: ['IT companies', 'Healthcare facilities', 'Educational centers', 'Commercial offices'],
    nearbyLandmarks: ['Porur Lake', 'Ramachandra Hospital', 'Mount-Poonamallee Road'],
    whyChooseUs: [
      {
        title: 'Quick Access',
        description: 'Just 25 minutes from our Padi office for prompt support.',
      },
      {
        title: 'Healthcare Focus',
        description: 'Experience with Porur\'s major healthcare institutions.',
      },
      {
        title: 'IT Corridor Knowledge',
        description: 'Understanding of West Chennai\'s IT landscape.',
      },
    ],
    faqs: [
      {
        question: 'Do you provide services in Porur?',
        answer: 'Yes, Porur is within easy reach from our Padi office. We serve IT companies, healthcare facilities, and businesses throughout West Chennai.',
      },
      {
        question: 'Can you help hospitals near Porur with digitization?',
        answer: 'Absolutely. We provide medical records digitization, patient management systems, and healthcare automation solutions with proper data security measures.',
      },
      {
        question: 'What is your response time for Porur clients?',
        answer: 'Being just 25 minutes away, we can provide same-day on-site support for urgent requirements. Regular support is available remotely as well.',
      },
    ],
    relatedAreas: ['ambattur', 'anna-nagar', 'guindy'],
  },
  {
    slug: 'tambaram',
    name: 'Tambaram',
    metaTitle: 'Software Services in Tambaram, Chennai | Astute Computer',
    metaDescription: 'Software development and IT services in Tambaram. Astute Computer serves businesses in Tambaram, Chromepet, and South Chennai with digital solutions.',
    heroTitle: 'Software Services in Tambaram, Chennai',
    heroSubtitle: 'Digital transformation and software solutions for South Chennai businesses',
    intro: 'Tambaram is a major commercial and residential hub in South Chennai, with a thriving business community spanning retail, education, healthcare, and services. The area\'s businesses benefit from both urban accessibility and competitive operating costs.',
    distanceFromOffice: '50 minutes',
    typicalClients: ['Small businesses', 'Educational institutions', 'Healthcare clinics', 'Service providers'],
    nearbyLandmarks: ['Tambaram Railway Station', 'Madras Christian College', 'Chromepet'],
    whyChooseUs: [
      {
        title: 'SMB Focus',
        description: 'Solutions designed for Tambaram\'s growing small and medium businesses.',
      },
      {
        title: 'Affordable Options',
        description: 'Cost-effective packages suited to South Chennai businesses.',
      },
      {
        title: 'Remote Efficiency',
        description: 'Efficient remote delivery with scheduled on-site visits.',
      },
    ],
    faqs: [
      {
        question: 'Do you serve clients in Tambaram?',
        answer: 'Yes, we work with businesses across Tambaram, Chromepet, and surrounding areas. We combine remote services with scheduled on-site visits for optimal efficiency.',
      },
      {
        question: 'Are your solutions affordable for small businesses?',
        answer: 'We offer flexible pricing and packages designed for small and medium businesses. Contact us for a customized quote based on your specific needs.',
      },
      {
        question: 'How do you handle support for Tambaram clients?',
        answer: 'We provide remote support for most issues and schedule regular on-site visits for hands-on requirements. Emergency support is available when needed.',
      },
    ],
    relatedAreas: ['velachery', 'guindy', 'adyar'],
  },
];

// Get neighborhood by slug
export const getNeighborhoodBySlug = (slug: string): Neighborhood | undefined => {
  return neighborhoods.find((n) => n.slug === slug);
};

// Get all neighborhood slugs for routing
export const getAllNeighborhoodSlugs = (): string[] => {
  return neighborhoods.map((n) => n.slug);
};

// Generate LocalBusiness schema for location pages
export const generateLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://astutecomputer.com/#business',
  name: businessInfo.name,
  image: 'https://astutecomputer.com/og-image.png',
  url: businessInfo.url,
  telephone: businessInfo.phone,
  email: businessInfo.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: businessInfo.address.street,
    addressLocality: businessInfo.address.city,
    addressRegion: businessInfo.address.state,
    postalCode: businessInfo.address.postalCode,
    addressCountry: businessInfo.address.countryCode,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: businessInfo.geo.latitude,
    longitude: businessInfo.geo.longitude,
  },
  areaServed: [
    { '@type': 'City', name: 'Chennai' },
    { '@type': 'State', name: 'Tamil Nadu' },
    ...neighborhoods.map((n) => ({ '@type': 'Place', name: `${n.name}, Chennai` })),
  ],
  priceRange: '$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: businessInfo.openingHours.days,
    opens: businessInfo.openingHours.opens,
    closes: businessInfo.openingHours.closes,
  },
});

// Generate FAQPage schema
export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});
