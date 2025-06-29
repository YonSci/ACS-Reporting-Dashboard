import React, { memo } from 'react';
import { getTileFeatures } from '../utils/geoUtils';

const MapTile = memo(({ 
  features, 
  tileX, 
  tileY, 
  tileSize, 
  selectedCountries, 
  onCountrySelect, 
  colors,
  onMouseMove,
  onMouseLeave,
  isDarkMode = false
}) => {
  const tileFeatures = getTileFeatures(features, tileX, tileY);
  
  if (tileFeatures.length === 0) {
    return null;
  }

  return (
    <g 
      transform={`translate(${tileX * tileSize}, ${tileY * tileSize})`}
      className="map-tile"
    >
      {tileFeatures.map((feature) => {
        const countryName = feature.properties.name;
        const isSelected = selectedCountries.has(countryName);
        
        return (
          <path
            key={countryName}
            d={feature.geometry.type === 'MultiPolygon'
              ? feature.geometry.coordinates.map(coords => coords[0].map(coord => coord.join(',')).join(' ')).join(' ')
              : feature.geometry.coordinates[0].map(coord => coord.join(',')).join(' ')
            }
            fill={isSelected 
              ? (isDarkMode ? colors.selected.dark : colors.selected.light)
              : (isDarkMode ? colors.unselected.dark : colors.unselected.light)
            }
            stroke={isDarkMode ? colors.stroke.dark : colors.stroke.light}
            strokeWidth={isSelected ? "1.5" : "0.5"}
            className={`
              transform-gpu
              transition-colors
              duration-200
              hover:cursor-pointer
              ${isSelected 
                ? 'hover:fill-blue-400 dark:hover:fill-blue-300' 
                : 'hover:fill-gray-300 dark:hover:fill-gray-600'
              }
            `}
            onClick={() => onCountrySelect(countryName)}
            onMouseMove={(e) => onMouseMove(e, countryName)}
            onMouseLeave={onMouseLeave}
            data-country-name={countryName}
          />
        );
      })}
    </g>
  );
});

MapTile.displayName = 'MapTile';

export default MapTile; 