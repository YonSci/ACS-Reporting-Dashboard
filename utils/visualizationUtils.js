import { scaleLinear } from 'd3-scale';
import { interpolateRdYlBu } from 'd3-scale-chromatic';

export const calculateCountryMetrics = (country, reportData) => {
  const countryReports = reportData.filter(r => r.interventionCountry === country);
  return {
    interventionCount: countryReports.length,
    totalImpact: countryReports.reduce((sum, report) => sum + (report.impact || 0), 0),
    averageImpact: countryReports.length > 0 
      ? countryReports.reduce((sum, report) => sum + (report.impact || 0), 0) / countryReports.length 
      : 0
  };
};

export const getChoroplethColor = (value, maxValue) => {
  if (value === 0) return '#e5e7eb'; // gray-200 for no data
  
  const colorScale = scaleLinear()
    .domain([0, maxValue])
    .range([0, 1]);
    
  return interpolateRdYlBu(1 - colorScale(value)); // Inverse scale for better visual
};

export const getBubbleSize = (value, maxValue, baseSize = 20) => {
  if (value === 0) return 0;
  
  const scale = scaleLinear()
    .domain([0, maxValue])
    .range([5, baseSize]);
    
  return scale(value);
};

export const calculateMapMetrics = (mapData, reportData) => {
  const metrics = mapData.map(country => ({
    ...country,
    metrics: calculateCountryMetrics(country.name, reportData)
  }));

  const maxInterventions = Math.max(...metrics.map(c => c.metrics.interventionCount));
  const maxImpact = Math.max(...metrics.map(c => c.metrics.totalImpact));

  return {
    metrics,
    maxInterventions,
    maxImpact
  };
};

export const getLegendItems = (mode, maxValue) => {
  switch (mode) {
    case 'choropleth':
      return [
        { color: getChoroplethColor(0, maxValue), label: 'No interventions' },
        { color: getChoroplethColor(maxValue * 0.25, maxValue), label: 'Low' },
        { color: getChoroplethColor(maxValue * 0.5, maxValue), label: 'Medium' },
        { color: getChoroplethColor(maxValue * 0.75, maxValue), label: 'High' },
        { color: getChoroplethColor(maxValue, maxValue), label: 'Very High' }
      ];
    case 'bubble':
      return [
        { size: getBubbleSize(maxValue * 0.25, maxValue), label: 'Low Impact' },
        { size: getBubbleSize(maxValue * 0.5, maxValue), label: 'Medium Impact' },
        { size: getBubbleSize(maxValue * 0.75, maxValue), label: 'High Impact' },
        { size: getBubbleSize(maxValue, maxValue), label: 'Very High Impact' }
      ];
    default:
      return [
        { color: '#e5e7eb', label: 'No Selection' },
        { color: '#3b82f6', label: 'Selected' }
      ];
  }
}; 