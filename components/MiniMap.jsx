import React from 'react';
import { getMapViewBox } from '../utils/geoUtils';

const MiniMap = ({ mapData, zoom, pan, viewportWidth, viewportHeight, onViewportChange }) => {
  const colors = {
    background: "#f8fafc",
    countries: "#94a3b8",
    viewport: "rgba(37, 99, 235, 0.2)",
    viewportBorder: "#2563eb"
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
    <div className="absolute bottom-4 right-4 z-10 bg-white rounded-lg shadow-md border border-slate-200 p-2">
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
          fill={colors.background}
        />
        
        {/* Render simplified country shapes */}
        <g>
          {mapData.map(country => (
            <path
              key={country.id}
              d={country.path}
              fill={colors.countries}
              stroke="white"
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
          fill={colors.viewport}
          stroke={colors.viewportBorder}
          strokeWidth="1"
          pointerEvents="none"
        />
      </svg>
    </div>
  );
};

export default MiniMap; 