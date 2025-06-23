import React, { useMemo } from 'react';

const RegionalBarChart = ({ reportData }) => {
  // Define regions and their countries
  const regions = {
    'North Africa': ['Algeria', 'Egypt', 'Libya', 'Morocco', 'Tunisia'],
    'West Africa': ['Benin', 'Burkina Faso', 'Cape Verde', 'Ivory Coast', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Liberia', 'Mali', 'Mauritania', 'Niger', 'Nigeria', 'Senegal', 'Sierra Leone', 'Togo'],
    'Central Africa': ['Cameroon', 'Central African Republic', 'Chad', 'Congo', 'DR Congo', 'Equatorial Guinea', 'Gabon', 'São Tomé and Príncipe'],
    'East Africa': ['Burundi', 'Comoros', 'Djibouti', 'Eritrea', 'Ethiopia', 'Kenya', 'Madagascar', 'Rwanda', 'Seychelles', 'Somalia', 'South Sudan', 'Sudan', 'Tanzania', 'Uganda'],
    'Southern Africa': ['Angola', 'Botswana', 'Eswatini', 'Lesotho', 'Malawi', 'Mozambique', 'Namibia', 'South Africa', 'Zambia', 'Zimbabwe']
  };

  // Calculate interventions by region
  const regionalData = useMemo(() => {
    const data = Object.entries(regions).map(([region, countries]) => {
      const count = reportData.filter(report => 
        countries.includes(report.interventionCountry)
      ).length;
      return { region, count };
    });
    
    // Sort by count in descending order
    return data.sort((a, b) => b.count - a.count);
  }, [reportData]);

  // Find maximum count for scaling
  const maxCount = Math.max(...regionalData.map(d => d.count));

  // Color palette for bars
  const colors = {
    'North Africa': '#60a5fa',
    'West Africa': '#3b82f6',
    'Central Africa': '#2563eb',
    'East Africa': '#1d4ed8',
    'Southern Africa': '#1e40af'
  };

  return (
    <div className="w-full h-[400px] bg-slate-900 rounded-lg shadow-lg p-6 pointer-events-none" aria-hidden="true">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex-1">
          <h3 className="text-white text-base font-semibold">Interventions by Region</h3>
          <p className="text-slate-400 text-xs mt-1">Distribution of interventions across African regions</p>
        </div>
        <div className="text-sm text-slate-300 font-medium ml-4">
          Total: {reportData.length} interventions
        </div>
      </div>

      {/* Chart Container with proper spacing */}
      <div className="h-[calc(100%-4rem)] flex flex-col justify-between">
        {regionalData.map(({ region, count }) => (
          <div key={region} className="relative h-[16%]">
            <div className="flex justify-between text-sm text-slate-300 mb-1">
              <div className="w-32 truncate">{region}</div>
              <div className="flex-1 mx-2 border-b border-dotted border-slate-700 self-end mb-1"></div>
              <div className="text-right whitespace-nowrap">{count} interventions</div>
            </div>
            <div className="h-4 w-full bg-slate-800/50 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(count / maxCount) * 100}%`,
                  backgroundColor: colors[region]
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegionalBarChart; 