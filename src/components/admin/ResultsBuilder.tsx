import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

export interface ResultItem {
  label: string;
  value: string;
  context?: string;
}

interface ResultsBuilderProps {
  value: ResultItem[];
  onChange: (results: ResultItem[]) => void;
}

export function ResultsBuilder({ value, onChange }: ResultsBuilderProps) {
  const addResult = () => {
    if (value.length < 4) {
      onChange([...value, { label: '', value: '', context: '' }]);
    }
  };

  const updateResult = (index: number, field: keyof ResultItem, newValue: string) => {
    const updated = [...value];
    updated[index] = { ...updated[index], [field]: newValue };
    onChange(updated);
  };

  const removeResult = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {value.map((result, index) => (
        <div key={index} className="border border-border rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Result #{index + 1}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeResult(index)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor={`result-label-${index}`}>Label</Label>
              <Input
                id={`result-label-${index}`}
                value={result.label}
                onChange={(e) => updateResult(index, 'label', e.target.value)}
                placeholder="e.g., Processing time reduced"
              />
            </div>
            <div>
              <Label htmlFor={`result-value-${index}`}>Value</Label>
              <Input
                id={`result-value-${index}`}
                value={result.value}
                onChange={(e) => updateResult(index, 'value', e.target.value)}
                placeholder="e.g., 8 hours → 45 minutes"
              />
            </div>
          </div>
          <div>
            <Label htmlFor={`result-context-${index}`}>Context (optional)</Label>
            <Input
              id={`result-context-${index}`}
              value={result.context || ''}
              onChange={(e) => updateResult(index, 'context', e.target.value)}
              placeholder="e.g., per 1,000 invoices"
            />
          </div>
        </div>
      ))}
      
      {value.length < 4 && (
        <Button type="button" variant="outline" onClick={addResult} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Result (max 4)
        </Button>
      )}
      
      {value.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          No results added yet. Click the button above to add key metrics.
        </p>
      )}
    </div>
  );
}
