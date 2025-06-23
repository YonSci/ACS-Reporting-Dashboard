import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const InterventionChart = ({ reportData }) => {
  // Group reports by region
  const regionCounts = React.useMemo(() => {
    const regions = {
      'North Africa': ['Algeria', 'Egypt', 'Libya', 'Morocco', 'Tunisia'],
      'West Africa': ['Benin', 'Burkina Faso', 'Cape Verde', 'Ivory Coast', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Liberia', 'Mali', 'Mauritania', 'Niger', 'Nigeria', 'Senegal', 'Sierra Leone', 'Togo'],
      'Central Africa': ['Cameroon', 'Central African Republic', 'Chad', 'Congo', 'DR Congo', 'Equatorial Guinea', 'Gabon', 'São Tomé and Príncipe'],
      'East Africa': ['Burundi', 'Comoros', 'Djibouti', 'Eritrea', 'Ethiopia', 'Kenya', 'Madagascar', 'Malawi', 'Mauritius', 'Mozambique', 'Rwanda', 'Seychelles', 'Somalia', 'South Sudan', 'Sudan', 'Tanzania', 'Uganda'],
      'Southern Africa': ['Angola', 'Botswana', 'Eswatini', 'Lesotho', 'Namibia', 'South Africa', 'Zambia', 'Zimbabwe']
    };

    const counts = {
      'North Africa': 0,
      'West Africa': 0,
      'Central Africa': 0,
      'East Africa': 0,
      'Southern Africa': 0
    };

    reportData.forEach(report => {
      for (const [region, countries] of Object.entries(regions)) {
        if (countries.includes(report.interventionCountry)) {
          counts[region]++;
          break;
        }
      }
    });

    return counts;
  }, [reportData]);

  const chartData = {
    labels: Object.keys(regionCounts),
    datasets: [
      {
        label: 'Number of Interventions',
        data: Object.values(regionCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',   // North Africa
          'rgba(54, 162, 235, 0.7)',   // West Africa
          'rgba(255, 206, 86, 0.7)',   // Central Africa
          'rgba(75, 192, 192, 0.7)',   // East Africa
          'rgba(153, 102, 255, 0.7)',  // Southern Africa
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Interventions by Region',
        color: '#e2e8f0',
        font: {
          size: 16,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#e2e8f0',
        bodyColor: '#e2e8f0',
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#94a3b8',
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
      },
      x: {
        ticks: {
          color: '#94a3b8',
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-md shadow-2xl rounded-xl p-4 h-[400px]">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default InterventionChart; 