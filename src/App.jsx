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
import ReportManagement from './components/ReportManagement';
import { parseShareableLink } from './utils/exportUtils';
import { BriefcaseIcon, GlobeAltIcon, UsersIcon, FunnelIcon, XCircleIcon, ListBulletIcon } from './components/icons/MiniIcons';
import { generateMapData } from './utils/geoUtils';

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

  const [sraOptions, setSraOptions] = useState(['All Areas']);
  const [subSraOptions, setSubSraOptions] = useState(['All Sub Categories']);
  const [countryOptions, setCountryOptions] = useState(['All Countries']);
  const [partnershipOptions, setPartnershipOptions] = useState([]);

  const [selectedCountries, setSelectedCountries] = useState(new Set());
  const [mapData, setMapData] = useState(INITIAL_MAP_DATA);

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
        
        <main className="flex-grow p-4 md:p-6 lg:p-8 space-y-6">
          {/* Report Management Section */}
          <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md shadow-2xl rounded-xl p-4 md:p-6">
            <ReportManagement
              reports={reports}
              onFilteredReportsChange={(filteredResults) => {
                // Update the filtered reports in the parent state if needed
                setReports(filteredResults);
              }}
            />
          </div>

          {/* Map Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md shadow-2xl rounded-xl p-4">
              <AfricaMap
                mapData={mapData}
                selectedCountries={selectedCountries}
                onCountrySelect={handleCountrySelectOnMap}
              />
            </div>
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md shadow-2xl rounded-xl p-4">
              <InterventionChart data={reports} />
            </div>
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report, index) => (
              <ReportCard key={index} report={report} />
            ))}
          </div>
        </main>

        {/* Export/Share Panel */}
        <ExportSharePanel
          reports={reports}
          filters={filters}
          selectedCountries={selectedCountries}
        />

        {/* Confirm Dialog */}
        {isConfirmDialogOpen && (
          <ConfirmDialog
            title="Clear All Filters"
            message="Are you sure you want to clear all filters? This will reset all your selections."
            onConfirm={confirmClearFilters}
            onCancel={() => setIsConfirmDialogOpen(false)}
          />
        )}

        <footer className="text-center p-4 text-sm text-gray-500 border-t border-slate-700">
          © {new Date().getFullYear()} African Centre for Statistics (ACS) Reporting Dashboard. All rights reserved.
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default App; 