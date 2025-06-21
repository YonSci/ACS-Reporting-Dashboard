import { geoPath, geoMercator } from 'd3-geo';

// Placeholder data in case GeoJSON loading fails
const defaultMapData = [
  {
    id: 'DEFAULT',
    name: 'Africa',
    path: 'M100,100 L200,100 L200,200 L100,200 Z'
  }
];

export const generateMapData = async () => {
  try {
    // Use the correct path for both development and production
    const response = await fetch(new URL('../data/africa.geojson', import.meta.url));
    const africaGeoJSON = await response.json();

    // Create a projection centered on Africa
    const projection = geoMercator()
      .center([20, 0])     // Center on Africa's approximate center
      .scale(350)          // Adjust scale to fit Africa
      .translate([500, 500]); // Center in SVG viewport

    // Create path generator
    const pathGenerator = geoPath().projection(projection);

    // Convert GeoJSON features to map data
    return africaGeoJSON.features.map(feature => ({
      id: feature.properties.ISO_A3 || feature.properties.ISO || 'UNKNOWN',
      name: feature.properties.NAME || feature.properties.name || 'Unknown',
      path: pathGenerator(feature)
    }));
  } catch (error) {
    console.error('Error loading or processing GeoJSON:', error);
    return defaultMapData;
  }
};

export const getMapViewBox = () => {
  // Return a viewBox that focuses on Africa
  return '0 0 1000 1000';
}; 