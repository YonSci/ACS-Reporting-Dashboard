import React, { useState, useCallback, useRef, useEffect } from 'react';
import { getMapViewBox } from '../utils/geoUtils';
import MiniMap from './MiniMap';
import { useTheme } from '../utils/themeContext';
import '../index.css';

const AfricaMap = ({ mapData, selectedCountries, onCountrySelect, reportData }) => {
  const { isDark } = useTheme();
  const [tooltip, setTooltip] = useState(null);
  const [zoom, setZoom] = useState(1.6);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  
  // Enhanced color palette with theme colors
  const colors = {
    selected: {
      light: "#2563eb",
      dark: "#3b82f6"
    },
    unselected: {
      light: "#94a3b8",
      dark: "#475569"
    },
    withData: {
      light: "#bfdbfe", // Light blue for countries with APPRM data
      dark: "#60a5fa"
    },
    background: {
      light: "#ffffff",
      dark: "#10142c"
    },
    stroke: {
      light: "#1e293b",
      dark: "#334155"
    },
    legendText: {
      light: "#1e293b",
      dark: "#e2e8f0"
    },
    legendBackground: {
      light: "#ffffff",
      dark: "#1e293b"
    },
    hoverOutline: {
      light: "#3b82f6",
      dark: "#60a5fa"
    },
    glowColor: {
      light: "rgba(59, 130, 246, 0.5)",
      dark: "rgba(96, 165, 250, 0.5)"
    }
  };

  // Define regions
  const regions = {
    'North Africa': ['Algeria', 'Egypt', 'Libya', 'Morocco', 'Tunisia'],
    'West Africa': ['Benin', 'Burkina Faso', 'Cape Verde', 'Ivory Coast', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Liberia', 'Mali', 'Mauritania', 'Niger', 'Nigeria', 'Senegal', 'Sierra Leone', 'Togo'],
    'Central Africa': ['Cameroon', 'Central African Republic', 'Chad', 'Congo', 'DR Congo', 'Equatorial Guinea', 'Gabon', 'São Tomé and Príncipe'],
    'Eastern Africa': ['Burundi', 'Comoros', 'Djibouti', 'Eritrea', 'Ethiopia', 'Kenya', 'Madagascar', 'Rwanda', 'Seychelles', 'Somalia', 'South Sudan', 'Sudan', 'Tanzania', 'Uganda'],
    'Southern Africa': ['Angola', 'Botswana', 'Eswatini', 'Lesotho', 'Malawi', 'Mozambique', 'Namibia', 'South Africa', 'Zambia', 'Zimbabwe']
  };

  // Track viewport size
  useEffect(() => {
    const updateViewportSize = () => {
      if (containerRef.current) {
        setViewportSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };

    updateViewportSize();
    window.addEventListener('resize', updateViewportSize);
    return () => window.removeEventListener('resize', updateViewportSize);
  }, []);

  const handleMouseMove = (event, countryName) => {
    if (!isDragging) {
      const reports = reportData.filter(r => r.interventionCountry === countryName);
      setTooltip({ 
        content: countryName,
        reports: reports.length,
        x: event.clientX,
        y: event.clientY 
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  const handleZoom = (factor) => {
    setZoom(prev => {
      const newZoom = prev + factor;
      return newZoom > 0.5 && newZoom < 3 ? newZoom : prev;
    });
  };

  const handleMouseDown = useCallback((e) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  }, [pan]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseDrag = useCallback((e) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  }, [isDragging, dragStart]);

  React.useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseDrag);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseDrag);
    };
  }, [handleMouseUp, handleMouseDrag]);

  const handleViewportChange = (newPan) => {
    setPan(newPan);
  };

  const handleResetView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  // Clear all selections
  const handleClearSelection = () => {
    onCountrySelect(null, new Set());
  };

  return (
    <div ref={containerRef} className="relative w-full h-[600px] bg-gray-100 dark:bg-slate-900 rounded-lg shadow-lg overflow-hidden border-2 border-gray-200 dark:border-slate-700">
      {/* Selected Countries Badge and Clear Button */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <div className="bg-blue-600 dark:bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
          <span>Selected Countries</span>
          <span className="bg-blue-500 dark:bg-blue-400 px-2 py-0.5 rounded-full text-xs">
            {selectedCountries.size}
          </span>
        </div>
        
        {selectedCountries.size > 0 && (
          <button
            onClick={handleClearSelection}
            className="bg-red-600 dark:bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
            title="Clear all selections"
          >
            Clear
          </button>
        )}
      </div>

      {/* Zoom Controls with Tooltips */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <div className="relative group">
          <button
            onClick={() => handleZoom(0.2)}
            className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            aria-label="Zoom in"
          >
            <svg className="w-6 h-6 text-slate-800 dark:text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 hidden group-hover:block">
            <div className="bg-slate-800 dark:bg-slate-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Zoom in
            </div>
          </div>
        </div>
        
        <div className="relative group">
          <button
            onClick={() => handleZoom(-0.2)}
            className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            aria-label="Zoom out"
          >
            <svg className="w-6 h-6 text-slate-800 dark:text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 hidden group-hover:block">
            <div className="bg-slate-800 dark:bg-slate-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Zoom out
            </div>
          </div>
        </div>

        <div className="relative group">
          <button
            onClick={handleResetView}
            className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            aria-label="Reset view"
          >
            <svg className="w-6 h-6 text-slate-800 dark:text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v7h7M20 20v-7h-7" />
            </svg>
          </button>
          <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 hidden group-hover:block">
            <div className="bg-slate-800 dark:bg-slate-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Reset view
            </div>
          </div>
        </div>
      </div>

      {/* Summary Panel for Selected Countries */}
      {selectedCountries.size > 0 && (
        <div className="absolute left-4 bottom-4 z-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
          <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm mb-2">Selected Countries Summary</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <span className="text-slate-900 dark:text-slate-100">Total Countries:</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">{selectedCountries.size}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-100">
              <span className="text-slate-900 dark:text-slate-100">Total Interventions:</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">
                {reportData.filter(r => selectedCountries.has(r.interventionCountry)).length}
              </span>
            </div>
            <div className="text-xs text-slate-900 dark:text-slate-100 mt-1">
              Click countries to update selection
            </div>
          </div>
        </div>
      )}

             {/* Legend */}
       <div className="absolute top-4 right-4 z-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-3 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
         <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-xs mb-2">Map Legend</h4>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: isDark ? colors.selected.dark : colors.selected.light }}></div>
            <span className="text-xs text-slate-900 dark:text-slate-100">Selected Countries</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: isDark ? colors.withData.dark : colors.withData.light }}></div>
            <span className="text-xs text-slate-900 dark:text-slate-100">Countries with APPRM Data</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: isDark ? colors.unselected.dark : colors.unselected.light }}></div>
            <span className="text-xs text-slate-900 dark:text-slate-100">Countries without Data</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-slate-600 dark:text-slate-400">Click to select countries</span>
          </div>
        </div>
      </div>

      {zoom > 2.5 && (
        <MiniMap
          mapData={mapData}
          zoom={zoom}
          pan={pan}
          viewportWidth={viewportSize.width}
          viewportHeight={viewportSize.height}
          onViewportChange={handleViewportChange}
        />
      )}

      <svg 
        ref={mapRef}
        viewBox={getMapViewBox()}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ 
          backgroundColor: isDark ? colors.background.dark : colors.background.light,
          transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-in-out'
        }}
        onMouseDown={handleMouseDown}
      >
        <defs>
          {/* Enhanced glow effect */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feFlood floodColor={colors.glowColor.light} result="glowColor"/>
            <feComposite in="glowColor" in2="coloredBlur" operator="in" result="softGlow"/>
            <feMerge>
              <feMergeNode in="softGlow"/>
              <feMergeNode in="softGlow"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Enhanced hover effect */}
          <filter id="hover-outline" x="-10%" y="-10%" width="120%" height="120%">
            <feMorphology operator="dilate" radius="1.5" in="SourceAlpha" result="expanded"/>
            <feFlood floodColor={colors.hoverOutline.light} result="color"/>
            <feComposite in="color" in2="expanded" operator="in" result="border"/>
            <feGaussianBlur in="border" stdDeviation="1.5" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>

        <g className="countries">
          {mapData && Array.isArray(mapData) && mapData.map(country => {
            const isSelected = selectedCountries.has(country.name);
            const reports = reportData.filter(r => r.interventionCountry === country.name);
            const hasData = reports.length > 0;

            // Determine country fill color based on state
            let fillColor;
            if (isSelected) {
              fillColor = isDark ? colors.selected.dark : colors.selected.light;
            } else if (hasData) {
              fillColor = isDark ? colors.withData.dark : colors.withData.light;
            } else {
              fillColor = isDark ? colors.unselected.dark : colors.unselected.light;
            }

            return (
              <path
                key={country.name}
                d={country.path}
                fill={fillColor}
                stroke={isDark ? colors.stroke.dark : colors.stroke.light}
                strokeWidth={isSelected ? "1.5" : "0.5"}
                className={`
                  transform-gpu
                  transition-all
                  duration-300
                  ease-in-out
                  hover:opacity-90
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-600
                  focus:ring-offset-2
                  ${isSelected ? 'filter-glow scale-[1.02]' : 'scale-100'}
                `}
                style={{
                  filter: isSelected ? 'url(#glow)' : 'none',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    filter: 'url(#hover-outline)',
                    strokeWidth: '2',
                  },
                }}
                onClick={() => onCountrySelect(country.name)}
                onMouseMove={(e) => handleMouseMove(e, country.name)}
                onMouseLeave={handleMouseLeave}
                data-country-name={country.name}
                aria-label={`${country.name}${reports.length > 0 ? ` (${reports.length} interventions)` : ''}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { 
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onCountrySelect(country.name);
                  }
                }}
              />
            );
          })}
        </g>
      </svg>

      {/* Enhanced Tooltip */}
      {tooltip && (
        <div 
          className="absolute z-20 p-3 bg-slate-900 rounded-lg shadow-lg border border-slate-700 text-white transform transition-all duration-200 ease-in-out"
          style={{ 
            left: `${tooltip.x}px`, 
            top: `${tooltip.y}px`,
            transform: 'translate(-50%, -120%) scale(1)',
            opacity: 1,
            pointerEvents: 'none'
          }}
        >
          <h3 className="font-semibold text-white">{tooltip.content}</h3>
          {tooltip.reports > 0 && (
            <p className="text-sm text-gray-100 mt-1">
              {tooltip.reports} intervention{tooltip.reports !== 1 ? 's' : ''}
            </p>
          )}
          <p className="text-xs text-gray-200 mt-1">
            {selectedCountries.has(tooltip.content) ? 'Click to deselect' : 'Click to select'}
          </p>
        </div>
      )}
    </div>
  );
};

export default AfricaMap; 