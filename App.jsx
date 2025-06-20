import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { MOCK_REPORTS, STRATEGIC_RESULTS_HIERARCHY, ALL_AFRICAN_COUNTRIES, AFRICA_MAP_DATA, INITIAL_MAP_DATA, PARTNERSHIPS } from './constants';
import Header from './components/Header';
import FilterDropdown from './components/FilterDropdown';
import AfricaMap from './components/AfricaMap';
import ReportCard from './components/ReportCard';
import Button from './components/Button';
import ConfirmDialog from './components/ConfirmDialog';
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
    interventionCountry: '',
    partnership: '',
  });

  const [sraOptions, setSraOptions] = useState(['All Areas']);
  const [subSraOptions, setSubSraOptions] = useState(['All Sub Categories']);
  const [countryOptions, setCountryOptions] = useState(['All Countries']);
  const [partnershipOptions, setPartnershipOptions] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
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

  const handleFilterChange = useCallback((filterName, value) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      const resetValue = 
        value === 'All Strategic Result Areas' || 
        value === 'All Countries' || 
        value === 'All Partnerships' ||
        value === 'All Sub Categories' ||
        value === 'All Areas'
        ? '' : value;
      
      newFilters[filterName] = resetValue;

      // If main SRA is changed, reset sub SRA
      if (filterName === 'strategicResultArea') {
        newFilters.subStrategicResultArea = ''; 
      }

      // Reset selected country if changing country filter
      if (filterName === 'interventionCountry' && value === 'All Countries') {
        setSelectedCountry(null);
      }

      return newFilters;
    });
  }, []);

  const handleCountrySelectOnMap = useCallback((countryName) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      interventionCountry: countryName || 'All Countries',
    }));
    setSelectedCountry(countryName);
  }, []);

  const handleClearFilters = () => {
    setIsConfirmDialogOpen(true);
  };

  const confirmClearFilters = () => {
    // Reset all filters to their default values
    setFilters({
      strategicResultArea: '',
      subStrategicResultArea: '',
      interventionCountry: '',
      partnership: '',
    });
    
    // Reset selected country on map
    setSelectedCountry(null);
    
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

      const countryMatch = !filters.interventionCountry || report.interventionCountry === filters.interventionCountry;
      
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
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 text-blue-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-xl">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-700 p-4 text-center">{error}</div>;
  }
  
  const isSubSraDropdownDisabled = !filters.strategicResultArea || (STRATEGIC_RESULTS_HIERARCHY[filters.strategicResultArea]?.length === 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-gray-200 flex flex-col">
      <Header />
      
      <main className="flex-grow p-4 md:p-6 lg:p-8 space-y-6">
        {/* Filters Section */}
        <div className="bg-slate-800/50 backdrop-blur-md shadow-2xl rounded-xl p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
            <FilterDropdown
              label="Strategic Result Area"
              options={sraOptions}
              selectedValue={filters.strategicResultArea || 'All Areas'}
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
              label="Intervention Country"
              options={['All Countries', ...ALL_AFRICAN_COUNTRIES]}
              selectedValue={filters.interventionCountry || 'All Countries'}
              onChange={value => handleFilterChange('interventionCountry', value)}
              icon={<GlobeAltIcon className="w-5 h-5 text-green-400" />}
            />
            <FilterDropdown
              label="Partnership"
              options={partnershipOptions}
              selectedValue={filters.partnership || 'All Partnerships'}
              onChange={value => handleFilterChange('partnership', value)}
              icon={<UsersIcon className="w-5 h-5 text-purple-400" />}
            />
            <Button 
              onClick={handleClearFilters}
              disabled={activeFilterCount === 0}
              variant="danger-outline"
              className={`w-full text-sm`}
            >
              <XCircleIcon className="w-5 h-5 mr-2"/>
              Clear Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}
            </Button>
          </div>
        </div>

        {/* Main Content: Map and Reports */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Africa Map */}
          <div className="lg:w-1/3 bg-slate-800/50 backdrop-blur-md shadow-2xl rounded-xl p-4 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-center mb-4 text-sky-400">Intervention Map</h2>
            {isLoading ? (
              <div className="flex items-center justify-center h-[600px] bg-slate-50 rounded-lg">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <AfricaMap
                mapData={mapData}
                selectedCountry={selectedCountry}
                onCountrySelect={handleCountrySelectOnMap}
                reportData={reports}
              />
            )}
             <p className="mt-4 text-xs text-gray-400 text-center">
                Click a country on the map to filter reports. Paths are illustrative.
             </p>
          </div>

          {/* Reports List */}
          <div className="lg:w-2/3 space-y-4">
            <div className="flex justify-between items-center mb-1">
                <h2 className="text-xl font-semibold text-sky-400 flex items-center">
                    <FunnelIcon className="w-5 h-5 mr-2"/>
                    Filtered Reports ({filteredReports.length})
                </h2>
            </div>
            {filteredReports.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                {filteredReports.map(report => (
                  <ReportCard key={report.id} report={report} />
                ))}
              </div>
            ) : (
              <div className="bg-slate-800/50 backdrop-blur-md shadow-xl rounded-xl p-10 text-center text-gray-400">
                <p className="text-lg">No reports match the current filters.</p>
                <p>Try adjusting your criteria or clearing the filters.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={confirmClearFilters}
        title="Clear All Filters"
        message="Are you sure you want to clear all filters? This will reset all selections including the map."
      />

      <footer className="text-center p-4 text-sm text-gray-500 border-t border-slate-700">
        © {new Date().getFullYear()} African Centre for Statistics (ACS) Reporting Dashboard. All rights reserved.
      </footer>
    </div>
  );
};

export default App; 