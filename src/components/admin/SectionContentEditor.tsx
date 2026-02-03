import { Label } from '@/components/ui/label';
import { RichTextEditor } from './RichTextEditor';
import type { JSONContent } from '@tiptap/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export interface SectionContent {
  context: JSONContent;
  problem: JSONContent;
  goals: JSONContent;
  solution: JSONContent;
  implementation: JSONContent;
  results_narrative: JSONContent;
  next_steps: JSONContent;
}

const SECTION_CONFIG = [
  { key: 'context', label: 'Client & Context', description: 'Background about the client (non-PII)' },
  { key: 'problem', label: 'Problem', description: 'The challenge or pain point' },
  { key: 'goals', label: 'Goals / Success Criteria', description: 'What success looks like' },
  { key: 'solution', label: 'Solution', description: 'How we solved the problem' },
  { key: 'implementation', label: 'Implementation', description: 'Technical approach and process' },
  { key: 'results_narrative', label: 'Results Narrative', description: 'Detailed outcomes and impact' },
  { key: 'next_steps', label: 'Next Steps / CTA', description: 'Future plans or call to action' },
] as const;

const DEFAULT_CONTENT: JSONContent = { type: 'doc', content: [] };

interface SectionContentEditorProps {
  value: SectionContent;
  onChange: (content: SectionContent) => void;
}

export function SectionContentEditor({ value, onChange }: SectionContentEditorProps) {
  const handleSectionChange = (key: keyof SectionContent, content: JSONContent) => {
    onChange({ ...value, [key]: content });
  };

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground mb-4">
        Each section below becomes an H2 heading on the case study page. 
        Write content without headings—the template handles semantic structure.
      </p>
      
      <Accordion type="multiple" className="w-full" defaultValue={['context', 'problem', 'solution']}>
        {SECTION_CONFIG.map(({ key, label, description }) => (
          <AccordionItem key={key} value={key}>
            <AccordionTrigger className="text-left">
              <div>
                <span className="font-medium">{label}</span>
                <span className="text-muted-foreground text-sm ml-2">— {description}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <RichTextEditor
                content={value[key as keyof SectionContent] || DEFAULT_CONTENT}
                onChange={(content) => handleSectionChange(key as keyof SectionContent, content)}
                placeholder={`Write the ${label.toLowerCase()} section...`}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export function getDefaultSectionContent(): SectionContent {
  return {
    context: DEFAULT_CONTENT,
    problem: DEFAULT_CONTENT,
    goals: DEFAULT_CONTENT,
    solution: DEFAULT_CONTENT,
    implementation: DEFAULT_CONTENT,
    results_narrative: DEFAULT_CONTENT,
    next_steps: DEFAULT_CONTENT,
  };
}
