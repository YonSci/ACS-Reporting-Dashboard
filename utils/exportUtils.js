import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const convertToCSV = (reports) => {
  // Define all columns we want to export
  const columns = [
    'id',
    'strategicResultArea',
    'subStrategicResultArea',
    'interventionCountry',
    'partnerships',
    'year',
    'sdgContribution',
    'status',
    'details'
  ];

  // Create the header row with proper formatting
  const header = [
    'ID',
    'Strategic Result Area',
    'Sub Strategic Result Area',
    'Country',
    'Partnerships',
    'Year',
    'SDG Contribution',
    'Status',
    'Project Details'
  ];

  // Convert each report to a row with proper formatting
  const rows = reports.map(report => {
    const row = [];
    columns.forEach(col => {
      let value = report[col];
      
      // Format arrays (like partnerships and details)
      if (Array.isArray(value)) {
        value = value.join('\n');
      }
      
      // Handle strings that might contain commas or newlines
      if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
        value = `"${value.replace(/"/g, '""')}"`;
      }
      
      row.push(value || '');
    });
    return row;
  });

  // Combine header and rows
  const csvContent = [header, ...rows].map(row => row.join(',')).join('\n');
  return csvContent;
};

export const downloadCSV = (csvContent, filename) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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
  // Define worksheet data with all fields
  const ws_data = [
    // Header row with proper column names
    ['ID', 'Strategic Result Area', 'Sub Strategic Result Area', 'Country', 
     'Partnerships', 'Year', 'SDG Contribution', 'Status', 'Project Details'],
  ];

  // Add data rows with proper formatting
  reports.forEach(report => {
    const details = Array.isArray(report.details) ? report.details.join('\n') : report.details;
    ws_data.push([
      report.id,
      report.strategicResultArea,
      report.subStrategicResultArea,
      report.interventionCountry,
      Array.isArray(report.partnerships) ? report.partnerships.join(', ') : report.partnerships,
      report.year,
      report.sdgContribution,
      report.status,
      details
    ]);
  });

  // Create worksheet
  const ws = XLSX.utils.aoa_to_sheet(ws_data);

  // Set column widths
  const colWidths = [
    { wch: 10 },  // ID
    { wch: 30 },  // Strategic Result Area
    { wch: 40 },  // Sub Strategic Result Area
    { wch: 20 },  // Country
    { wch: 30 },  // Partnerships
    { wch: 10 },  // Year
    { wch: 20 },  // SDG Contribution
    { wch: 15 },  // Status
    { wch: 60 }   // Project Details
  ];
  ws['!cols'] = colWidths;

  // Enable text wrapping for all cells
  for (let cell in ws) {
    if (cell[0] === '!') continue;
    ws[cell].s = { alignment: { wrapText: true, vertical: 'top' } };
  }

  // Create workbook and append worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Reports");

  // Generate timestamp for filename
  const timestamp = new Date().toISOString().split('T')[0];
  
  // Save the file with new name
  XLSX.writeFile(wb, `african-centre-for-statistics-reports-${timestamp}.xlsx`);
};

export const exportToPDF = (reports) => {
  // Create new PDF document
  const doc = new jsPDF('l', 'mm', 'a4'); // landscape orientation
  
  // Add title
  doc.setFontSize(16);
  doc.text('African Centre for Statistics Reports', 14, 15);
  
  // Add timestamp
  doc.setFontSize(10);
  const timestamp = new Date().toISOString().split('T')[0];
  doc.text(`Generated on: ${timestamp}`, 14, 22);

  // Prepare table data with all fields
  const tableData = reports.map(report => {
    const details = Array.isArray(report.details) ? report.details.join('\n• ') : report.details;
    return [
      report.id,
      report.strategicResultArea,
      report.subStrategicResultArea,
      report.interventionCountry,
      Array.isArray(report.partnerships) ? report.partnerships.join(', ') : report.partnerships,
      report.year,
      report.sdgContribution,
      report.status,
      details ? `• ${details}` : ''
    ];
  });

  // Add table with improved formatting
  doc.autoTable({
    startY: 25,
    head: [['ID', 'Strategic Result Area', 'Sub Strategic Result Area', 'Country', 
            'Partnerships', 'Year', 'SDG', 'Status', 'Project Details']],
    body: tableData,
    headStyles: { 
      fillColor: [41, 128, 185], 
      textColor: 255,
      fontSize: 8,
      halign: 'center'
    },
    bodyStyles: {
      fontSize: 8,
      cellPadding: 3
    },
    columnStyles: {
      0: { cellWidth: 15 },  // ID
      1: { cellWidth: 35 },  // Strategic Result Area
      2: { cellWidth: 40 },  // Sub Strategic Result Area
      3: { cellWidth: 25 },  // Country
      4: { cellWidth: 30 },  // Partnerships
      5: { cellWidth: 15 },  // Year
      6: { cellWidth: 20 },  // SDG
      7: { cellWidth: 20 },  // Status
      8: { cellWidth: 'auto' } // Project Details
    },
    styles: {
      overflow: 'linebreak',
      cellWidth: 'wrap'
    },
    margin: { top: 25, right: 14, bottom: 20, left: 14 }
  });

  // Save the PDF with new name
  doc.save(`african-centre-for-statistics-reports-${timestamp}.pdf`);
}; 