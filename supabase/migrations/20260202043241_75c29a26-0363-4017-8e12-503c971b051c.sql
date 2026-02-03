-- Add new columns to case_studies table for enhanced SEO and structured content
ALTER TABLE public.case_studies
ADD COLUMN IF NOT EXISTS industry text,
ADD COLUMN IF NOT EXISTS services text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS tech_stack text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS results jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS client_type text,
ADD COLUMN IF NOT EXISTS faqs jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS related_case_study_ids uuid[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS related_service_ids uuid[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS section_content jsonb DEFAULT '{}'::jsonb;

-- Add comment explaining section_content structure
COMMENT ON COLUMN public.case_studies.section_content IS 'Structured content sections: context, problem, goals, solution, implementation, results_detail, next_steps - each containing rich text';

COMMENT ON COLUMN public.case_studies.results IS 'Array of result objects: [{label, value, context}]';

COMMENT ON COLUMN public.case_studies.faqs IS 'Array of FAQ objects: [{question, answer}]';

-- Create services table for dedicated service pages
CREATE TABLE IF NOT EXISTS public.services (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  short_description text NOT NULL,
  long_description text,
  content jsonb DEFAULT '{"type": "doc", "content": []}'::jsonb,
  icon text,
  features text[] DEFAULT '{}',
  benefits text[] DEFAULT '{}',
  meta_title text,
  meta_description text,
  display_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on services table
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- RLS policies for services table
CREATE POLICY "Anyone can view published services"
ON public.services
FOR SELECT
USING (is_published = true);

CREATE POLICY "Admins can view all services"
ON public.services
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Admins can create services"
ON public.services
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Admins can update services"
ON public.services
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Admins can delete services"
ON public.services
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at on services
CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Insert the 4 core services
INSERT INTO public.services (title, slug, short_description, long_description, icon, features, benefits, display_order, is_published) VALUES
(
  'Document Digitization',
  'document-digitization',
  'Transform paper-based operations into intelligent digital archives powered by AI.',
  'Our AI-powered document digitization service converts physical documents into searchable, organized digital assets. We use advanced OCR and machine learning to extract, classify, and index information automatically.',
  'FileText',
  ARRAY['AI-powered OCR with 99%+ accuracy', 'Automatic document classification', 'Full-text searchable archives', 'Secure cloud storage', 'Integration with existing systems'],
  ARRAY['Reduce document retrieval time by 90%', 'Eliminate physical storage costs', 'Ensure regulatory compliance', 'Enable remote document access'],
  1,
  true
),
(
  'AI Automation',
  'ai-automation',
  'Streamline operations with intelligent automation that learns and adapts.',
  'Deploy AI-driven automation solutions that handle repetitive tasks, make smart decisions, and continuously improve. From invoice processing to customer service, we automate the workflows that slow you down.',
  'Cpu',
  ARRAY['Intelligent workflow automation', 'Natural language processing', 'Predictive analytics', 'Custom AI model training', 'Real-time monitoring dashboards'],
  ARRAY['Cut operational costs by 60%', 'Eliminate human error', 'Scale without adding headcount', '24/7 automated operations'],
  2,
  true
),
(
  'Custom Software Development',
  'custom-software-development',
  'Bespoke software solutions designed around your unique business needs.',
  'We build custom software that fits your business like a glove. From web applications to mobile apps, our solutions are designed for scalability, security, and seamless user experience.',
  'Code',
  ARRAY['Full-stack web development', 'Mobile app development', 'API design and integration', 'Legacy system modernization', 'Cloud-native architecture'],
  ARRAY['Perfect fit for your processes', 'Complete ownership of code', 'Scalable architecture', 'Ongoing support and maintenance'],
  3,
  true
),
(
  'Digital Transformation',
  'digital-transformation',
  'End-to-end digital strategy to modernize your entire business.',
  'Transform your organization with a comprehensive digital strategy. We assess your current state, design the future, and guide you through every step of the transformation journey.',
  'Zap',
  ARRAY['Digital maturity assessment', 'Technology roadmap planning', 'Change management support', 'Process reengineering', 'Training and enablement'],
  ARRAY['Unified digital ecosystem', 'Improved customer experience', 'Data-driven decision making', 'Competitive advantage'],
  4,
  true
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_case_studies_industry ON public.case_studies(industry);
CREATE INDEX IF NOT EXISTS idx_case_studies_services ON public.case_studies USING GIN(services);
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_services_is_published ON public.services(is_published);