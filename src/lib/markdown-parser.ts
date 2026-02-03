import type { JSONContent } from '@tiptap/react';

export interface ParsedCaseStudy {
  // Required fields
  title: string;
  slug: string;
  category: string;
  short_description: string;
  
  // Metadata
  industry?: string;
  client_type?: string;
  services?: string[];
  tech_stack?: string[];
  
  // Stats
  stat_value?: string;
  stat_metric?: string;
  
  // Results array
  results?: { label: string; value: string; context?: string }[];
  
  // FAQs array
  faqs?: { question: string; answer: string }[];
  
  // SEO
  meta_title?: string;
  meta_description?: string;
  
  // Related content for internal linking
  related_services?: string[];
  related_case_studies?: string[];
  
  // Section content
  section_content?: {
    context?: JSONContent;
    problem?: JSONContent;
    goals?: JSONContent;
    solution?: JSONContent;
    implementation?: JSONContent;
    results_narrative?: JSONContent;
    next_steps?: JSONContent;
  };
}

export interface ParseResult {
  success: boolean;
  data?: ParsedCaseStudy;
  errors?: string[];
}

const SECTION_MAPPING: Record<string, string> = {
  'Client & Context': 'context',
  'Problem': 'problem',
  'Goals / Success Criteria': 'goals',
  'Solution': 'solution',
  'Implementation': 'implementation',
  'Results Narrative': 'results_narrative',
  'Next Steps / CTA': 'next_steps',
};

const VALID_CATEGORIES = ['Digital Branding', 'Operations', 'AI Archives', 'Software Dev'];
const VALID_INDUSTRIES = ['Audit', 'Retail', 'Manufacturing', 'Healthcare', 'Fintech', 'Legal', 'Education', 'Other'];

/**
 * Parse a simple YAML-like frontmatter format
 */
function parseYamlValue(value: string): string | string[] | { label: string; value: string; context?: string }[] | { question: string; answer: string }[] {
  const trimmed = value.trim();
  
  // Check if it's a quoted string
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || 
      (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  
  return trimmed;
}

function parseYamlArray(lines: string[], startIndex: number): { items: string[]; endIndex: number } {
  const items: string[] = [];
  let i = startIndex;
  
  while (i < lines.length) {
    const line = lines[i];
    if (line.match(/^\s{2}-\s/)) {
      // Array item like "  - value"
      const value = line.replace(/^\s{2}-\s/, '').trim();
      // Remove quotes if present
      const cleanValue = value.replace(/^["']|["']$/g, '');
      items.push(cleanValue);
      i++;
    } else if (line.match(/^\s{4}/)) {
      // Nested property, continue
      i++;
    } else if (line.trim() === '' || line.match(/^[a-z_]+:/i) || line.startsWith('#')) {
      // End of array
      break;
    } else {
      i++;
    }
  }
  
  return { items, endIndex: i - 1 };
}

function parseResultsArray(lines: string[], startIndex: number): { results: { label: string; value: string; context?: string }[]; endIndex: number } {
  const results: { label: string; value: string; context?: string }[] = [];
  let i = startIndex;
  let currentResult: { label?: string; value?: string; context?: string } = {};
  
  while (i < lines.length) {
    const line = lines[i];
    
    if (line.match(/^\s{2}-\s*label:/)) {
      // Start of new result item
      if (currentResult.label && currentResult.value) {
        results.push(currentResult as { label: string; value: string; context?: string });
      }
      currentResult = { label: line.replace(/^\s{2}-\s*label:\s*/, '').replace(/^["']|["']$/g, '').trim() };
      i++;
    } else if (line.match(/^\s{4}value:/)) {
      currentResult.value = line.replace(/^\s{4}value:\s*/, '').replace(/^["']|["']$/g, '').trim();
      i++;
    } else if (line.match(/^\s{4}context:/)) {
      currentResult.context = line.replace(/^\s{4}context:\s*/, '').replace(/^["']|["']$/g, '').trim();
      i++;
    } else if (line.match(/^[a-z_]+:/i) && !line.match(/^\s/)) {
      // New top-level key
      break;
    } else if (line.trim() === '' || line.startsWith('#')) {
      i++;
    } else {
      i++;
    }
  }
  
  // Push last result
  if (currentResult.label && currentResult.value) {
    results.push(currentResult as { label: string; value: string; context?: string });
  }
  
  return { results, endIndex: i - 1 };
}

function parseFAQsArray(lines: string[], startIndex: number): { faqs: { question: string; answer: string }[]; endIndex: number } {
  const faqs: { question: string; answer: string }[] = [];
  let i = startIndex;
  let currentFAQ: { question?: string; answer?: string } = {};
  
  while (i < lines.length) {
    const line = lines[i];
    
    if (line.match(/^\s{2}-\s*question:/)) {
      // Start of new FAQ item
      if (currentFAQ.question && currentFAQ.answer) {
        faqs.push(currentFAQ as { question: string; answer: string });
      }
      currentFAQ = { question: line.replace(/^\s{2}-\s*question:\s*/, '').replace(/^["']|["']$/g, '').trim() };
      i++;
    } else if (line.match(/^\s{4}answer:/)) {
      currentFAQ.answer = line.replace(/^\s{4}answer:\s*/, '').replace(/^["']|["']$/g, '').trim();
      i++;
    } else if (line.match(/^[a-z_]+:/i) && !line.match(/^\s/)) {
      // New top-level key
      break;
    } else if (line.trim() === '' || line.startsWith('#')) {
      i++;
    } else {
      i++;
    }
  }
  
  // Push last FAQ
  if (currentFAQ.question && currentFAQ.answer) {
    faqs.push(currentFAQ as { question: string; answer: string });
  }
  
  return { faqs, endIndex: i - 1 };
}

/**
 * Parse YAML frontmatter from markdown content
 */
function parseFrontmatter(content: string): Record<string, unknown> | null {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  
  const yaml = match[1];
  const lines = yaml.split('\n');
  const result: Record<string, unknown> = {};
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    
    // Skip comments and empty lines
    if (line.startsWith('#') || line.trim() === '') {
      i++;
      continue;
    }
    
    // Match top-level key
    const keyMatch = line.match(/^([a-z_]+):\s*(.*)?$/i);
    if (keyMatch) {
      const key = keyMatch[1];
      const inlineValue = keyMatch[2]?.trim();
      
      // Check if next line starts an array
      if (!inlineValue && i + 1 < lines.length && lines[i + 1].match(/^\s{2}-/)) {
        if (key === 'results') {
          const { results, endIndex } = parseResultsArray(lines, i + 1);
          result[key] = results;
          i = endIndex + 1;
        } else if (key === 'faqs') {
          const { faqs, endIndex } = parseFAQsArray(lines, i + 1);
          result[key] = faqs;
          i = endIndex + 1;
        } else {
          // Simple string array
          const { items, endIndex } = parseYamlArray(lines, i + 1);
          result[key] = items;
          i = endIndex + 1;
        }
      } else if (inlineValue) {
        result[key] = parseYamlValue(inlineValue);
        i++;
      } else {
        i++;
      }
    } else {
      i++;
    }
  }
  
  return result;
}

/**
 * Parse inline markdown marks (bold, italic, code, links, strikethrough)
 */
function parseInlineMarks(text: string): JSONContent[] {
  if (!text) return [];
  
  const nodes: JSONContent[] = [];
  
  // Regex patterns for inline marks - order matters (longer patterns first)
  const patterns = [
    { regex: /\*\*\*(.+?)\*\*\*/g, marks: ['bold', 'italic'] }, // ***bold italic***
    { regex: /\*\*(.+?)\*\*/g, marks: ['bold'] },               // **bold**
    { regex: /\*(.+?)\*/g, marks: ['italic'] },                 // *italic*
    { regex: /~~(.+?)~~/g, marks: ['strike'] },                 // ~~strikethrough~~
    { regex: /`(.+?)`/g, marks: ['code'] },                     // `code`
    { regex: /\[(.+?)\]\((.+?)\)/g, marks: ['link'], isLink: true }, // [text](url)
  ];
  
  // Simple approach: process text segment by segment
  let remaining = text;
  let lastIndex = 0;
  
  // Find all matches with their positions
  interface Match {
    start: number;
    end: number;
    content: string;
    marks: { type: string; attrs?: Record<string, string> }[];
  }
  
  const matches: Match[] = [];
  
  for (const pattern of patterns) {
    pattern.regex.lastIndex = 0;
    let match;
    while ((match = pattern.regex.exec(text)) !== null) {
      // Check if this position is already covered by a previous match
      const start = match.index;
      const end = match.index + match[0].length;
      const isOverlapping = matches.some(m => 
        (start >= m.start && start < m.end) || (end > m.start && end <= m.end)
      );
      
      if (!isOverlapping) {
        const markObjects = pattern.marks.map(m => ({ type: m }));
        
        if ((pattern as any).isLink) {
          matches.push({
            start,
            end,
            content: match[1],
            marks: [{ type: 'link', attrs: { href: match[2] } }]
          });
        } else {
          matches.push({
            start,
            end,
            content: match[1],
            marks: markObjects
          });
        }
      }
    }
  }
  
  // Sort matches by position
  matches.sort((a, b) => a.start - b.start);
  
  // Build nodes from matches and plain text
  let currentPos = 0;
  for (const match of matches) {
    // Add plain text before this match
    if (match.start > currentPos) {
      const plainText = text.slice(currentPos, match.start);
      if (plainText) {
        nodes.push({ type: 'text', text: plainText });
      }
    }
    
    // Add the marked text
    nodes.push({
      type: 'text',
      text: match.content,
      marks: match.marks
    });
    
    currentPos = match.end;
  }
  
  // Add remaining plain text
  if (currentPos < text.length) {
    const plainText = text.slice(currentPos);
    if (plainText) {
      nodes.push({ type: 'text', text: plainText });
    }
  }
  
  // If no matches found, return the whole text as plain
  if (nodes.length === 0 && text) {
    nodes.push({ type: 'text', text });
  }
  
  return nodes;
}

/**
 * Convert markdown text to TipTap JSONContent format
 */
export function markdownToTipTap(markdown: string): JSONContent {
  const lines = markdown.trim().split('\n');
  const content: JSONContent[] = [];
  let i = 0;
  
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Skip empty lines
    if (trimmed === '') {
      i++;
      continue;
    }
    
    // Headings: # ## ### #### ##### ######
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      content.push({
        type: 'heading',
        attrs: { level },
        content: parseInlineMarks(text)
      });
      i++;
      continue;
    }
    
    // Blockquote: > text
    if (trimmed.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        quoteLines.push(lines[i].trim().slice(2));
        i++;
      }
      content.push({
        type: 'blockquote',
        content: [{
          type: 'paragraph',
          content: parseInlineMarks(quoteLines.join(' '))
        }]
      });
      continue;
    }
    
    // Bullet list: - item or * item
    if (trimmed.match(/^[-*]\s+/)) {
      const listItems: JSONContent[] = [];
      while (i < lines.length && lines[i].trim().match(/^[-*]\s+/)) {
        const itemText = lines[i].trim().replace(/^[-*]\s+/, '');
        listItems.push({
          type: 'listItem',
          content: [{
            type: 'paragraph',
            content: parseInlineMarks(itemText)
          }]
        });
        i++;
      }
      content.push({
        type: 'bulletList',
        content: listItems
      });
      continue;
    }
    
    // Ordered list: 1. item
    if (trimmed.match(/^\d+\.\s+/)) {
      const listItems: JSONContent[] = [];
      while (i < lines.length && lines[i].trim().match(/^\d+\.\s+/)) {
        const itemText = lines[i].trim().replace(/^\d+\.\s+/, '');
        listItems.push({
          type: 'listItem',
          content: [{
            type: 'paragraph',
            content: parseInlineMarks(itemText)
          }]
        });
        i++;
      }
      content.push({
        type: 'orderedList',
        content: listItems
      });
      continue;
    }
    
    // Regular paragraph - collect consecutive non-special lines
    const paragraphLines: string[] = [];
    while (i < lines.length) {
      const currentLine = lines[i].trim();
      // Stop if we hit a special line or empty line
      if (currentLine === '' || 
          currentLine.match(/^#{1,6}\s/) ||
          currentLine.match(/^[-*]\s+/) ||
          currentLine.match(/^\d+\.\s+/) ||
          currentLine.startsWith('> ')) {
        break;
      }
      paragraphLines.push(currentLine);
      i++;
    }
    
    if (paragraphLines.length > 0) {
      const paragraphText = paragraphLines.join(' ');
      content.push({
        type: 'paragraph',
        content: parseInlineMarks(paragraphText)
      });
    }
  }
  
  return {
    type: 'doc',
    content: content.length > 0 ? content : [{ type: 'paragraph', content: [] }]
  };
}

/**
 * Extract sections from markdown content (after frontmatter)
 */
function extractSections(content: string): Record<string, string> {
  // Remove frontmatter
  const withoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n?/, '');
  
  const sections: Record<string, string> = {};
  const sectionRegex = /^## (.+?)$/gm;
  let match;
  const sectionStarts: { heading: string; index: number }[] = [];
  
  while ((match = sectionRegex.exec(withoutFrontmatter)) !== null) {
    sectionStarts.push({
      heading: match[1].trim(),
      index: match.index + match[0].length
    });
  }
  
  // Extract content for each section
  for (let i = 0; i < sectionStarts.length; i++) {
    const start = sectionStarts[i];
    const endIndex = i + 1 < sectionStarts.length 
      ? withoutFrontmatter.lastIndexOf('\n## ', sectionStarts[i + 1].index)
      : withoutFrontmatter.length;
    
    const sectionContent = withoutFrontmatter.slice(start.index, endIndex).trim();
    const sectionKey = SECTION_MAPPING[start.heading];
    
    if (sectionKey) {
      sections[sectionKey] = sectionContent;
    }
  }
  
  return sections;
}

/**
 * Parse a markdown file into structured case study data
 */
export function parseMarkdownCaseStudy(content: string): ParseResult {
  const errors: string[] = [];
  
  // Parse frontmatter
  const frontmatter = parseFrontmatter(content);
  if (!frontmatter) {
    return {
      success: false,
      errors: ['Invalid markdown file: missing or malformed frontmatter (content between --- markers)']
    };
  }
  
  // Validate required fields
  if (!frontmatter.title) errors.push('Missing required field: title');
  if (!frontmatter.slug) errors.push('Missing required field: slug');
  if (!frontmatter.category) errors.push('Missing required field: category');
  if (!frontmatter.short_description) errors.push('Missing required field: short_description');
  
  // Validate category
  if (frontmatter.category && !VALID_CATEGORIES.includes(frontmatter.category as string)) {
    errors.push(`Invalid category: "${frontmatter.category}". Valid options: ${VALID_CATEGORIES.join(', ')}`);
  }
  
  // Validate industry
  if (frontmatter.industry && !VALID_INDUSTRIES.includes(frontmatter.industry as string)) {
    errors.push(`Invalid industry: "${frontmatter.industry}". Valid options: ${VALID_INDUSTRIES.join(', ')}`);
  }
  
  if (errors.length > 0) {
    return { success: false, errors };
  }
  
  // Extract sections
  const rawSections = extractSections(content);
  const sectionContent: ParsedCaseStudy['section_content'] = {};
  
  for (const [key, value] of Object.entries(rawSections)) {
    (sectionContent as Record<string, JSONContent>)[key] = markdownToTipTap(value);
  }
  
  // Build result
  const data: ParsedCaseStudy = {
    title: frontmatter.title as string,
    slug: frontmatter.slug as string,
    category: frontmatter.category as string,
    short_description: frontmatter.short_description as string,
    industry: frontmatter.industry as string | undefined,
    client_type: frontmatter.client_type as string | undefined,
    services: frontmatter.services as string[] | undefined,
    tech_stack: frontmatter.tech_stack as string[] | undefined,
    stat_value: frontmatter.stat_value as string | undefined,
    stat_metric: frontmatter.stat_metric as string | undefined,
    results: frontmatter.results as { label: string; value: string; context?: string }[] | undefined,
    faqs: frontmatter.faqs as { question: string; answer: string }[] | undefined,
    meta_title: frontmatter.meta_title as string | undefined,
    meta_description: frontmatter.meta_description as string | undefined,
    related_services: frontmatter.related_services as string[] | undefined,
    related_case_studies: frontmatter.related_case_studies as string[] | undefined,
    section_content: Object.keys(sectionContent).length > 0 ? sectionContent : undefined,
  };
  
  return { success: true, data };
}

/**
 * Instruction-focused markdown template for case study import
 */
export const EXAMPLE_TEMPLATE = `---
# ═══════════════════════════════════════════════════════════════════════════════
# CASE STUDY IMPORT TEMPLATE
# ═══════════════════════════════════════════════════════════════════════════════
#
# HOW TO USE THIS FILE:
# 1. Fill in all fields between the --- markers (YAML frontmatter)
# 2. Replace [INSTRUCTIONS] blocks with your actual content
# 3. Delete instruction comments before importing
# 4. Save as .md file and upload to the CMS
#
# WHAT GETS IMPORTED:
# ✓ All frontmatter fields (metadata, results, FAQs, SEO)
# ✓ All content sections (Client & Context, Problem, etc.)
#
# WHAT MUST BE ADDED MANUALLY AFTER IMPORT:
# ✗ Thumbnail image
# ✗ Gallery images
# ✗ Display order
# ✗ Publish status
#
# ═══════════════════════════════════════════════════════════════════════════════


# ═══════════════════════════════════════════════════════════════════════════════
# REQUIRED FIELDS
# ═══════════════════════════════════════════════════════════════════════════════

# Title of the case study (displayed as H1 on the page)
title: ""

# URL-friendly slug (lowercase, hyphens only, must be unique)
# Example format: "client-name-project-type" or "industry-solution-type"
slug: ""

# Category - SELECT ONE of these exact values:
#   - "Digital Branding"
#   - "Operations"
#   - "AI Archives"
#   - "Software Dev"
category: ""

# Brief summary (1-2 sentences, shown on cards and in search results)
# Keep under 160 characters for optimal SEO
short_description: ""


# ═══════════════════════════════════════════════════════════════════════════════
# METADATA
# ═══════════════════════════════════════════════════════════════════════════════

# Industry - SELECT ONE of these exact values:
#   - "Audit"
#   - "Retail"
#   - "Manufacturing"
#   - "Healthcare"
#   - "Fintech"
#   - "Legal"
#   - "Education"
#   - "Other"
industry: ""

# Non-identifying client descriptor (no PII)
# Examples: "Fortune 500 Retailer", "Mid-size Audit Firm (India)", "Global Logistics Provider"
client_type: ""

# Services provided - SELECT from these options (can select multiple):
#   - "Document Digitization"
#   - "AI Automation"
#   - "Custom Software Development"
#   - "Digital Transformation"
services:
  - ""

# Technologies used (free-form list)
# Examples: Python, TensorFlow, React, Node.js, Supabase, AWS
tech_stack:
  - ""


# ═══════════════════════════════════════════════════════════════════════════════
# KEY RESULTS (2-4 items recommended)
# ═══════════════════════════════════════════════════════════════════════════════
# Each result should have:
#   - label: What was measured (e.g., "Processing time reduced")
#   - value: The result (e.g., "8 hours → 45 minutes", "99.2%", "$2.4M")
#   - context: (optional) Additional context (e.g., "per 1,000 invoices", "annually")

results:
  - label: ""
    value: ""
    context: ""
  - label: ""
    value: ""
    context: ""


# ═══════════════════════════════════════════════════════════════════════════════
# CARD STATISTICS
# ═══════════════════════════════════════════════════════════════════════════════
# These appear prominently on the case study card in listings

# The headline number/metric (e.g., "94%", "10x", "$2.4M")
stat_value: ""

# What the stat measures (e.g., "Time Saved", "ROI Increase", "Cost Reduction")
stat_metric: ""


# ═══════════════════════════════════════════════════════════════════════════════
# SEO (Search Engine Optimization)
# ═══════════════════════════════════════════════════════════════════════════════

# Custom page title (leave empty to auto-generate from title)
# Recommended format: "Case Study: [Title] | Your Company"
# Keep under 60 characters
meta_title: ""

# Meta description for search results
# Summarize the case study in 1-2 sentences
# Keep between 120-160 characters for optimal display
meta_description: ""


# ═══════════════════════════════════════════════════════════════════════════════
# RELATED CONTENT (for internal linking)
# ═══════════════════════════════════════════════════════════════════════════════
# Note: Related content improves SEO through internal linking.
# Use slugs (URL paths) to reference other content.

# Related service page slugs - SELECT from:
#   - "document-digitization"
#   - "ai-automation"
#   - "custom-software-development"
#   - "digital-transformation"
related_services:
  - ""

# Related case study slugs (enter slugs of 2-3 other published case studies)
# Example: "healthcare-records-digitization"
related_case_studies:
  - ""


# ═══════════════════════════════════════════════════════════════════════════════
# FAQs (3-5 recommended for SEO)
# ═══════════════════════════════════════════════════════════════════════════════
# FAQs generate FAQ Schema markup which improves search visibility.
# Write questions that potential clients might ask about this project.
# Example questions:
#   - "How long did the implementation take?"
#   - "What was the ROI timeline?"
#   - "How was data security handled?"
#   - "Can this solution scale?"

faqs:
  - question: ""
    answer: ""
  - question: ""
    answer: ""
  - question: ""
    answer: ""

---

## Client & Context

[INSTRUCTIONS - DELETE THIS BLOCK AND REPLACE WITH YOUR CONTENT]

Provide background about the client without revealing confidential information.

INCLUDE:
- Industry and sector
- Company size/scope (without naming)
- Relevant context that led to this project

DO NOT INCLUDE:
- Client name or identifiable details
- Specific locations (unless authorized)
- Confidential business information


## Problem

[INSTRUCTIONS - DELETE THIS BLOCK AND REPLACE WITH YOUR CONTENT]

Describe the challenge or pain point the client faced.

INCLUDE:
- The specific business problem
- Impact on operations/revenue/efficiency
- Why existing solutions weren't working
- Urgency or timeline pressures


## Goals / Success Criteria

[INSTRUCTIONS - DELETE THIS BLOCK AND REPLACE WITH YOUR CONTENT]

Define what success looked like for this project.

INCLUDE:
- Measurable targets (percentages, time savings, cost reduction)
- Qualitative goals (user experience, reliability)
- Must-have vs. nice-to-have requirements


## Solution

[INSTRUCTIONS - DELETE THIS BLOCK AND REPLACE WITH YOUR CONTENT]

Explain how you solved the problem.

INCLUDE:
- Overall approach and strategy
- Key technical decisions
- Why this approach was chosen
- Unique aspects of your solution


## Implementation

[INSTRUCTIONS - DELETE THIS BLOCK AND REPLACE WITH YOUR CONTENT]

Describe the technical approach and process.

INCLUDE:
- Project phases and timeline
- Key milestones
- Challenges overcome
- Team collaboration approach


## Results Narrative

[INSTRUCTIONS - DELETE THIS BLOCK AND REPLACE WITH YOUR CONTENT]

Provide a detailed narrative of outcomes and impact.
This complements the quantitative "results" in the frontmatter.

INCLUDE:
- Qualitative improvements
- Client feedback/testimonials (if available)
- Unexpected benefits
- Long-term impact


## Next Steps / CTA

[INSTRUCTIONS - DELETE THIS BLOCK AND REPLACE WITH YOUR CONTENT]

Describe future plans or include a call to action.

OPTIONS:
- Planned expansions of the solution
- How similar results can be achieved for readers
- Contact information or next steps
`;
