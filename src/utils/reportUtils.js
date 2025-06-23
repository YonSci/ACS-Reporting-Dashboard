// Search and filter utilities for reports
export const searchReports = (reports, searchTerm) => {
  if (!searchTerm) return reports;
  
  const searchTermLower = searchTerm.toLowerCase();
  return reports.filter(report => {
    // Search through all string and number fields
    const searchableFields = [
      report.title,
      report.description,
      report.strategicResultArea,
      report.subStrategicResultArea,
      report.interventionCountry,
      ...(Array.isArray(report.partnerships) ? report.partnerships : [report.partnerships]),
      report.status,
      report.projectId?.toString(),
      report.budget?.toString(),
    ].filter(Boolean); // Remove null/undefined values

    return searchableFields.some(field => 
      field.toLowerCase().includes(searchTermLower)
    );
  });
};

export const filterReportsByDate = (reports, startDate, endDate) => {
  if (!startDate && !endDate) return reports;

  return reports.filter(report => {
    const reportDate = new Date(report.date);
    if (startDate && endDate) {
      return reportDate >= new Date(startDate) && reportDate <= new Date(endDate);
    } else if (startDate) {
      return reportDate >= new Date(startDate);
    } else {
      return reportDate <= new Date(endDate);
    }
  });
};

export const applyAdvancedFilters = (reports, filters) => {
  if (!filters || !filters.length) return reports;

  return reports.filter(report => {
    return filters.some(filterGroup => {
      // Each filter group is combined with AND logic internally
      return filterGroup.every(condition => {
        const { field, operator, value } = condition;
        const reportValue = report[field];

        switch (operator) {
          case 'equals':
            return reportValue === value;
          case 'contains':
            return String(reportValue).toLowerCase().includes(String(value).toLowerCase());
          case 'greaterThan':
            return Number(reportValue) > Number(value);
          case 'lessThan':
            return Number(reportValue) < Number(value);
          case 'between':
            const [min, max] = value;
            return Number(reportValue) >= Number(min) && Number(reportValue) <= Number(max);
          case 'in':
            return Array.isArray(value) ? value.includes(reportValue) : false;
          default:
            return true;
        }
      });
    });
  });
};

// Local storage key for saved filter presets
const FILTER_PRESETS_KEY = 'reportFilterPresets';

export const saveFilterPreset = (preset) => {
  const existingPresets = JSON.parse(localStorage.getItem(FILTER_PRESETS_KEY) || '[]');
  const updatedPresets = [...existingPresets, { ...preset, id: Date.now() }];
  localStorage.setItem(FILTER_PRESETS_KEY, JSON.stringify(updatedPresets));
  return updatedPresets;
};

export const getFilterPresets = () => {
  return JSON.parse(localStorage.getItem(FILTER_PRESETS_KEY) || '[]');
};

export const deleteFilterPreset = (presetId) => {
  const existingPresets = JSON.parse(localStorage.getItem(FILTER_PRESETS_KEY) || '[]');
  const updatedPresets = existingPresets.filter(preset => preset.id !== presetId);
  localStorage.setItem(FILTER_PRESETS_KEY, JSON.stringify(updatedPresets));
  return updatedPresets;
}; 