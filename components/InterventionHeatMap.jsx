import React, { useMemo } from 'react';
import { getMapViewBox } from '../utils/geoUtils';

const InterventionHeatMap = ({ mapData, reportData }) => {
  // Enhanced color palette for heat map with light/dark mode
  const colors = {
    background: {
      light: "#f1f5f9",
      dark: "#1e293b"
    },
    stroke: {
      light: "#64748b",
      dark: "#475569"
    },
    heatmap: {
      light: {
        0: "#cbd5e1", // No reports - light gray
        1: "#93c5fd", // Few reports - light blue
        2: "#60a5fa", // Some reports - medium blue
        3: "#3b82f6", // Many reports - bright blue
        4: "#2563eb", // Most reports - dark blue
      },
      dark: {
        0: "#94a3b8", // No reports - light gray
        1: "#60a5fa", // Few reports - light blue
        2: "#3b82f6", // Some reports - medium blue
        3: "#2563eb", // Many reports - bright blue
        4: "#1d4ed8", // Most reports - dark blue
      }
    }
  };

  // Calculate ranges for the legend
  const ranges = useMemo(() => {
    const counts = mapData.map(country => 
      reportData.filter(r => r.interventionCountry === country.name).length
    );
    const maxCount = Math.max(...counts);
    
    return {
      0: '0',
      1: `1-${Math.floor(maxCount/4)}`,
      2: `${Math.floor(maxCount/4 + 1)}-${Math.floor(maxCount/2)}`,
      3: `${Math.floor(maxCount/2 + 1)}-${Math.floor(3*maxCount/4)}`,
      4: `${Math.floor(3*maxCount/4 + 1)}+`
    };
  }, [mapData, reportData]);

  // Calculate heat map color based on report count
  const getHeatMapColor = (countryName, isDark = false) => {
    const reports = reportData.filter(r => r.interventionCountry === countryName).length;
    const maxReports = Math.max(...mapData.map(country => 
      reportData.filter(r => r.interventionCountry === country.name).length
    ));
    
    if (reports === 0) return isDark ? colors.heatmap.dark[0] : colors.heatmap.light[0];
    const normalized = Math.ceil((reports / maxReports) * 4);
    return isDark ? colors.heatmap.dark[normalized] : colors.heatmap.light[normalized];
  };

  return (
    <div className="w-full h-[400px] bg-gray-100 dark:bg-slate-900 rounded-lg shadow-lg overflow-hidden relative border-2 border-gray-200 dark:border-slate-700">
      {/* Heat Map Title */}
      <div className="absolute left-4 top-4 z-10">
        <h3 className="text-gray-900 dark:text-white text-base font-semibold">Interventions Heat Map</h3>
        <p className="text-gray-600 dark:text-slate-400 text-xs mt-1">Distribution of interventions across regions</p>
      </div>

      {/* Legend */}
      <div className="absolute right-4 top-4 bg-white/70 dark:bg-slate-800/50 p-2 rounded z-10 shadow-md">
        <div className="flex flex-col gap-1">
          {Object.entries(colors.heatmap.light).map(([level, color], index) => (
            <div key={level} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded hidden dark:block" style={{ backgroundColor: colors.heatmap.dark[level] }}></div>
              <div className="w-3 h-3 rounded dark:hidden" style={{ backgroundColor: colors.heatmap.light[level] }}></div>
              <span className="text-xs text-gray-700 dark:text-slate-300 min-w-[100px]">
                {index === 0 ? `No reports (${ranges[0]})` :
                 index === 1 ? `Few (${ranges[1]})` :
                 index === 2 ? `Some (${ranges[2]})` :
                 index === 3 ? `Many (${ranges[3]})` :
                 `Most (${ranges[4]})`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Map Container with improved sizing */}
      <div className="absolute inset-0 pt-2 pb-1 px-1 flex items-center justify-center">
        <div className="w-full h-full max-w-[900px] flex items-center justify-center">
          <svg 
            viewBox={getMapViewBox()}
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full pointer-events-none"
            style={{ 
              backgroundColor: 'transparent',
              transform: 'scale(1.5)',
              transformOrigin: 'center center'
            }}
          >
            <g className="countries dark:hidden">
              {mapData.map(country => (
                <path
                  key={country.id}
                  d={country.path}
                  fill={getHeatMapColor(country.name, false)}
                  stroke={colors.stroke.light}
                  strokeWidth="0.3"
                  style={{ pointerEvents: 'none' }}
                  aria-hidden="true"
                />
              ))}
            </g>
            <g className="countries hidden dark:block">
              {mapData.map(country => (
                <path
                  key={country.id}
                  d={country.path}
                  fill={getHeatMapColor(country.name, true)}
                  stroke={colors.stroke.dark}
                  strokeWidth="0.3"
                  style={{ pointerEvents: 'none' }}
                  aria-hidden="true"
                />
              ))}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default InterventionHeatMap; 