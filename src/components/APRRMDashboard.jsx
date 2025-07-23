import React, { useState, useEffect, useMemo } from 'react';
import { FunnelIcon, GlobeAltIcon, CalendarIcon, ClockIcon, XCircleIcon, UsersIcon } from './icons/MiniIcons';
import FilterDropdown from './FilterDropdown';
import AfricaMap from './AfricaMap';
import InterventionHeatMap from './InterventionHeatMap';
import RegionalBarChart from './RegionalBarChart';
import Pagination from './Pagination';
import Button from './Button';
import ExportSharePanel from './ExportSharePanel';
import { ALL_AFRICAN_COUNTRIES, PARTNERSHIPS } from '../../server/data.js';
import { generateMapData } from '../utils/geoUtils';

const APRRMDashboard = () => {
  const [countryFootprints, setCountryFootprints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapData, setMapData] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [filters, setFilters] = useState({
    country: '',
    year: '',
    quarter: '',
    partnership: ''
  });

  // Generate year options (current year and past 5 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = ['All Years'];
  for (let i = 0; i <= 5; i++) {
    yearOptions.push((currentYear - i).toString());
  }

  // Quarter options
  const quarterOptions = ['All Quarters', 'Q1', 'Q2', 'Q3', 'Q4'];

  // Country options (same as main dashboard)
  const countryOptions = ['All Countries', ...ALL_AFRICAN_COUNTRIES];

  // Partnership options
  const partnershipOptions = ['All Partnerships', ...PARTNERSHIPS];

  // Fetch APRRM data (placeholder for now)
  const fetchCountryFootprints = async () => {
    try {
      setIsLoading(true);
      // TODO: Replace with actual API call to fetch country footprints
      // const data = await footprintAPI.getAllCountryFootprints();
      
      // Mock data for now - more extensive sample with partnerships
      const mockData = [
        {
          $id: '1',
          country: 'Ethiopia',
          year: 2024,
          quarter: 'Q2',
          partnerships: ['AfDB', 'National Statistics Offices'],
          deliverables: [
            'Delivered training on statistical capacity building',
            'Provided technical assistance for census preparation',
            'Developed geospatial databases for administrative boundaries'
          ],
          outcomes: [
            'Improved statistical capacity in national statistical office',
            'Enhanced data governance framework',
            'Strengthened institutional coordination mechanisms'
          ],
          unsdcfResultAreas: [
            'Sustainable Development and Climate Action',
            'Governance, Rule of Law and Human Rights'
          ]
        },
        {
          $id: '2',
          country: 'Kenya',
          year: 2024,
          quarter: 'Q2',
          partnerships: ['AFRISTAT', 'AUC'],
          deliverables: [
            'Supported implementation of statistical master plan',
            'Facilitated regional data harmonization workshop'
          ],
          outcomes: [
            'Improved data quality and standardization',
            'Enhanced regional statistical cooperation'
          ],
          unsdcfResultAreas: [
            'Sustainable Development and Climate Action'
          ]
        },
        {
          $id: '3',
          country: 'Nigeria',
          year: 2024,
          quarter: 'Q1',
          partnerships: ['UNSD', 'WTO'],
          deliverables: [
            'Conducted statistical system assessment',
            'Provided capacity building for data analysts'
          ],
          outcomes: [
            'Strengthened national statistical capacity',
            'Improved data collection methodologies'
          ],
          unsdcfResultAreas: [
            'Governance, Rule of Law and Human Rights'
          ]
        },
        {
          $id: '4',
          country: 'South Africa',
          year: 2023,
          quarter: 'Q4',
          partnerships: ['OECD', 'European Union'],
          deliverables: [
            'Established regional statistical coordination framework',
            'Delivered advanced training on survey methodologies'
          ],
          outcomes: [
            'Enhanced regional statistical collaboration',
            'Improved survey design and implementation'
          ],
          unsdcfResultAreas: [
            'Sustainable Development and Climate Action',
            'Governance, Rule of Law and Human Rights'
          ]
        },
        {
          $id: '5',
          country: 'Ghana',
          year: 2024,
          quarter: 'Q2',
          partnerships: ['UNICEF', 'WFP'],
          deliverables: [
            'Supported digital transformation initiative',
            'Provided technical assistance for administrative data integration'
          ],
          outcomes: [
            'Modernized statistical infrastructure',
            'Improved administrative data systems'
          ],
          unsdcfResultAreas: [
            'Sustainable Development and Climate Action'
          ]
        }
      ];
      
      setCountryFootprints(mockData);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Load map data
  useEffect(() => {
    const loadMapData = async () => {
      try {
        const data = await generateMapData();
        setMapData(data);
      } catch (error) {
        console.error('Error loading map data:', error);
      }
    };

    loadMapData();
    fetchCountryFootprints();
  }, []);

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => {
      const resetValue = 
        value === 'All Countries' || 
        value === 'All Years' ||
        value === 'All Quarters' ||
        value === 'All Partnerships'
        ? '' : value;
      
      return {
        ...prevFilters,
        [filterName]: resetValue
      };
    });
  };

  const handleCountrySelectOnMap = (countryName, newSelectedCountries = null) => {
    console.log('🗺️ APRRM Map clicked:', countryName, 'newSelectedCountries:', newSelectedCountries);
    
    if (newSelectedCountries !== null) {
      setSelectedCountries(newSelectedCountries);
      setFilters(prevFilters => ({
        ...prevFilters,
        country: ''
      }));
      return;
    }
    
    setSelectedCountries(prev => {
      const newSelection = new Set(prev);
      if (countryName) {
        if (newSelection.has(countryName)) {
          newSelection.delete(countryName);
        } else {
          newSelection.clear();
          newSelection.add(countryName);
        }
      } else {
        newSelection.clear();
      }
      return newSelection;
    });

    setFilters(prevFilters => ({
      ...prevFilters,
      country: countryName || ''
    }));
  };

  const handleClearFilters = () => {
    setFilters({ country: '', year: '', quarter: '', partnership: '' });
    setSelectedCountries(new Set());
    setCurrentPage(1);
  };

  const filteredCountryFootprints = useMemo(() => {
    return countryFootprints.filter(footprint => {
      const countryMatch = !filters.country || footprint.country === filters.country;
      const yearMatch = !filters.year || footprint.year.toString() === filters.year;
      const quarterMatch = !filters.quarter || footprint.quarter === filters.quarter;
      const partnershipMatch = !filters.partnership || 
        (Array.isArray(footprint.partnerships) ? 
          footprint.partnerships.includes(filters.partnership) : 
          footprint.partnerships === filters.partnership);
      
      return countryMatch && yearMatch && quarterMatch && partnershipMatch;
    });
  }, [countryFootprints, filters]);

  const activeFilterCount = useMemo(() => {
    return Object.values(filters).filter(value => value !== '').length;
  }, [filters]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCountryFootprints.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCountryFootprints.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const reportsSection = document.querySelector('#aprrm-reports-section');
    if (reportsSection) {
      reportsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, selectedCountries]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-64 bg-red-50 dark:bg-red-900 rounded-xl mx-4">
        <div className="text-center">
          <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-2">Error Loading APRRM Data</h3>
          <p className="text-gray-700 dark:text-gray-300">{error}</p>
          <button 
            onClick={fetchCountryFootprints} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading APRRM Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Filters Section */}
      <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md shadow-2xl rounded-xl p-4 md:p-6">
        <div className="flex flex-col space-y-4">
          {/* Title and Actions Row */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold flex items-center text-slate-900 dark:text-gray-200">
              <FunnelIcon className="w-6 h-6 mr-2 text-blue-400" />
              Filter APRRM Reports
              {activeFilterCount > 0 && (
                <span className="ml-2 text-sm font-normal text-slate-600 dark:text-gray-400">
                  ({activeFilterCount} active)
                </span>
              )}
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 border-r border-slate-600 pr-3">
                <ExportSharePanel
                  reports={countryFootprints}
                  filters={filters}
                  selectedCountries={selectedCountries}
                />
              </div>
              <Button 
                onClick={() => {/* TODO: Add APRRM data import functionality */}}
                variant="primary"
                size="sm"
                className="flex items-center whitespace-nowrap"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add New Data
              </Button>
              <Button 
                onClick={handleClearFilters}
                disabled={activeFilterCount === 0}
                variant="danger"
                size="sm"
                className="flex items-center whitespace-nowrap"
              >
                <XCircleIcon className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <FilterDropdown
              label="Country"
              options={countryOptions}
              selectedValue={filters.country || 'All Countries'}
              onChange={value => {
                if (value === 'All Countries') {
                  setFilters(prev => ({...prev, country: ''}));
                  setSelectedCountries(new Set());
                } else {
                  setFilters(prev => ({...prev, country: value}));
                  setSelectedCountries(new Set([value]));
                }
              }}
              icon={<GlobeAltIcon className="w-5 h-5 text-green-400" />}
            />
            <FilterDropdown
              label="Year"
              options={yearOptions}
              selectedValue={filters.year || 'All Years'}
              onChange={value => handleFilterChange('year', value)}
              icon={<CalendarIcon className="w-5 h-5 text-purple-400" />}
            />
            <FilterDropdown
              label="Quarter"
              options={quarterOptions}
              selectedValue={filters.quarter || 'All Quarters'}
              onChange={value => handleFilterChange('quarter', value)}
              icon={<ClockIcon className="w-5 h-5 text-orange-400" />}
            />
            <FilterDropdown
              label="Partnership"
              options={partnershipOptions}
              selectedValue={filters.partnership || 'All Partnerships'}
              onChange={value => handleFilterChange('partnership', value)}
              icon={<UsersIcon className="w-5 h-5 text-purple-400" />}
            />
          </div>
        </div>
      </div>

      {/* Main Content: Map, Chart and Reports */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column: Map and Chart */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          {/* Africa Map */}
          <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md shadow-2xl rounded-xl p-4">
            <AfricaMap
              mapData={mapData}
              selectedCountries={selectedCountries}
              onCountrySelect={handleCountrySelectOnMap}
              reportData={countryFootprints}
            />
          </div>
          
          {/* Heat Map and Regional Analysis Section */}
          <div className="space-y-6">
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md shadow-2xl rounded-xl p-4">
              <InterventionHeatMap
                mapData={mapData}
                reportData={countryFootprints}
              />
            </div>
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md shadow-2xl rounded-xl p-4">
              <RegionalBarChart reportData={countryFootprints} />
            </div>
          </div>
        </div>

        {/* Right Column: Country Footprints List */}
        <div className="lg:w-1/2">
          <div id="aprrm-reports-section" className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md shadow-2xl rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-slate-950 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                  APRRM Reports
                </h2>
                <span className="ml-2 px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-950 dark:bg-blue-900 dark:text-blue-200">
                  {filteredCountryFootprints.length} reports
                </span>
              </div>
            </div>
            
            <p className="mb-4 text-slate-900 dark:text-gray-300 font-medium">
              Explore APRRM country footprints and achievements across African countries
            </p>

            {/* Country Footprint Cards */}
            <div className="space-y-4 mb-6">
              {currentItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 dark:text-gray-600 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 3a1 1 0 000 2h10a1 1 0 100-2H5zm0 4a1 1 0 100 2h6a1 1 0 100-2H5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    No reports found matching your current filters
                  </p>
                  <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                    Try adjusting your filter criteria or clearing all filters to see more reports
                  </p>
                </div>
              ) : (
                currentItems.map((footprint) => (
                  <div
                    key={footprint.$id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
                  >
                    {/* Country Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <GlobeAltIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                            {footprint.country}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {footprint.year} • {footprint.quarter}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Partnerships */}
                    <div className="mb-4">
                      <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                        Partnerships ({footprint.partnerships.length})
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {footprint.partnerships.map((partnership, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                          >
                            {partnership}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Deliverables */}
                    <div className="mb-4">
                      <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Deliverables ({footprint.deliverables.length})
                      </h5>
                      <ul className="space-y-1">
                        {footprint.deliverables.map((deliverable, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-700 dark:text-gray-300 flex items-start"
                          >
                            <span className="text-green-500 mr-2 mt-1">•</span>
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Outcomes */}
                    <div className="mb-4">
                      <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        Outcomes ({footprint.outcomes.length})
                      </h5>
                      <ul className="space-y-1">
                        {footprint.outcomes.map((outcome, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-700 dark:text-gray-300 flex items-start"
                          >
                            <span className="text-purple-500 mr-2 mt-1">•</span>
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* UNSDCF Result Areas */}
                    <div>
                      <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        UNSDCF Result Areas
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {footprint.unsdcfResultAreas.map((area, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default APRRMDashboard; 