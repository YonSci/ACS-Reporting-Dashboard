import React, { useMemo } from 'react';

const RegionalBarChart = ({ reportData }) => {
  // Define regions and their countries
  const regions = {
    'North Africa': ['Algeria', 'Egypt', 'Libya', 'Morocco', 'Tunisia'],
    'West Africa': ['Benin', 'Burkina Faso', 'Cape Verde', 'Ivory Coast', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Liberia', 'Mali', 'Mauritania', 'Niger', 'Nigeria', 'Senegal', 'Sierra Leone', 'Togo'],
    'Central Africa': ['Cameroon', 'Central African Republic', 'Chad', 'Congo', 'DR Congo', 'Equatorial Guinea', 'Gabon', 'São Tomé and Príncipe'],
    'Eastern Africa': ['Burundi', 'Comoros', 'Djibouti', 'Eritrea', 'Ethiopia', 'Kenya', 'Madagascar', 'Rwanda', 'Seychelles', 'Somalia', 'South Sudan', 'Sudan', 'Tanzania', 'Uganda'],
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

  // Color palette for bars with light/dark mode variants
  const colors = {
    light: {
      'North Africa': '#93c5fd',
      'West Africa': '#60a5fa',
      'Central Africa': '#3b82f6',
      'Eastern Africa': '#2563eb',
      'Southern Africa': '#1d4ed8'
    },
    dark: {
      'North Africa': '#60a5fa',
      'West Africa': '#3b82f6',
      'Central Africa': '#2563eb',
      'Eastern Africa': '#1d4ed8',
      'Southern Africa': '#1e40af'
    }
  };

  return (
    <div className="w-full h-[400px] bg-gray-100 dark:bg-slate-900 rounded-lg shadow-lg p-6 pointer-events-none border-2 border-gray-200 dark:border-slate-700" aria-hidden="true">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex-1">
          <h3 className="text-gray-900 dark:text-white text-base font-semibold">Interventions by Subregion</h3>
          <p className="text-gray-600 dark:text-slate-400 text-xs mt-1">Distribution of interventions across African subregions</p>
        </div>
        <div className="text-sm text-gray-700 dark:text-slate-300 font-medium ml-4">
          Total: {reportData.length} interventions
        </div>
      </div>

      {/* Chart Container with proper spacing */}
      <div className="h-[calc(100%-4rem)] flex flex-col justify-between">
        {regionalData.map(({ region, count }) => (
          <div key={region} className="relative h-[16%]">
            <div className="flex justify-between text-sm text-gray-700 dark:text-slate-300 mb-1">
              <div className="w-32 truncate font-medium">{region}</div>
              <div className="flex-1 mx-2 border-b border-dotted border-gray-300 dark:border-slate-700 self-end mb-1"></div>
              <div className="text-right whitespace-nowrap font-medium">{count} interventions</div>
            </div>
            <div className="h-4 w-full bg-gray-200/70 dark:bg-slate-800/50 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${(count / maxCount) * 100}%`,
                  backgroundColor: colors.light[region]
                }}
              />
              <div
                className="h-full rounded-full transition-all duration-300 hidden dark:block"
                style={{
                  width: `${(count / maxCount) * 100}%`,
                  backgroundColor: colors.dark[region],
                  marginTop: '-16px'
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