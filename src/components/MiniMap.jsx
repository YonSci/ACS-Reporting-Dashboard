import React from 'react';
import { getMapViewBox } from '../utils/geoUtils';

const MiniMap = ({ mapData, zoom, pan, viewportWidth, viewportHeight, onViewportChange }) => {
  const colors = {
    background: {
      light: "#f8fafc",
      dark: "#0f172a"
    },
    countries: {
      light: "#94a3b8",
      dark: "#475569"
    },
    viewport: {
      light: "rgba(37, 99, 235, 0.2)",
      dark: "rgba(59, 130, 246, 0.2)"
    },
    viewportBorder: {
      light: "#2563eb",
      dark: "#3b82f6"
    }
  };

  const handleViewportDrag = (e) => {
    const svgRect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - svgRect.left) / svgRect.width;
    const y = (e.clientY - svgRect.top) / svgRect.height;
    
    // Calculate new pan position based on minimap click
    const newPan = {
      x: -(x * viewportWidth * zoom) + viewportWidth / 2,
      y: -(y * viewportHeight * zoom) + viewportHeight / 2
    };
    
    onViewportChange(newPan);
  };

  // Calculate viewport rectangle in minimap
  const viewportRect = {
    x: (-pan.x / zoom) / viewportWidth,
    y: (-pan.y / zoom) / viewportHeight,
    width: 1 / zoom,
    height: 1 / zoom
  };

  return (
    <div className="absolute bottom-4 right-4 z-10 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 p-2">
      <svg 
        width="150" 
        height="150" 
        viewBox={getMapViewBox()}
        className="cursor-pointer"
        onClick={handleViewportDrag}
      >
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          className="fill-slate-50 dark:fill-slate-900"
        />
        
        {/* Render simplified country shapes */}
        <g>
          {mapData && Array.isArray(mapData) && mapData.map(country => (
            <path
              key={country.id}
              d={country.path}
              className="fill-slate-400 dark:fill-slate-600 stroke-white dark:stroke-slate-800"
              strokeWidth="0.5"
            />
          ))}
        </g>

        {/* Render viewport rectangle */}
        <rect
          x={`${viewportRect.x * 100}%`}
          y={`${viewportRect.y * 100}%`}
          width={`${viewportRect.width * 100}%`}
          height={`${viewportRect.height * 100}%`}
          className="fill-blue-500/20 dark:fill-blue-400/20 stroke-blue-600 dark:stroke-blue-400"
          strokeWidth="1"
          pointerEvents="none"
        />
      </svg>
    </div>
  );
};

export default MiniMap; 