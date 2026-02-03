-- Create app_role enum for role-based access control
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'user');

-- Create user_roles table for admin access
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create case_studies table
CREATE TABLE public.case_studies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    short_description TEXT NOT NULL,
    thumbnail_url TEXT,
    thumbnail_alt TEXT,
    stat_value TEXT,
    stat_metric TEXT,
    content JSONB DEFAULT '{"type": "doc", "content": []}'::jsonb,
    is_published BOOLEAN NOT NULL DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    meta_title TEXT,
    meta_description TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on case_studies
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

-- Public can view published case studies
CREATE POLICY "Anyone can view published case studies"
ON public.case_studies FOR SELECT
USING (is_published = true);

-- Admins and editors can view all case studies
CREATE POLICY "Admins can view all case studies"
ON public.case_studies FOR SELECT
TO authenticated
USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'editor')
);

-- Admins and editors can create case studies
CREATE POLICY "Admins can create case studies"
ON public.case_studies FOR INSERT
TO authenticated
WITH CHECK (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'editor')
);

-- Admins and editors can update case studies
CREATE POLICY "Admins can update case studies"
ON public.case_studies FOR UPDATE
TO authenticated
USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'editor')
)
WITH CHECK (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'editor')
);

-- Admins can delete case studies
CREATE POLICY "Admins can delete case studies"
ON public.case_studies FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create case_study_images table for galleries
CREATE TABLE public.case_study_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_study_id UUID REFERENCES public.case_studies(id) ON DELETE CASCADE NOT NULL,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    caption TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on case_study_images
ALTER TABLE public.case_study_images ENABLE ROW LEVEL SECURITY;

-- Public can view images of published case studies
CREATE POLICY "Anyone can view images of published case studies"
ON public.case_study_images FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.case_studies
        WHERE id = case_study_id AND is_published = true
    )
);

-- Admins can view all images
CREATE POLICY "Admins can view all images"
ON public.case_study_images FOR SELECT
TO authenticated
USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'editor')
);

-- Admins and editors can manage images
CREATE POLICY "Admins can insert images"
ON public.case_study_images FOR INSERT
TO authenticated
WITH CHECK (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'editor')
);

CREATE POLICY "Admins can update images"
ON public.case_study_images FOR UPDATE
TO authenticated
USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'editor')
)
WITH CHECK (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'editor')
);

CREATE POLICY "Admins can delete images"
ON public.case_study_images FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add trigger for case_studies updated_at
CREATE TRIGGER update_case_studies_updated_at
    BEFORE UPDATE ON public.case_studies
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Create storage bucket for case study images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'case-studies',
    'case-studies',
    true,
    5242880,
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
);

-- Storage policies: anyone can view
CREATE POLICY "Public can view case study images"
ON storage.objects FOR SELECT
USING (bucket_id = 'case-studies');

-- Authenticated admins/editors can upload
CREATE POLICY "Admins can upload case study images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'case-studies' AND
    (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
);

-- Admins/editors can update their uploads
CREATE POLICY "Admins can update case study images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
    bucket_id = 'case-studies' AND
    (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
);

-- Admins can delete images
CREATE POLICY "Admins can delete case study images"
ON storage.objects FOR DELETE
TO authenticated
USING (
    bucket_id = 'case-studies' AND
    public.has_role(auth.uid(), 'admin')
);

-- Create index for faster queries
CREATE INDEX idx_case_studies_published ON public.case_studies(is_published, display_order);
CREATE INDEX idx_case_studies_slug ON public.case_studies(slug);
CREATE INDEX idx_case_study_images_case_study ON public.case_study_images(case_study_id, display_order);