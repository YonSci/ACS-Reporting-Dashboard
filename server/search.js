import { MOCK_REPORTS } from './data.js';

// Search for Algeria reports
const algeriaReports = MOCK_REPORTS.filter(report => 
    report.interventionCountry === 'Algeria'
);

// Sort by year
const sortedReports = algeriaReports.sort((a, b) => b.year - a.year);

console.log('All Reports for Algeria (sorted by year):', JSON.stringify(sortedReports, null, 2));

// Summary
console.log('\nSummary:');
console.log('Total reports for Algeria:', sortedReports.length);
console.log('Years covered:', [...new Set(sortedReports.map(r => r.year))].sort().join(', '));
console.log('Strategic Result Areas:', [...new Set(sortedReports.map(r => r.strategicResultArea).filter(Boolean))].join(', ')); 