import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQBuilderProps {
  value: FAQItem[];
  onChange: (faqs: FAQItem[]) => void;
}

export function FAQBuilder({ value, onChange }: FAQBuilderProps) {
  const addFAQ = () => {
    onChange([...value, { question: '', answer: '' }]);
  };

  const updateFAQ = (index: number, field: keyof FAQItem, newValue: string) => {
    const updated = [...value];
    updated[index] = { ...updated[index], [field]: newValue };
    onChange(updated);
  };

  const removeFAQ = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {value.map((faq, index) => (
        <div key={index} className="border border-border rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              FAQ #{index + 1}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeFAQ(index)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <Label htmlFor={`faq-question-${index}`}>Question</Label>
            <Input
              id={`faq-question-${index}`}
              value={faq.question}
              onChange={(e) => updateFAQ(index, 'question', e.target.value)}
              placeholder="e.g., How long did the implementation take?"
            />
          </div>
          <div>
            <Label htmlFor={`faq-answer-${index}`}>Answer</Label>
            <Textarea
              id={`faq-answer-${index}`}
              value={faq.answer}
              onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
              placeholder="Provide a concise answer..."
              rows={3}
            />
          </div>
        </div>
      ))}
      
      <Button type="button" variant="outline" onClick={addFAQ} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add FAQ
      </Button>
      
      {value.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          No FAQs added yet. FAQs help with SEO and featured snippets.
        </p>
      )}
    </div>
  );
}
