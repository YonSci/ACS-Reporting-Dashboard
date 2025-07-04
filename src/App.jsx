import { useState, useEffect, useCallback, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';

import Header from './components/Header';
import Modal from './components/Modal';
import DataImportForm from './components/DataImportForm';
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
import { ThemeProvider } from '../utils/themeContext';

const theme = createTheme({
  palette: {
    mode: 'light', // We'll handle dark mode through Tailwind
  },
});

const App = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    strategicResultArea: '',
    subStrategicResultArea: '',
    interventionCountries: [],
    partnership: '',
  });

  const [strategicResultHierarchy, setStrategicResultHierarchy] = useState({});
  const [sraOptions, setSraOptions] = useState(['All Strategic Result Areas']);
  const [subSraOptions, setSubSraOptions] = useState(['All Sub Categories']);
  const [countryOptions, setCountryOptions] = useState(['All Countries']);
  const [partnershipOptions, setPartnershipOptions] = useState([]);

  const [selectedCountries, setSelectedCountries] = useState(new Set());
  const [mapData, setMapData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Update fetchReports to use the new API endpoint
  const fetchReports = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3001/api/reports');
      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }
      const data = await response.json();
      setReports(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/filters');
        if (!response.ok) {
          throw new Error('Failed to fetch filters');
        }
        const data = await response.json();
        const { strategicResultHierarchy, allAfricanCountries, partnerships } = data;

        setStrategicResultHierarchy(strategicResultHierarchy);
        const sraOptions = ['All Strategic Result Areas', ...Object.keys(strategicResultHierarchy)];
        setSraOptions(sraOptions);

        const countryOptions = ['All Countries', ...allAfricanCountries];
        setCountryOptions(countryOptions);

        const partnershipOptions = ['All Partnerships', ...partnerships];
        setPartnershipOptions(partnershipOptions);

      } catch (error) {
        setError(error.message);
      }
    };

    fetchFilters();
    fetchReports();
  }, [fetchReports]); // Added fetchReports to dependency array

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
    if (filters.strategicResultArea && strategicResultHierarchy && strategicResultHierarchy[filters.strategicResultArea]) {
      const relatedSubSras = strategicResultHierarchy[filters.strategicResultArea];
      if (relatedSubSras.length > 0) {
        setSubSraOptions(['All Sub Categories', ...relatedSubSras.sort()]);
      } else {
        setSubSraOptions(['All Sub Categories']); // Keep this default if no sub-SRAs
      }
    } else {
      setSubSraOptions(['All Sub Categories']); // Reset to default if no SRA selected
    }
  }, [filters.strategicResultArea, strategicResultHierarchy]);

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
    setReports([]);

    // Refetch reports based on cleared filters
    fetchReports();
    
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

  if (error) {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="flex items-center justify-center min-h-screen bg-red-50 dark:bg-red-900 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Error</h1>
            <p className="text-gray-700 dark:text-gray-300">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }

  if (isLoading) {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
  
  const isSubSraDropdownDisabled = !filters.strategicResultArea || !strategicResultHierarchy || strategicResultHierarchy[filters.strategicResultArea]?.length === 0;

  return (
    <ThemeProvider>
      <MuiThemeProvider theme={theme}>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          <Header />
          <main className="container mx-auto px-4 py-8">
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
                      onClick={() => setIsImportModalOpen(true)}
                      variant="primary"
                      size="sm"
                      className="flex items-center whitespace-nowrap"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      Import Data
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
                    options={countryOptions}
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

          {/* Import Data Modal */}
          <Modal
            isOpen={isImportModalOpen}
            onClose={() => setIsImportModalOpen(false)}
            title="Add New Report"
          >
            <DataImportForm onClose={() => setIsImportModalOpen(false)} />
          </Modal>

          <footer className="text-center p-4 text-sm text-gray-500 border-t border-slate-700">
            © {new Date().getFullYear()} African Centre for Statistics (ACS) Reporting Dashboard. All rights reserved.
          </footer>
        </div>
      </MuiThemeProvider>
    </ThemeProvider>
  );
};

export default App;