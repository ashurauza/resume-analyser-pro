// Client-side PDF parsing using PDF.js
import * as pdfjsLib from 'pdfjs-dist';

// Set up the worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * Extract text from a PDF file in the browser
 * @param {File} file - The PDF file object
 * @returns {Promise<string>} - Extracted text content
 */
export async function parsePDFFile(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    
    // Extract text from all pages
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }
    
    return fullText.trim();
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to parse PDF file. Please ensure it\'s a valid PDF.');
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
