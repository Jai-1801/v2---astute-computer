-- Add status columns to contact_submissions
ALTER TABLE public.contact_submissions 
ADD COLUMN is_read boolean NOT NULL DEFAULT false;

ALTER TABLE public.contact_submissions 
ADD COLUMN read_at timestamp with time zone;

-- RLS Policies for contact_submissions

-- Allow admins/editors to view all contact submissions
CREATE POLICY "Admins can view contact submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'editor'::app_role)
);

-- Allow admins/editors to update (mark as read)
CREATE POLICY "Admins can update contact submissions"
ON public.contact_submissions
FOR UPDATE
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'editor'::app_role)
)
WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'editor'::app_role)
);

-- Allow admins to delete contact submissions
CREATE POLICY "Admins can delete contact submissions"
ON public.contact_submissions
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for newsletter_subscribers

-- Allow admins/editors to view newsletter subscribers
CREATE POLICY "Admins can view newsletter subscribers"
ON public.newsletter_subscribers
FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'editor'::app_role)
);

-- Allow admins to delete subscribers
CREATE POLICY "Admins can delete newsletter subscribers"
ON public.newsletter_subscribers
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));