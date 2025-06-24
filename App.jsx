import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { MOCK_REPORTS, STRATEGIC_RESULTS_HIERARCHY, ALL_AFRICAN_COUNTRIES, AFRICA_MAP_DATA, INITIAL_MAP_DATA, PARTNERSHIPS } from './constants';
import { ThemeProvider } from './utils/themeContext.jsx';
import Header from './components/Header';
import FilterDropdown from './components/FilterDropdown';
import AfricaMap from './components/AfricaMap';
import ReportCard from './components/ReportCard';
import Button from './components/Button';
import ConfirmDialog from './components/ConfirmDialog';
import InterventionChart from './components/InterventionChart';
import ExportSharePanel from './components/ExportSharePanel';
import { parseShareableLink } from './utils/exportUtils';
import { BriefcaseIcon, GlobeAltIcon, UsersIcon, FunnelIcon, XCircleIcon, ListBulletIcon } from './components/icons/MiniIcons';
import { generateMapData } from './utils/geoUtils';
import InterventionHeatMap from './components/InterventionHeatMap';
import RegionalBarChart from './components/RegionalBarChart';
import Pagination from './components/Pagination';

const App = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const [filters, setFilters] = useState({
    strategicResultArea: '',
    subStrategicResultArea: '',
    interventionCountries: [],
    partnership: '',
  });

  const [sraOptions, setSraOptions] = useState(['All Strategic Result Areas']);
  const [subSraOptions, setSubSraOptions] = useState(['All Sub Categories']);
  const [countryOptions, setCountryOptions] = useState(['All Countries']);
  const [partnershipOptions, setPartnershipOptions] = useState([]);

  const [selectedCountries, setSelectedCountries] = useState(new Set());
  const [mapData, setMapData] = useState(INITIAL_MAP_DATA);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
      setReports(MOCK_REPORTS);
      
      // Set country options
      const countries = ['All Countries', ...ALL_AFRICAN_COUNTRIES];
      setCountryOptions(countries);
      
      // Set partnership options
      const partnerships = ['All Partnerships', ...PARTNERSHIPS];
      setPartnershipOptions(partnerships);
      
      // Set Strategic Result Area options from STRATEGIC_RESULTS_HIERARCHY
      const sraOptions = ['All Strategic Result Areas', ...Object.keys(STRATEGIC_RESULTS_HIERARCHY)];
      setSraOptions(sraOptions);
      
      // Set Sub Strategic Result Area options based on first SRA
      setSubSraOptions(['All Sub Categories']);
    }, 500);
  }, []);

  useEffect(() => {
    const loadMapData = async () => {
      try {
        setIsLoading(true);
        const data = await generateMapData();
        setMapData(data);
      } catch (error) {
        console.error('Error loading map data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMapData();
  }, []);

  // Effect to update subSRA options when main SRA changes
  useEffect(() => {
    if (filters.strategicResultArea && STRATEGIC_RESULTS_HIERARCHY[filters.strategicResultArea]) {
      const relatedSubSras = STRATEGIC_RESULTS_HIERARCHY[filters.strategicResultArea];
      if (relatedSubSras.length > 0) {
        setSubSraOptions(['All Sub Categories', ...relatedSubSras.sort()]);
      } else {
        setSubSraOptions(['All Sub Categories']); // Keep this default if no sub-SRAs
      }
    } else {
      setSubSraOptions(['All Sub Categories']); // Reset to default if no SRA selected
    }
  }, [filters.strategicResultArea]);

  // Load filters from URL parameters on mount
  useEffect(() => {
    const { filters: urlFilters, selectedCountries: urlSelectedCountries } = parseShareableLink();
    if (Object.keys(urlFilters).some(key => urlFilters[key])) {
      setFilters(urlFilters);
    }
    if (urlSelectedCountries.size > 0) {
      setSelectedCountries(urlSelectedCountries);
    }
  }, []);

  const handleFilterChange = useCallback((filterName, value) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      
      if (filterName === 'interventionCountries') {
        // Handle array of countries
        newFilters.interventionCountries = value === 'All Countries' ? [] : value;
      } else {
        const resetValue = 
          value === 'All Strategic Result Areas' || 
          value === 'All Partnerships' ||
          value === 'All Sub Categories' ||
          value === 'All Areas'
          ? '' : value;
        
        newFilters[filterName] = resetValue;
      }

      // If main SRA is changed, reset sub SRA
      if (filterName === 'strategicResultArea') {
        newFilters.subStrategicResultArea = ''; 
      }

      // Reset selected countries if clearing country filter
      if (filterName === 'interventionCountries' && value === 'All Countries') {
        setSelectedCountries(new Set());
      }

      return newFilters;
    });
  }, []);

  const handleCountrySelectOnMap = useCallback((countryName) => {
    setSelectedCountries(prev => {
      const newSelection = new Set(prev);
      if (countryName) {
        if (newSelection.has(countryName)) {
          newSelection.delete(countryName);
        } else {
          newSelection.add(countryName);
        }
      } else {
        newSelection.clear();
      }
      return newSelection;
    });

    setFilters(prevFilters => ({
      ...prevFilters,
      interventionCountries: countryName ? 
        Array.from(new Set([...prevFilters.interventionCountries, countryName])) :
        []
    }));
  }, []);

  const handleClearFilters = () => {
    setIsConfirmDialogOpen(true);
  };

  const confirmClearFilters = () => {
    // Reset all filters to their default values
    setFilters({
      strategicResultArea: '',
      subStrategicResultArea: '',
      interventionCountries: [],
      partnership: '',
    });
    
    // Reset selected countries on map
    setSelectedCountries(new Set());
    
    // Reset sub-SRA options to include all
    setSubSraOptions(['All Sub Categories']);

    // Force a reset of reports and map data with new references
    setReports(prevReports => {
      const newReports = [...MOCK_REPORTS];
      setTimeout(() => {
        setMapData(prevData => [...prevData]);
      }, 0);
      return newReports;
    });
    
    // Close the dialog
    setIsConfirmDialogOpen(false);
  };

  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      // Only apply filter if a specific value (not "All") is selected
      const sraMatch = !filters.strategicResultArea || report.strategicResultArea === filters.strategicResultArea;
      
      let refinedSubSraMatch = true;
      if (filters.subStrategicResultArea) {
        refinedSubSraMatch = report.subStrategicResultArea === filters.subStrategicResultArea;
      }

      const countryMatch = filters.interventionCountries.length === 0 || 
        filters.interventionCountries.includes(report.interventionCountry);
      
      const partnershipMatch = !filters.partnership || 
        (Array.isArray(report.partnerships) ? 
          report.partnerships.includes(filters.partnership) : 
          report.partnerships === filters.partnership);
      
      return sraMatch && refinedSubSraMatch && countryMatch && partnershipMatch;
    });
  }, [reports, filters]);

  const activeFilterCount = useMemo(() => {
    return Object.values(filters).filter(value => value !== '').length;
  }, [filters]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredReports.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of reports section
    const reportsSection = document.querySelector('#reports-section');
    if (reportsSection) {
      reportsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, selectedCountries]);

  if (isLoading) {
    return (
      <ThemeProvider>
        <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
          <div className="flex flex-col items-center">
            <svg className="animate-spin h-10 w-10 text-blue-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-xl">Loading Dashboard...</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider>
        <div className="flex items-center justify-center min-h-screen bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-200 p-4 text-center transition-colors duration-300">
          {error}
        </div>
      </ThemeProvider>
    );
  }
  
  const isSubSraDropdownDisabled = !filters.strategicResultArea || (STRATEGIC_RESULTS_HIERARCHY[filters.strategicResultArea]?.length === 0);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-gray-200 flex flex-col transition-colors duration-300">
        <Header />
        
        <main className="flex-grow p-4 md:p-6 lg:p-6 space-y-8">
          {/* Filters Section */}
          <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md shadow-2xl rounded-xl p-4 md:p-6">
            <div className="flex flex-col space-y-4">
              {/* Title and Actions Row */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center text-slate-900 dark:text-gray-200">
                  <FunnelIcon className="w-6 h-6 mr-2 text-blue-400" />
                  Filter Reports
                  {activeFilterCount > 0 && (
                    <span className="ml-2 text-sm font-normal text-slate-600 dark:text-gray-400">
                      ({activeFilterCount} active)
                    </span>
                  )}
                </h2>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 border-r border-slate-600 pr-3">
                    <ExportSharePanel
                      reports={filteredReports}
                      filters={filters}
                      selectedCountries={selectedCountries}
                    />
                  </div>
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
                  label="Strategic Result Area"
                  options={sraOptions}
                  selectedValue={filters.strategicResultArea || 'All Strategic Result Areas'}
                  onChange={value => handleFilterChange('strategicResultArea', value)}
                  icon={<BriefcaseIcon className="w-5 h-5 text-blue-400" />}
                />
                <FilterDropdown
                  label="Sub Strategic Result Area"
                  options={subSraOptions}
                  selectedValue={filters.subStrategicResultArea || 'All Sub Categories'}
                  onChange={value => handleFilterChange('subStrategicResultArea', value)}
                  icon={<ListBulletIcon className="w-5 h-5 text-cyan-400" />}
                  disabled={isSubSraDropdownDisabled}
                />
                <FilterDropdown
                  label="Intervention Countries"
                  options={['All Countries', ...ALL_AFRICAN_COUNTRIES]}
                  selectedValue={filters.interventionCountries.length === 1 ? filters.interventionCountries[0] : 'All Countries'}
                  onChange={value => {
                    if (value === 'All Countries') {
                      setFilters(prev => ({...prev, interventionCountries: []}));
                      setSelectedCountries(new Set());
                    } else {
                      setFilters(prev => ({...prev, interventionCountries: [value]}));
                      setSelectedCountries(new Set([value]));
                    }
                  }}
                  icon={<GlobeAltIcon className="w-5 h-5 text-green-400" />}
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
                  reportData={reports}
                />
              </div>
              
              {/* Heat Map and Regional Analysis Section */}
              <div className="space-y-6">
                <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md shadow-2xl rounded-xl p-4">
                  <InterventionHeatMap
                    mapData={mapData}
                    reportData={reports}
                  />
                </div>
                <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md shadow-2xl rounded-xl p-4">
                  <RegionalBarChart reportData={reports} />
                </div>
              </div>
            </div>

            {/* Right Column: Reports List */}
            <div className="lg:w-1/2">
              <div id="reports-section" className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md shadow-2xl rounded-xl p-4">
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
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                      Reports
                    </h2>
                    <span className="ml-2 px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-950 dark:bg-blue-900 dark:text-blue-200">
                      {filteredReports.length} reports
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  {currentItems.map(report => (
                    <ReportCard key={report.id} report={report} />
                  ))}
                  {filteredReports.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      No reports match the selected filters
                    </div>
                  )}
                </div>
                {filteredReports.length > itemsPerPage && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Confirm Dialog */}
        <ConfirmDialog
          isOpen={isConfirmDialogOpen}
          onClose={() => setIsConfirmDialogOpen(false)}
          onConfirm={confirmClearFilters}
          title="Clear All Filters"
          message="Are you sure you want to clear all filters? This will reset all your selections."
        />

        <footer className="text-center p-4 text-sm text-gray-500 border-t border-slate-700">
          © {new Date().getFullYear()} African Centre for Statistics (ACS) Reporting Dashboard. All rights reserved.
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default App; 