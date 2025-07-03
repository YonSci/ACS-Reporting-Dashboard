export const filterReports = (reports, filters) => {
  return reports.filter(report => {
    const sraMatch = !filters.strategicResultArea || 
      report.strategicResultArea === filters.strategicResultArea;
    
    const subSraMatch = !filters.subStrategicResultArea || 
      report.subStrategicResultArea === filters.subStrategicResultArea;
    
    const countryMatch = filters.interventionCountries.length === 0 || 
      filters.interventionCountries.includes(report.interventionCountry);
    
    const partnershipMatch = !filters.partnership || 
      (Array.isArray(report.partnerships) ? 
        report.partnerships.includes(filters.partnership) : 
        report.partnerships === filters.partnership);
    
    return sraMatch && subSraMatch && countryMatch && partnershipMatch;
  });
};

export const searchReports = (reports, searchTerm) => {
  if (!searchTerm) return reports;
  
  const lowercaseSearch = searchTerm.toLowerCase();
  return reports.filter(report => {
    return Object.values(report).some(value => {
      if (typeof value === 'string') {
        return value.toLowerCase().includes(lowercaseSearch);
      }
      if (Array.isArray(value)) {
        return value.some(item => 
          typeof item === 'string' && 
          item.toLowerCase().includes(lowercaseSearch)
        );
      }
      return false;
    });
  });
}; 