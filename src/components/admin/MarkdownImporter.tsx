import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { parseMarkdownCaseStudy, EXAMPLE_TEMPLATE, type ParsedCaseStudy } from '@/lib/markdown-parser';
import { Upload, Download, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface MarkdownImporterProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (data: ParsedCaseStudy) => void;
  hasExistingData?: boolean;
}

export function MarkdownImporter({
  open,
  onOpenChange,
  onImport,
  hasExistingData = false,
}: MarkdownImporterProps) {
  const [parsedData, setParsedData] = useState<ParsedCaseStudy | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setFileName(file.name);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const result = parseMarkdownCaseStudy(content);
      
      if (result.success && result.data) {
        setParsedData(result.data);
        setErrors([]);
      } else {
        setParsedData(null);
        setErrors(result.errors || ['Failed to parse markdown file']);
      }
    };
    reader.readAsText(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/markdown': ['.md'],
      'text/plain': ['.md', '.txt'],
    },
    maxFiles: 1,
  });

  const downloadTemplate = () => {
    const blob = new Blob([EXAMPLE_TEMPLATE], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'case-study-import-template.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (parsedData) {
      onImport(parsedData);
      handleClose();
    }
  };

  const handleClose = () => {
    setParsedData(null);
    setErrors([]);
    setFileName('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Import Case Study from Markdown</DialogTitle>
          <DialogDescription>
            Upload a markdown file with YAML frontmatter to populate all case study fields.
            Images and display order must be set manually after import.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Instructions */}
          <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-2">
            <p className="font-medium">Instructions:</p>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Download the example template below</li>
              <li>Fill in the frontmatter (between --- lines) with your data</li>
              <li>Write content under each ## section heading</li>
              <li>Upload the completed .md file</li>
            </ol>
          </div>

          {/* Download Template Button */}
          <Button variant="outline" onClick={downloadTemplate} className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Download Example Template
          </Button>

          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            {isDragActive ? (
              <p className="text-primary">Drop the markdown file here...</p>
            ) : (
              <p className="text-muted-foreground">
                Drag and drop a .md file here, or click to select
              </p>
            )}
          </div>

          {/* File Preview */}
          {fileName && (
            <div className="flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span>{fileName}</span>
              {parsedData && <CheckCircle2 className="h-4 w-4 text-green-500" />}
              {errors.length > 0 && <AlertCircle className="h-4 w-4 text-destructive" />}
            </div>
          )}

          {/* Errors */}
          {errors.length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Parsed Data Preview */}
          {parsedData && (
            <Alert>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <AlertDescription>
                <p className="font-medium mb-2">Ready to import:</p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li><strong>Title:</strong> {parsedData.title}</li>
                  <li><strong>Category:</strong> {parsedData.category}</li>
                  {parsedData.industry && <li><strong>Industry:</strong> {parsedData.industry}</li>}
                  {parsedData.services && parsedData.services.length > 0 && (
                    <li><strong>Services:</strong> {parsedData.services.join(', ')}</li>
                  )}
                  {parsedData.results && parsedData.results.length > 0 && (
                    <li><strong>Results:</strong> {parsedData.results.length} metrics</li>
                  )}
                  {parsedData.faqs && parsedData.faqs.length > 0 && (
                    <li><strong>FAQs:</strong> {parsedData.faqs.length} questions</li>
                  )}
                  {parsedData.section_content && (
                    <li><strong>Sections:</strong> {Object.keys(parsedData.section_content).length} populated</li>
                  )}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Warning for existing data */}
          {hasExistingData && parsedData && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This will overwrite the current form data (except thumbnail and display order).
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleImport} disabled={!parsedData}>
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
