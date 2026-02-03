import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { GalleryManager } from '@/components/admin/GalleryManager';
import { TagInput } from '@/components/admin/TagInput';
import { ResultsBuilder, type ResultItem } from '@/components/admin/ResultsBuilder';
import { FAQBuilder, type FAQItem } from '@/components/admin/FAQBuilder';
import { SectionContentEditor, getDefaultSectionContent, type SectionContent } from '@/components/admin/SectionContentEditor';
import { MarkdownImporter } from '@/components/admin/MarkdownImporter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  useCaseStudyById,
  useCreateCaseStudy,
  useUpdateCaseStudy,
  useAllCaseStudies,
  generateSlug,
} from '@/hooks/useCaseStudies';
import { useAllServices } from '@/hooks/useServices';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, Loader2, Eye, Upload } from 'lucide-react';
import type { JSONContent } from '@tiptap/react';
import type { Json } from '@/integrations/supabase/types';
import type { ParsedCaseStudy } from '@/lib/markdown-parser';

const CATEGORIES = [
  'Digital Branding',
  'Operations',
  'AI Archives',
  'Software Dev',
];

const INDUSTRIES = [
  'Audit',
  'Retail',
  'Manufacturing',
  'Healthcare',
  'Fintech',
  'Legal',
  'Education',
  'Other',
];

export default function CaseStudyEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNew = id === 'new';

  const { data: existingStudy, isLoading: isLoadingStudy } = useCaseStudyById(
    isNew ? undefined : id
  );
  const { data: allCaseStudies } = useAllCaseStudies();
  const { data: allServices } = useAllServices();
  const createMutation = useCreateCaseStudy();
  const updateMutation = useUpdateCaseStudy();

  // Basic form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [thumbnailAlt, setThumbnailAlt] = useState('');
  const [statValue, setStatValue] = useState('');
  const [statMetric, setStatMetric] = useState('');
  const [content, setContent] = useState<JSONContent>({ type: 'doc', content: [] });
  const [isPublished, setIsPublished] = useState(false);
  const [displayOrder, setDisplayOrder] = useState(0);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  // New SEO fields
  const [industry, setIndustry] = useState('');
  const [clientType, setClientType] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [techStack, setTechStack] = useState<string[]>([]);
  const [results, setResults] = useState<ResultItem[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [relatedCaseStudyIds, setRelatedCaseStudyIds] = useState<string[]>([]);
  const [relatedServiceIds, setRelatedServiceIds] = useState<string[]>([]);
  const [sectionContent, setSectionContent] = useState<SectionContent>(getDefaultSectionContent());
  
  // Import dialog state
  const [importDialogOpen, setImportDialogOpen] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (existingStudy) {
      setTitle(existingStudy.title);
      setSlug(existingStudy.slug);
      setCategory(existingStudy.category);
      setShortDescription(existingStudy.short_description);
      setThumbnailUrl(existingStudy.thumbnail_url);
      setThumbnailAlt(existingStudy.thumbnail_alt || '');
      setStatValue(existingStudy.stat_value || '');
      setStatMetric(existingStudy.stat_metric || '');
      setContent(existingStudy.content as JSONContent || { type: 'doc', content: [] });
      setIsPublished(existingStudy.is_published);
      setDisplayOrder(existingStudy.display_order);
      setMetaTitle(existingStudy.meta_title || '');
      setMetaDescription(existingStudy.meta_description || '');
      
      // New fields
      setIndustry(existingStudy.industry || '');
      setClientType(existingStudy.client_type || '');
      setSelectedServices(existingStudy.services || []);
      setTechStack(existingStudy.tech_stack || []);
      setResults(Array.isArray(existingStudy.results) ? existingStudy.results as unknown as ResultItem[] : []);
      setFaqs(Array.isArray(existingStudy.faqs) ? existingStudy.faqs as unknown as FAQItem[] : []);
      setRelatedCaseStudyIds(existingStudy.related_case_study_ids || []);
      setRelatedServiceIds(existingStudy.related_service_ids || []);
      setSectionContent(
        existingStudy.section_content && typeof existingStudy.section_content === 'object' && !Array.isArray(existingStudy.section_content)
          ? existingStudy.section_content as unknown as SectionContent
          : getDefaultSectionContent()
      );
    }
  }, [existingStudy]);

  // Auto-generate slug from title
  useEffect(() => {
    if (isNew && title && !slug) {
      setSlug(generateSlug(title));
    }
  }, [title, isNew, slug]);

  const handleSave = async (publish: boolean = false) => {
    if (!title || !slug || !category || !shortDescription) {
      toast({
        title: 'Missing required fields',
        description: 'Please fill in title, slug, category, and description.',
        variant: 'destructive',
      });
      return;
    }

    const data = {
      title,
      slug,
      category,
      short_description: shortDescription,
      thumbnail_url: thumbnailUrl,
      thumbnail_alt: thumbnailAlt || null,
      stat_value: statValue || null,
      stat_metric: statMetric || null,
      content: content as Json,
      is_published: publish || isPublished,
      published_at: (publish || isPublished) ? new Date().toISOString() : null,
      meta_title: metaTitle || null,
      meta_description: metaDescription || null,
      display_order: displayOrder,
      // New fields
      industry: industry || null,
      client_type: clientType || null,
      services: selectedServices,
      tech_stack: techStack,
      results: results as unknown as Json,
      faqs: faqs as unknown as Json,
      related_case_study_ids: relatedCaseStudyIds,
      related_service_ids: relatedServiceIds,
      section_content: sectionContent as unknown as Json,
    };

    try {
      if (isNew) {
        await createMutation.mutateAsync(data);
        toast({ title: 'Case study created!' });
      } else {
        await updateMutation.mutateAsync({ id: id!, ...data });
        toast({ title: 'Case study updated!' });
      }
      navigate('/admin/case-studies');
    } catch (error) {
      toast({
        title: 'Error saving',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    }
  };

  const toggleRelatedCaseStudy = (caseStudyId: string) => {
    setRelatedCaseStudyIds((prev) =>
      prev.includes(caseStudyId)
        ? prev.filter((id) => id !== caseStudyId)
        : [...prev, caseStudyId]
    );
  };

  const toggleRelatedService = (serviceId: string) => {
    setRelatedServiceIds((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const toggleServiceTag = (serviceTitle: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceTitle)
        ? prev.filter((s) => s !== serviceTitle)
        : [...prev, serviceTitle]
    );
  };

  const handleMarkdownImport = (data: ParsedCaseStudy) => {
    // Populate all form fields from imported data
    setTitle(data.title);
    setSlug(data.slug);
    setCategory(data.category);
    setShortDescription(data.short_description);
    
    // Metadata
    if (data.industry) setIndustry(data.industry);
    if (data.client_type) setClientType(data.client_type);
    if (data.services) setSelectedServices(data.services);
    if (data.tech_stack) setTechStack(data.tech_stack);
    
    // Stats
    if (data.stat_value) setStatValue(data.stat_value);
    if (data.stat_metric) setStatMetric(data.stat_metric);
    
    // Results
    if (data.results) setResults(data.results);
    
    // FAQs
    if (data.faqs) setFaqs(data.faqs);
    
    // SEO
    if (data.meta_title) setMetaTitle(data.meta_title);
    if (data.meta_description) setMetaDescription(data.meta_description);
    
    // Section content
    if (data.section_content) {
      setSectionContent({
        context: data.section_content.context || { type: 'doc', content: [] },
        problem: data.section_content.problem || { type: 'doc', content: [] },
        goals: data.section_content.goals || { type: 'doc', content: [] },
        solution: data.section_content.solution || { type: 'doc', content: [] },
        implementation: data.section_content.implementation || { type: 'doc', content: [] },
        results_narrative: data.section_content.results_narrative || { type: 'doc', content: [] },
        next_steps: data.section_content.next_steps || { type: 'doc', content: [] },
      });
    }
    
    toast({ title: 'Markdown imported successfully!' });
  };

  const hasExistingFormData = Boolean(title || shortDescription || category);

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const otherCaseStudies = allCaseStudies?.filter((cs) => cs.id !== id) || [];

  if (!isNew && isLoadingStudy) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin/case-studies')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">
              {isNew ? 'New Case Study' : 'Edit Case Study'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setImportDialogOpen(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Import MD
            </Button>
            {!isNew && existingStudy?.is_published && (
              <Button variant="outline" asChild>
                <a href={`/case-studies/${slug}`} target="_blank" rel="noopener noreferrer">
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </a>
              </Button>
            )}
            <Button onClick={() => handleSave(false)} disabled={isSaving}>
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save
            </Button>
            {!isPublished && (
              <Button variant="default" onClick={() => handleSave(true)} disabled={isSaving}>
                Publish
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-8">
          {/* Thumbnail Section */}
          <section className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Thumbnail</h2>
            <ImageUploader
              value={thumbnailUrl}
              onChange={setThumbnailUrl}
              folder="thumbnails"
            />
            <div className="mt-4">
              <Label htmlFor="thumbnailAlt">Alt Text</Label>
              <Input
                id="thumbnailAlt"
                value={thumbnailAlt}
                onChange={(e) => setThumbnailAlt(e.target.value)}
                placeholder="Describe the image for accessibility"
              />
            </div>
          </section>

          {/* Basic Info */}
          <section className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            <div className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Case study title"
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="url-friendly-slug"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="shortDescription">Short Description *</Label>
                <Textarea
                  id="shortDescription"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Brief description for cards (max 160 chars)"
                  maxLength={160}
                  rows={2}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {shortDescription.length}/160 characters
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="statValue">Stat Value</Label>
                  <Input
                    id="statValue"
                    value={statValue}
                    onChange={(e) => setStatValue(e.target.value)}
                    placeholder="e.g., 150%, 10M+"
                  />
                </div>
                <div>
                  <Label htmlFor="statMetric">Stat Metric</Label>
                  <Input
                    id="statMetric"
                    value={statMetric}
                    onChange={(e) => setStatMetric(e.target.value)}
                    placeholder="e.g., Brand Recognition"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Metadata Section */}
          <section className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Metadata</h2>
            <div className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDUSTRIES.map((ind) => (
                        <SelectItem key={ind} value={ind}>
                          {ind}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="clientType">Client Type</Label>
                  <Input
                    id="clientType"
                    value={clientType}
                    onChange={(e) => setClientType(e.target.value)}
                    placeholder="e.g., Mid-size audit firm (India)"
                  />
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Services</Label>
                <div className="flex flex-wrap gap-3">
                  {allServices?.map((service) => (
                    <div key={service.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`service-${service.id}`}
                        checked={selectedServices.includes(service.title)}
                        onCheckedChange={() => toggleServiceTag(service.title)}
                      />
                      <label
                        htmlFor={`service-${service.id}`}
                        className="text-sm font-medium leading-none cursor-pointer"
                      >
                        {service.title}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Tech Stack</Label>
                <TagInput
                  value={techStack}
                  onChange={setTechStack}
                  placeholder="Add technology (e.g., React, Node.js)"
                />
              </div>
            </div>
          </section>

          {/* Results Section */}
          <section className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Results / Key Metrics</h2>
            <ResultsBuilder value={results} onChange={setResults} />
          </section>

          {/* Section Content */}
          <section className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Section Content</h2>
            <SectionContentEditor value={sectionContent} onChange={setSectionContent} />
          </section>

          {/* Legacy Content Editor */}
          <section className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Additional Content (Legacy)</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Use this for any content that doesn't fit the structured sections above.
            </p>
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="Write additional content here..."
            />
          </section>

          {/* FAQs */}
          <section className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">FAQs</h2>
            <FAQBuilder value={faqs} onChange={setFaqs} />
          </section>

          {/* Related Content */}
          <section className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Related Content</h2>
            
            <div className="space-y-6">
              <div>
                <Label className="mb-2 block">Related Case Studies</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Select 2-3 related case studies for cross-linking.
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {otherCaseStudies.map((cs) => (
                    <div key={cs.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`related-cs-${cs.id}`}
                        checked={relatedCaseStudyIds.includes(cs.id)}
                        onCheckedChange={() => toggleRelatedCaseStudy(cs.id)}
                      />
                      <label
                        htmlFor={`related-cs-${cs.id}`}
                        className="text-sm font-medium leading-none cursor-pointer"
                      >
                        {cs.title}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Related Services</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Select services to show in the "Related Services" section.
                </p>
                <div className="flex flex-wrap gap-3">
                  {allServices?.map((service) => (
                    <div key={service.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`related-svc-${service.id}`}
                        checked={relatedServiceIds.includes(service.id)}
                        onCheckedChange={() => toggleRelatedService(service.id)}
                      />
                      <label
                        htmlFor={`related-svc-${service.id}`}
                        className="text-sm font-medium leading-none cursor-pointer"
                      >
                        {service.title}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Gallery */}
          <section className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Gallery</h2>
            <GalleryManager caseStudyId={isNew ? undefined : id} />
          </section>

          {/* SEO */}
          <section className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">SEO</h2>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="SEO title (defaults to case study title)"
                />
              </div>
              <div>
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="SEO description (max 160 chars)"
                  maxLength={160}
                  rows={2}
                />
              </div>
            </div>
          </section>

          {/* Publishing */}
          <section className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Publishing</h2>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="published">Published</Label>
                <p className="text-sm text-muted-foreground">
                  Make this case study visible on the website
                </p>
              </div>
              <Switch
                id="published"
                checked={isPublished}
                onCheckedChange={setIsPublished}
              />
            </div>
            <div className="mt-4">
              <Label htmlFor="displayOrder">Display Order</Label>
              <Input
                id="displayOrder"
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                className="w-24"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Lower numbers appear first
              </p>
            </div>
          </section>
        </div>
      </div>
      
      {/* Markdown Import Dialog */}
      <MarkdownImporter
        open={importDialogOpen}
        onOpenChange={setImportDialogOpen}
        onImport={handleMarkdownImport}
        hasExistingData={hasExistingFormData}
      />
    </AdminLayout>
  );
}
