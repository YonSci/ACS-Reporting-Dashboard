import React, { useState, useCallback } from 'react';
import { getMapViewBox } from '../utils/geoUtils';
import '../index.css';

const AfricaMap = ({ mapData, selectedCountries, onCountrySelect, reportData }) => {
  const [tooltip, setTooltip] = useState(null);
  const [zoom, setZoom] = useState(2.0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const countriesWithReports = React.useMemo(() => {
    return new Set(Array.from(selectedCountries));
  }, [selectedCountries]);

  React.useEffect(() => {
    if (selectedCountries.size === 0) {
      setTooltip(null);
    }
  }, [selectedCountries]);

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
    if (e.button === 0) { // Left click only
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

  return (
    <div className="relative w-full h-[600px] bg-slate-50 rounded-lg shadow-lg overflow-hidden">
      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={() => handleZoom(0.2)}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Zoom in"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button
          onClick={() => handleZoom(-0.2)}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Zoom out"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <button
          onClick={() => {
            setZoom(1);
            setPan({ x: 0, y: 0 });
          }}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Reset view"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v7h7M20 20v-7h-7" />
          </svg>
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10 bg-white p-3 rounded-lg shadow-md">
        <h4 className="font-semibold text-sm mb-2">Map Legend</h4>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm">Selected Countries</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-300 rounded"></div>
            <span className="text-sm">Available Countries</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
            <span>Click countries to select multiple</span>
          </div>
        </div>
      </div>

      <svg 
        viewBox={getMapViewBox()}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ 
          backgroundColor: '#f8fafc',
          transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`
        }}
        onMouseDown={handleMouseDown}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <pattern id="stripes" patternUnits="userSpaceOnUse" width="6" height="6">
            <path d="M0 0L6 6M-1 5L1 7M5 -1L7 1" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
          </pattern>
        </defs>

        <g className="countries">
          {mapData.map(country => {
            const isSelected = selectedCountries.has(country.name);
            const hasReports = reportData.filter(r => r.interventionCountry === country.name).length > 0;
            const reports = reportData.filter(r => r.interventionCountry === country.name);

            return (
              <path
                key={country.id}
                d={country.path}
                fill={isSelected ? "#3b82f6" : "#cbd5e1"}
                stroke="white"
                strokeWidth={isSelected ? "1" : "0.5"}
                className={`
                  transition-all 
                  duration-200 
                  ease-in-out 
                  hover:opacity-90
                  hover:stroke-2
                  ${isSelected ? 'filter-glow' : ''}
                `}
                style={{
                  ...isSelected ? { filter: 'url(#glow)'} : {}
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

      {tooltip && (
        <div 
          className="absolute z-20 p-3 bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-lg border border-slate-700 text-white"
          style={{ 
            left: `${tooltip.x}px`, 
            top: `${tooltip.y}px`,
            transform: 'translate(-50%, -120%)',
            pointerEvents: 'none'
          }}
        >
          <h3 className="font-semibold text-white">{tooltip.content}</h3>
          {tooltip.reports > 0 && (
            <p className="text-sm text-gray-200 mt-1">
              {tooltip.reports} intervention{tooltip.reports !== 1 ? 's' : ''}
            </p>
          )}
          <p className="text-xs text-gray-300 mt-1">
            {selectedCountries.has(tooltip.content) ? 'Click to deselect' : 'Click to select'}
          </p>
        </div>
      )}
    </div>
  );
};

export default AfricaMap; 