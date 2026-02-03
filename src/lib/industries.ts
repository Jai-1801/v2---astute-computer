import { 
  Stethoscope, 
  Scale, 
  Factory, 
  TrendingUp, 
  ShoppingCart, 
  GraduationCap,
  LucideIcon 
} from 'lucide-react';

export interface IndustryProblem {
  title: string;
  description: string;
  impact: string;
}

export interface IndustrySolution {
  title: string;
  description: string;
  features: string[];
}

export interface IndustryStat {
  value: string;
  label: string;
  suffix?: string;
}

export interface Industry {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  heroDescription: string;
  problems: IndustryProblem[];
  solutions: IndustrySolution[];
  stats: IndustryStat[];
  metaTitle: string;
  metaDescription: string;
}

export const industries: Industry[] = [
  {
    slug: 'healthcare',
    title: 'Healthcare',
    tagline: 'Modernizing Patient Care',
    description: 'Digital transformation solutions for healthcare providers, clinics, and medical institutions.',
    icon: Stethoscope,
    heroDescription: 'We help healthcare organizations transition from legacy systems to modern, compliant digital platforms that improve patient outcomes and operational efficiency.',
    problems: [
      {
        title: 'Legacy Systems',
        description: 'Outdated EHR systems with poor interoperability and limited functionality.',
        impact: '40% of staff time wasted on manual data entry'
      },
      {
        title: 'Compliance Burden',
        description: 'Complex HIPAA requirements making digital adoption risky and slow.',
        impact: '$2M average cost of compliance violations'
      },
      {
        title: 'Data Fragmentation',
        description: 'Patient records scattered across departments with no unified view.',
        impact: '23% of diagnoses delayed due to missing records'
      },
      {
        title: 'Security Vulnerabilities',
        description: 'Healthcare is the #1 target for cyberattacks with outdated security.',
        impact: '89% increase in healthcare breaches since 2020'
      }
    ],
    solutions: [
      {
        title: 'Unified Patient Portals',
        description: 'Centralized platforms that connect all patient data with role-based access.',
        features: ['Real-time data sync', 'Mobile-first design', 'HIPAA compliant', 'AI-assisted insights']
      },
      {
        title: 'Document Digitization',
        description: 'AI-powered scanning and indexing of paper records with OCR technology.',
        features: ['99.9% accuracy', 'Automated categorization', 'Searchable archives', 'Audit trails']
      },
      {
        title: 'Telemedicine Platforms',
        description: 'Secure video consultation systems integrated with scheduling and billing.',
        features: ['HD video calls', 'E-prescriptions', 'Payment integration', 'Multi-device support']
      }
    ],
    stats: [
      { value: '60', label: 'Reduction in admin time', suffix: '%' },
      { value: '99.9', label: 'System uptime', suffix: '%' },
      { value: '3x', label: 'Faster patient onboarding', suffix: '' },
      { value: '0', label: 'Compliance violations', suffix: '' }
    ],
    metaTitle: 'Healthcare Digital Transformation | Astute Computer',
    metaDescription: 'Modernize your healthcare operations with HIPAA-compliant patient portals, document digitization, and telemedicine platforms. Reduce admin time by 60%.'
  },
  {
    slug: 'legal',
    title: 'Legal',
    tagline: 'Streamlining Legal Operations',
    description: 'Intelligent document management and workflow automation for law firms and legal departments.',
    icon: Scale,
    heroDescription: 'We transform how legal professionals work by digitizing case management, automating document workflows, and enabling instant semantic search across your entire case history.',
    problems: [
      {
        title: 'Document Chaos',
        description: 'Hours wasted searching through thousands of case files and precedents.',
        impact: '6.5 hours per week per attorney on document search'
      },
      {
        title: 'Version Control',
        description: 'Multiple versions of contracts leading to errors and liability.',
        impact: '21% of malpractice claims from document errors'
      },
      {
        title: 'Security Risks',
        description: 'Sensitive client data vulnerable to breaches and unauthorized access.',
        impact: 'Average breach cost $4.4M for law firms'
      },
      {
        title: 'Billable Inefficiency',
        description: 'Manual time tracking and billing processes losing revenue.',
        impact: '30% of billable hours never captured'
      }
    ],
    solutions: [
      {
        title: 'Intelligent Archives',
        description: 'AI-powered document management with semantic search capabilities.',
        features: ['Natural language search', 'Auto-categorization', 'Citation linking', 'OCR processing']
      },
      {
        title: 'Contract Automation',
        description: 'Template-based contract generation with clause libraries and approval workflows.',
        features: ['Version tracking', 'E-signatures', 'Compliance checks', 'Deadline alerts']
      },
      {
        title: 'Case Management',
        description: 'End-to-end platforms connecting documents, time tracking, and billing.',
        features: ['Client portals', 'Task automation', 'Court deadline sync', 'Analytics dashboards']
      }
    ],
    stats: [
      { value: '75', label: 'Faster document retrieval', suffix: '%' },
      { value: '40', label: 'More billable hours captured', suffix: '%' },
      { value: '90', label: 'Reduction in document errors', suffix: '%' },
      { value: '5x', label: 'ROI within first year', suffix: '' }
    ],
    metaTitle: 'Legal Technology Solutions | Astute Computer',
    metaDescription: 'Transform your law firm with intelligent document archives, contract automation, and case management systems. Capture 40% more billable hours.'
  },
  {
    slug: 'manufacturing',
    title: 'Manufacturing',
    tagline: 'Industry 4.0 Ready',
    description: 'End-to-end digitalization of manufacturing operations, from shop floor to supply chain.',
    icon: Factory,
    heroDescription: 'We help manufacturers embrace Industry 4.0 with IoT-connected operations, real-time production dashboards, and predictive maintenance systems.',
    problems: [
      {
        title: 'Visibility Gaps',
        description: 'No real-time view of production status, inventory, or equipment health.',
        impact: '15% of production capacity lost to unplanned downtime'
      },
      {
        title: 'Manual Tracking',
        description: 'Excel spreadsheets and paper forms creating data silos and delays.',
        impact: '8 hours weekly per manager on report generation'
      },
      {
        title: 'Supply Chain Blind Spots',
        description: 'Disconnected suppliers and logistics causing stockouts and delays.',
        impact: '$184K average cost of supply chain disruptions'
      },
      {
        title: 'Quality Control',
        description: 'Reactive quality processes catching defects too late in production.',
        impact: '5% of revenue lost to quality issues'
      }
    ],
    solutions: [
      {
        title: 'Production Dashboards',
        description: 'Real-time visibility into every aspect of your manufacturing operations.',
        features: ['OEE tracking', 'Live machine status', 'Shift comparisons', 'Alert systems']
      },
      {
        title: 'Predictive Maintenance',
        description: 'IoT sensors and AI models predicting equipment failures before they happen.',
        features: ['Vibration analysis', 'Temperature monitoring', 'Failure prediction', 'Work order automation']
      },
      {
        title: 'Supply Chain Integration',
        description: 'Connected platforms linking suppliers, inventory, and logistics in real-time.',
        features: ['Supplier portals', 'Demand forecasting', 'Auto-reordering', 'Delivery tracking']
      }
    ],
    stats: [
      { value: '35', label: 'Reduction in downtime', suffix: '%' },
      { value: '20', label: 'Inventory cost savings', suffix: '%' },
      { value: '99', label: 'On-time delivery rate', suffix: '%' },
      { value: '3x', label: 'Faster report generation', suffix: '' }
    ],
    metaTitle: 'Manufacturing Digital Solutions | Astute Computer',
    metaDescription: 'Embrace Industry 4.0 with real-time production dashboards, predictive maintenance, and supply chain integration. Reduce downtime by 35%.'
  },
  {
    slug: 'finance',
    title: 'Finance',
    tagline: 'Smarter Financial Operations',
    description: 'Automated compliance, real-time analytics, and secure data management for financial institutions.',
    icon: TrendingUp,
    heroDescription: 'We help financial institutions modernize operations with automated compliance workflows, real-time risk analytics, and secure client portals.',
    problems: [
      {
        title: 'Reporting Delays',
        description: 'Days or weeks to generate critical financial reports and analytics.',
        impact: 'Average 5-day delay in monthly close'
      },
      {
        title: 'Compliance Complexity',
        description: 'Ever-changing regulations requiring constant manual monitoring.',
        impact: '$14.3M average cost of non-compliance'
      },
      {
        title: 'Data Silos',
        description: 'Financial data scattered across systems with no unified view.',
        impact: '60% of analyst time on data gathering'
      },
      {
        title: 'Manual Reconciliation',
        description: 'Hours spent matching transactions and identifying discrepancies.',
        impact: '2-3% error rate in manual reconciliation'
      }
    ],
    solutions: [
      {
        title: 'Automated Reporting',
        description: 'Real-time financial dashboards with automated report generation.',
        features: ['One-click reports', 'Drill-down analytics', 'Variance alerts', 'Board-ready formats']
      },
      {
        title: 'Compliance Automation',
        description: 'Regulatory monitoring and automated compliance workflows.',
        features: ['Regulation tracking', 'Audit trails', 'Risk scoring', 'Automated filings']
      },
      {
        title: 'Data Integration',
        description: 'Unified platforms connecting all financial systems and data sources.',
        features: ['API integrations', 'Real-time sync', 'Data validation', 'Single source of truth']
      }
    ],
    stats: [
      { value: '80', label: 'Faster month-end close', suffix: '%' },
      { value: '95', label: 'Automated reconciliation', suffix: '%' },
      { value: '100', label: 'Compliance audit pass rate', suffix: '%' },
      { value: '10x', label: 'Faster report generation', suffix: '' }
    ],
    metaTitle: 'Financial Services Technology | Astute Computer',
    metaDescription: 'Modernize financial operations with automated compliance, real-time analytics, and data integration. Achieve 80% faster month-end close.'
  },
  {
    slug: 'retail',
    title: 'Retail',
    tagline: 'Unified Commerce Excellence',
    description: 'Omnichannel platforms, inventory optimization, and customer experience solutions for retailers.',
    icon: ShoppingCart,
    heroDescription: 'We help retailers create seamless shopping experiences across all channels with unified inventory, predictive analytics, and personalized customer engagement.',
    problems: [
      {
        title: 'Channel Disconnect',
        description: 'Separate systems for online and offline creating inconsistent experiences.',
        impact: '73% of customers use multiple channels'
      },
      {
        title: 'Inventory Mismatches',
        description: 'Stock levels out of sync between warehouse, stores, and e-commerce.',
        impact: '$1.1T in lost sales from stockouts globally'
      },
      {
        title: 'Poor Personalization',
        description: 'Generic marketing failing to connect with customer preferences.',
        impact: '80% of consumers want personalized experiences'
      },
      {
        title: 'Slow Fulfillment',
        description: 'Complex order routing causing delays and high shipping costs.',
        impact: 'Average 3.5 days for order fulfillment'
      }
    ],
    solutions: [
      {
        title: 'Unified Commerce Platform',
        description: 'Single platform connecting all sales channels with consistent pricing and inventory.',
        features: ['Real-time inventory', 'Unified cart', 'Cross-channel returns', 'Consistent pricing']
      },
      {
        title: 'Predictive Inventory',
        description: 'AI-powered demand forecasting and automated replenishment.',
        features: ['Demand prediction', 'Auto-reorder', 'Seasonal planning', 'Dead stock alerts']
      },
      {
        title: 'Customer Intelligence',
        description: 'Unified customer profiles enabling personalized experiences.',
        features: ['360° customer view', 'Behavior tracking', 'Personalized offers', 'Loyalty integration']
      }
    ],
    stats: [
      { value: '45', label: 'Increase in online sales', suffix: '%' },
      { value: '30', label: 'Reduction in stockouts', suffix: '%' },
      { value: '2x', label: 'Customer lifetime value', suffix: '' },
      { value: '25', label: 'Lower fulfillment costs', suffix: '%' }
    ],
    metaTitle: 'Retail Technology Solutions | Astute Computer',
    metaDescription: 'Create seamless omnichannel experiences with unified commerce platforms, predictive inventory, and customer intelligence. Increase sales by 45%.'
  },
  {
    slug: 'education',
    title: 'Education',
    tagline: 'Learning Reimagined',
    description: 'Modern learning platforms, automated administration, and student engagement solutions.',
    icon: GraduationCap,
    heroDescription: 'We help educational institutions modernize with engaging learning platforms, automated administrative processes, and data-driven student success programs.',
    problems: [
      {
        title: 'Outdated LMS',
        description: 'Legacy learning management systems with poor UX and limited features.',
        impact: '65% of students frustrated with current LMS'
      },
      {
        title: 'Administrative Burden',
        description: 'Paper-heavy admissions, enrollment, and record-keeping processes.',
        impact: '40% of staff time on manual paperwork'
      },
      {
        title: 'Engagement Gaps',
        description: 'Low student engagement and high dropout rates in online learning.',
        impact: '40% completion rate for online courses'
      },
      {
        title: 'Data Disconnection',
        description: 'Student data siloed across systems preventing holistic insights.',
        impact: 'Average institution uses 50+ software tools'
      }
    ],
    solutions: [
      {
        title: 'Modern Learning Platforms',
        description: 'Engaging, mobile-first LMS with interactive content and gamification.',
        features: ['Video learning', 'Interactive quizzes', 'Progress tracking', 'Mobile apps']
      },
      {
        title: 'Admissions Automation',
        description: 'Digital application processing with AI-assisted evaluation.',
        features: ['Online applications', 'Document verification', 'Automated scoring', 'Status portals']
      },
      {
        title: 'Student Success Analytics',
        description: 'Predictive analytics identifying at-risk students for early intervention.',
        features: ['Risk prediction', 'Engagement tracking', 'Intervention alerts', 'Outcome analytics']
      }
    ],
    stats: [
      { value: '85', label: 'Course completion rate', suffix: '%' },
      { value: '60', label: 'Reduction in admin time', suffix: '%' },
      { value: '40', label: 'Improvement in engagement', suffix: '%' },
      { value: '3x', label: 'Faster admissions processing', suffix: '' }
    ],
    metaTitle: 'Education Technology Solutions | Astute Computer',
    metaDescription: 'Transform education with modern learning platforms, automated administration, and student success analytics. Achieve 85% course completion rates.'
  }
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find(industry => industry.slug === slug);
}
