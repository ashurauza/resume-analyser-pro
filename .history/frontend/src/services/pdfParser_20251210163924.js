// Client-side PDF parsing using PDF.js
import * as pdfjsLib from 'pdfjs-dist';

// Set up the worker - use unpkg CDN which is more reliable
const PDFJS_VERSION = pdfjsLib.version || '4.0.379';
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.mjs`;

/**
 * Extract text from a PDF file in the browser
 * @param {File} file - The PDF file object
 * @returns {Promise<string>} - Extracted text content
 */
export async function parsePDFFile(file) {
  try {
    // Validate file type
    if (!file) {
      throw new Error('No file provided');
    }
    
    if (!file.type || file.type !== 'application/pdf') {
      throw new Error('File must be a PDF');
    }
    
    console.log('Starting PDF parse for:', file.name, 'Size:', file.size);
    
    const arrayBuffer = await file.arrayBuffer();
    console.log('ArrayBuffer created, loading PDF document...');
    
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    console.log('PDF loaded, pages:', pdf.numPages);
    
    let fullText = '';
    
    // Extract text from all pages
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      console.log(`Processing page ${pageNum}/${pdf.numPages}...`);
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }
    
    console.log('PDF parsing complete. Text length:', fullText.length);
    
    if (!fullText.trim()) {
      throw new Error('No text content found in PDF. The PDF may be image-based or empty.');
    }
    
    return fullText.trim();
  } catch (error) {
    console.error('Error parsing PDF:', error);
    
    // Provide more specific error messages
    if (error.message.includes('Invalid PDF')) {
      throw new Error('Invalid PDF file. Please upload a valid PDF document.');
    } else if (error.message.includes('password')) {
      throw new Error('Password-protected PDFs are not supported.');
    } else if (error.message.includes('No text content')) {
      throw error;
    } else {
      throw new Error(`Failed to parse PDF: ${error.message}`);
    }
  }
}

/**
 * Extract metadata and structure from PDF
 * @param {string} text - Extracted PDF text
 * @returns {Object} - Structured resume data
 */
export function extractResumeData(text) {
  const lines = text.split('\n').filter(line => line.trim());
  
  // Extract email
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g;
  const emails = text.match(emailRegex) || [];
  
  // Extract phone numbers
  const phoneRegex = /(?:\+?1[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}/g;
  const phones = text.match(phoneRegex) || [];
  
  // Extract URLs
  const urlRegex = /https?:\/\/[^\s]+/g;
  const urls = text.match(urlRegex) || [];
  
  // Detect sections
  const sections = detectSections(text);
  
  return {
    text,
    contactInfo: {
      emails,
      phones,
      urls
    },
    sections,
    wordCount: text.split(/\s+/).length,
    lineCount: lines.length
  };
}

/**
 * Detect common resume sections
 * @param {string} text - Resume text
 * @returns {Object} - Detected sections
 */
function detectSections(text) {
  const sectionKeywords = {
    experience: /(?:work\s+)?experience|employment|professional\s+background/i,
    education: /education|academic|qualifications/i,
    skills: /skills|technologies|competencies|expertise/i,
    summary: /summary|profile|objective|about/i,
    projects: /projects|portfolio/i,
    certifications: /certifications?|licenses?|credentials/i
  };
  
  const foundSections = {};
  
  for (const [section, regex] of Object.entries(sectionKeywords)) {
    foundSections[section] = regex.test(text);
  }
  
  return foundSections;
}
