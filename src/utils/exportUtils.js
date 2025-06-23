export const convertToCSV = (reports) => {
  // Define the columns we want to export
  const columns = [
    'id',
    'title',
    'description',
    'interventionCountry',
    'strategicResultArea',
    'subStrategicResultArea',
    'partnerships',
    'status',
    'date',
    'impact'
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