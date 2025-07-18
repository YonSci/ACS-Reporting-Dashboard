import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const convertToCSV = (reports) => {
  // Define the columns we want to export
  const columns = [
    //'id',
    'interventionCountry',
    'strategicResultArea',
    'subStrategicResultArea',
    'partnerships',
    'sdgContribution',
    'supportingLinks',
    'details',
    'year'
  ];

  // Create the header row
  const header = columns.map(col => {
    // Convert camelCase to Title Case
    return col.replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  });

  // Convert each report to a row
  const rows = reports.map(report => {
    return columns.map(col => {
      const value = report[col];
      // Handle arrays (like partnerships)
      if (Array.isArray(value)) {
        return `"${value.join(', ')}"`;
      }
      // Handle strings that might contain commas
      if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value || '';
    });
  });

  // Combine header and rows
  const csvContent = [header, ...rows].map(row => row.join(',')).join('\n');
  return csvContent;
};

export const downloadCSV = (csvContent, filename) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  // Create a URL for the blob
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  
  // Append link, click it, and remove it
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the URL
  URL.revokeObjectURL(url);
};

export const generateShareableLink = (filters, selectedCountries) => {
  const baseUrl = window.location.origin + window.location.pathname;
  const params = new URLSearchParams();

  // Add filters to URL parameters
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) {
        // Handle arrays (like interventionCountries)
        params.append(key, value.join('|'));
      } else {
        params.append(key, value);
      }
    }
  });

  // Add selected countries to URL parameters
  if (selectedCountries.size > 0) {
    params.append('selectedCountries', Array.from(selectedCountries).join('|'));
  }

  return `${baseUrl}?${params.toString()}`;
};

export const parseShareableLink = () => {
  const params = new URLSearchParams(window.location.search);
  const filters = {
    strategicResultArea: '',
    subStrategicResultArea: '',
    interventionCountries: [],
    partnership: '',
  };
  const selectedCountries = new Set();

  // Parse filters from URL parameters
  params.forEach((value, key) => {
    if (key === 'selectedCountries') {
      value.split('|').forEach(country => selectedCountries.add(country));
    } else if (key === 'interventionCountries') {
      filters[key] = value.split('|');
    } else {
      filters[key] = value;
    }
  });

  return { filters, selectedCountries };
};

export const exportToExcel = (reports) => {
  // Convert reports to worksheet format
  const worksheet = XLSX.utils.json_to_sheet(reports.map(report => ({
    // ID: report.id,
    //ID: report._id || report.id,
    //ID: report.id || report._id,
    'Intervention Country': report.interventionCountry,
    'Strategic Result Area': report.strategicResultArea,
    'Sub Strategic Result Area': report.subStrategicResultArea,
    Partnerships: Array.isArray(report.partnerships) ? report.partnerships.join(', ') : report.partnerships,
    'SDG Contribution': report.sdgContribution,
    'Supporting Links': Array.isArray(report.supportingLinks) ? report.supportingLinks.join(', ') : report.supportingLinks,
    //Details: report.details,
    Details: Array.isArray(report.details) ? report.details.join('\n') : report.details,
    Year: report.year
  })));

  // Create workbook and append worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Reports');

  // Generate Excel file
  const timestamp = new Date().toISOString().split('T')[0];
  XLSX.writeFile(workbook, `african-development-reports-${timestamp}.xlsx`);
};

export const exportToPDF = (reports) => {
  try {
    console.log('Starting PDF export with', reports.length, 'reports');
    
    // Validate reports data
    if (!Array.isArray(reports) || reports.length === 0) {
      throw new Error('No reports data available for export');
    }

  // Create new PDF document
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Initialize fonts and styles
    doc.setFont('helvetica');
    
    // Page dimensions
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);

    // Font sizes for different heading levels
    const fontSizes = {
      h1: 18, // Increased size for organization headers
      h2: 14,
      h3: 12,
      body: 10,
      small: 9
    };

    // Helper function to add main title (H1)
    const addMainTitle = (title, y) => {
      doc.setFontSize(fontSizes.h1);
      doc.setFont('helvetica', 'bold');
      doc.text(title, margin, y);
      doc.line(margin, y + 2, pageWidth - margin, y + 2);
      return y + 10;
    };

    // Helper function to add section title (H2)
    const addSectionTitle = (title, y) => {
      doc.setFontSize(fontSizes.h2);
      doc.setFont('helvetica', 'bold');
      doc.text(title, margin, y);
      doc.setDrawColor(100, 100, 100); // Gray line
      doc.line(margin, y + 1, pageWidth - margin, y + 1);
      doc.setDrawColor(0); // Reset to black
      return y + 8;
    };

    // Helper function to add subsection title (H3)
    const addSubsectionTitle = (title, y) => {
      doc.setFontSize(fontSizes.h3);
      doc.setFont('helvetica', 'bold');
      doc.text(title, margin, y);
      return y + 6;
    };

    // Helper function to add content with proper wrapping
    const addContent = (text, y, fontSize = fontSizes.body) => {
      doc.setFontSize(fontSize);
      doc.setFont('helvetica', 'normal');
      const lines = doc.splitTextToSize(text, contentWidth);
      doc.text(lines, margin, y);
      return y + (lines.length * (fontSize * 0.5)) + 4; // Increased spacing
    };

    // Helper function to add bullet points with enhanced formatting
    const addBulletPoints = (points, y, indent = 5) => {
      doc.setFontSize(fontSizes.body);
      doc.setFont('helvetica', 'normal');
      let currentY = y;
      points.forEach(point => {
        if (point && point.trim()) {
          // Add a bullet point with proper indentation
          const bulletText = '•';
          doc.text(bulletText, margin + indent, currentY);
          
          // Add the text with additional indent from bullet
          const textIndent = indent + 5;
          const lines = doc.splitTextToSize(point.trim(), contentWidth - textIndent - 5);
          doc.text(lines, margin + textIndent, currentY);
          
          // Calculate height for multi-line text
          currentY += (lines.length * 6) + 3; // Increased spacing between bullets
        }
      });
      return currentY + 2; // Extra space after bullet list
    };

    // Helper function to convert number to lowercase Roman numeral
    const toRomanNumeral = (num) => {
      const romanNumerals = [
        { value: 10, numeral: 'x' },
        { value: 9, numeral: 'ix' },
        { value: 5, numeral: 'v' },
        { value: 4, numeral: 'iv' },
        { value: 1, numeral: 'i' }
      ];
      let result = '';
      let remaining = num;
      
      for (let i = 0; i < romanNumerals.length; i++) {
        while (remaining >= romanNumerals[i].value) {
          result += romanNumerals[i].numeral;
          remaining -= romanNumerals[i].value;
        }
      }
      return result + '.';
    };

    // Helper function to add Roman numeral bullet points with improved formatting
    const addRomanBulletPoints = (points, y, indent = 5) => {
      doc.setFontSize(fontSizes.body);
      let currentY = y + 3; // Reduced initial spacing
      
      points.forEach((point, index) => {
        if (point && point.trim()) {
          // Add lowercase Roman numeral
          const romanNumeral = toRomanNumeral(index + 1);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(0, 0, 255); // Blue color for Roman numerals
          doc.text(romanNumeral, margin + indent, currentY);
          
          // Calculate text indent based on Roman numeral width
          const romanWidth = doc.getStringUnitWidth(romanNumeral) * fontSizes.body / doc.internal.scaleFactor;
          const textIndent = indent + romanWidth * 2.5;
          
          // Format and wrap the text
          doc.setTextColor(0); // Reset to black for main text
          const lines = doc.splitTextToSize(point.trim(), contentWidth - textIndent - 5);
          doc.text(lines, margin + textIndent, currentY);
          
          // Reduced spacing between points
          const lineSpacing = 4.5; // Reduced from 6
          const extraSpacing = 3; // Reduced from 6
          currentY += (lines.length * lineSpacing) + extraSpacing;
        }
      });
      return currentY;
    };

    // Helper function to process details text into separate points
    const processDetailsText = (details) => {
      if (!details) return [];
      
      // If details is already an array, use it directly
      if (Array.isArray(details)) {
        return details.map(d => d.trim()).filter(d => d.length > 0);
      }
      
      // If it's a string, split by periods and clean up
      const detailsText = String(details).trim();
      if (!detailsText) return [];
      
      // Split by periods that are followed by a space or end of string
      return detailsText
        .split(/\.(?:\s+|$)/)
        .map(d => d.trim())
        .filter(d => d.length > 0)
        .map(d => {
          let clean = d.replace(/^[•\-\d\.\s]+/, '').trim();
          return clean + (clean.endsWith('.') ? '' : '.');
        });
    };

    // Helper function to process links
    const processLinks = (links) => {
      if (!links) return [];
      if (Array.isArray(links)) {
        return links.map(link => link.trim()).filter(link => link.length > 0);
      }
      // If it's a string, split by commas or newlines
      return String(links)
        .split(/[,\n]/)
        .map(link => link.trim())
        .filter(link => link.length > 0);
    };

    // Process each report
    let currentPage = 1;
    reports.forEach((report, index) => {
      if (index > 0) {
        doc.addPage();
        currentPage++;
      }

      let yPos = margin;

      // Organization Headers - Centered
      doc.setFontSize(fontSizes.h1);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(44, 62, 80); // Dark blue-gray color
      
      // Center UNECA text
      const unecaText = 'United Nations Economic Commission for Africa (UNECA)';
      const unecaWidth = doc.getStringUnitWidth(unecaText) * fontSizes.h1 / doc.internal.scaleFactor;
      const unecaX = (pageWidth - unecaWidth) / 2;
      doc.text(unecaText, unecaX, yPos);
      yPos += 8;
      
      // Center ACS text
      const acsText = 'African Centre for Statistics (ACS)';
      const acsWidth = doc.getStringUnitWidth(acsText) * fontSizes.h1 / doc.internal.scaleFactor;
      const acsX = (pageWidth - acsWidth) / 2;
      doc.text(acsText, acsX, yPos);
      yPos += 15;


      doc.setFontSize(12); // Set to any size you want, e.g., 10
      doc.setFont('helvetica', 'normal'); // Use 'normal' for regular, 'bold' for bold
      doc.setTextColor(0); // Black text
      doc.text('Report Generated from ACS Country-Based Reporting Dashboard', margin, yPos);
      yPos += 8;

      // Generated Date
      doc.setFontSize(12)
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0); // Black text
      doc.text(`Report Generated: ${new Date().toLocaleDateString()}`, margin, yPos);
      yPos += 15;

      // Project Information Section
      yPos = addSectionTitle('Country Context', yPos);
      const projectInfo = [
        `Country: ${report.interventionCountry || 'N/A'}`,
        `Reporting Year: ${report.year || 'N/A'}`,
        `Strategic Result Area: ${report.strategicResultArea || 'N/A'}`,
        `Sub Strategic Area: ${report.subStrategicResultArea || 'N/A'}`
      ];
      projectInfo.forEach(info => {
        yPos = addContent(info, yPos, fontSizes.body);
      });
      yPos += 8;

      // Project Details Section
      if (report.details) {
        yPos = addSectionTitle('Project Details:', yPos);
        
        // Process the details into separate points
        const details = processDetailsText(report.details);
        
        if (details.length > 0) {
          yPos += 3; // Reduced spacing
          yPos = addRomanBulletPoints(details, yPos, 10);
          yPos += 5; // Reduced spacing
        } else {
          yPos = addContent('No details available.', yPos);
          yPos += 4; // Reduced spacing
        }
      }

      // Supporting Links Section
      if (report.supportingLinks && report.supportingLinks.length > 0) {
        yPos = addSectionTitle('Supporting Links:', yPos);
        
        const links = processLinks(report.supportingLinks);
        
        if (links.length > 0) {
          yPos += 3; // Small spacing after title
          
          // Add each link with bullet points
          doc.setFontSize(fontSizes.body);
          doc.setFont('helvetica', 'normal');
          
          links.forEach(link => {
            // Add bullet point
            doc.text('•', margin + 5, yPos);
            
            // Add link text with blue color
            doc.setTextColor(0, 0, 255);
            const linkText = doc.splitTextToSize(link.trim(), contentWidth - 15);
            doc.text(linkText, margin + 10, yPos);
            
            // Reset color and move to next line
            doc.setTextColor(0);
            yPos += (linkText.length * 4.5) + 3; // Reduced spacing
          });
          
          yPos += 5; // Small spacing after links
        }
      }

      // Partnerships Section with enhanced structure
      if (report.partnerships && report.partnerships.length > 0) {
        yPos = addSectionTitle('Partnerships & Collaboration', yPos);
        
        // Add partnership context if available
        if (report.partnershipContext) {
          yPos = addContent(report.partnershipContext, yPos);
          yPos += 6;
        }

        // Process partnerships with roles if available
        const partnerships = Array.isArray(report.partnerships) ? report.partnerships : [report.partnerships];
        
        // Group partnerships by type
        const partnershipsByType = {
          'Implementation Partners': partnerships.filter(p => p.type === 'implementation'),
          'Technical Partners': partnerships.filter(p => p.type === 'technical')
        };

        // Add partnerships by type with enhanced formatting
        Object.entries(partnershipsByType).forEach(([type, partners]) => {
          if (partners.length > 0) {
            yPos = addSubsectionTitle(type, yPos + 2);
            
            // Format each partner with their role
            const formattedPartners = partners.map(p => {
              if (typeof p === 'string') return p;
              const partnerText = p.name;
              if (p.role) {
                return `${partnerText} (${p.role})`;
              }
              return partnerText;
            });
            
            yPos = addBulletPoints(formattedPartners, yPos + 2, 8);
            yPos += 4; // Add space between partner types
          }
        });
        
        yPos += 8; // Extra space after partnerships section
      }

      // SDG Contribution Section
      if (report.sdgContribution) {
        yPos = addSectionTitle('SDG Contribution', yPos);
        yPos = addContent(report.sdgContribution, yPos);
        yPos += 8;
      }

      // Supporting Links Section
      if (report.supportingLinks && report.supportingLinks.length > 0) {
        yPos = addSectionTitle('Supporting Documentation', yPos);
        yPos = addBulletPoints(
          Array.isArray(report.supportingLinks) ? report.supportingLinks : [report.supportingLinks],
          yPos,
          5
        );
      }

      // Add page number with enhanced formatting
      doc.setFontSize(fontSizes.small);
      doc.setFont('helvetica', 'italic');
      doc.text(
        `Page ${currentPage} of ${reports.length}`,
        pageWidth - margin,
        pageHeight - margin,
        { align: 'right' }
      );
  });
  
  // Save the PDF
    const fileTimestamp = new Date().toISOString().split('T')[0];
    const filename = `acs-country-report-${fileTimestamp}.pdf`;
    doc.save(filename);
    
    console.log('PDF saved successfully as:', filename);
    return true;
  } catch (error) {
    console.error('PDF generation error:', error);
    throw new Error('Failed to generate PDF: ' + error.message);
  }
}; 