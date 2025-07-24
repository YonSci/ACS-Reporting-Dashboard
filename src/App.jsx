import { useState, useEffect, useCallback, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResetPassword from './pages/ResetPassword';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { useTheme } from './utils/themeContext';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './utils/themeContext';
import { reportsAPI } from './lib/appwrite';
import { STRATEGIC_RESULTS_HIERARCHY, ALL_AFRICAN_COUNTRIES, PARTNERSHIPS } from '../server/data.js';

import Header from './components/Header';
import Modal from './components/Modal';
import DataImportForm from './components/DataImportForm';
import FilterDropdown from './components/FilterDropdown';
import AfricaMap from './components/AfricaMap';
import ReportCard from './components/ReportCard';
import Button from './components/Button';
import ConfirmDialog from './components/ConfirmDialog';
import ExportSharePanel from './components/ExportSharePanel';
import ProtectedForm from './components/ProtectedForm';
import TabNavigation from './components/TabNavigation';
import APPRMDashboard from './components/APPRMDashboard';
import EnhancedDataManagement from './components/EnhancedDataManagement';
import { parseShareableLink } from './utils/exportUtils';
import { BriefcaseIcon, GlobeAltIcon, UsersIcon, FunnelIcon, XCircleIcon, ListBulletIcon } from './components/icons/MiniIcons';
import { generateMapData } from './utils/geoUtils';
import InterventionHeatMap from './components/InterventionHeatMap';
import RegionalBarChart from './components/RegionalBarChart';
import Pagination from './components/Pagination';

// MainAppUI contains the main dashboard UI
const MainAppUI = (props) => {
  const { isDark } = useTheme();
  const { profile } = useAuth();
  
  const theme = useMemo(() => createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
    },
  }), [isDark]);

  // Add active tab state
  const [activeTab, setActiveTab] = useState('strategic-reports');

  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isStrategicDataMgmtOpen, setIsStrategicDataMgmtOpen] = useState(false);

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

  const fetchReports = useCallback(async () => {
    try {
      const data = await reportsAPI.getAllReports();
      console.log('📊 Loaded reports from Appwrite:', data.length);
      
      // Debug: Check for duplicates
      const uniqueIds = new Set(data.map(r => r.$id));
      console.log('🔍 Unique document IDs:', uniqueIds.size);
      console.log('🔍 Total documents vs unique IDs:', data.length, 'vs', uniqueIds.size);
      
      if (data.length !== uniqueIds.size) {
        console.log('🔍 Note: Some documents may have duplicate IDs, but this is normal for Appwrite');
        const duplicates = data.filter((item, index) => data.findIndex(r => r.$id === item.$id) !== index);
        console.log('🔍 Documents with duplicate IDs:', duplicates.length);
      }
      
      // Debug: Check for Ethiopia reports
      const ethiopiaReports = data.filter(r => r.interventionCountry === 'Ethiopia');
      console.log('🇪🇹 Ethiopia reports found:', ethiopiaReports.length);
      if (ethiopiaReports.length > 0) {
        console.log('🇪🇹 Sample Ethiopia report:', ethiopiaReports[0]);
      }
      
      // Debug: Check all unique countries
      const uniqueCountries = [...new Set(data.map(r => r.interventionCountry))].sort();
      console.log('🌍 All countries in data:', uniqueCountries);
      
      setReports(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadFilters = () => {
      try {
        setStrategicResultHierarchy(STRATEGIC_RESULTS_HIERARCHY);
        const sraOptions = ['All Strategic Result Areas', ...Object.keys(STRATEGIC_RESULTS_HIERARCHY)];
        setSraOptions(sraOptions);

        const countryOptions = ['All Countries', ...ALL_AFRICAN_COUNTRIES];
        setCountryOptions(countryOptions);

        const partnershipOptions = ['All Partnerships', ...PARTNERSHIPS];
        setPartnershipOptions(partnershipOptions);

      } catch (error) {
        setError(error.message);
      }
    };

    loadFilters();
    fetchReports();
  }, [fetchReports]);

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
        setSubSraOptions(['All Sub Categories']);
      }
    } else {
      setSubSraOptions(['All Sub Categories']);
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

      if (filterName === 'strategicResultArea') {
        newFilters.subStrategicResultArea = ''; 
      }

      if (filterName === 'interventionCountries' && value === 'All Countries') {
        setSelectedCountries(new Set());
      }

      return newFilters;
    });
  }, []);

  const handleCountrySelectOnMap = useCallback((countryName, newSelectedCountries = null) => {
    console.log('🗺️ Map clicked:', countryName, 'newSelectedCountries:', newSelectedCountries);
    
    if (newSelectedCountries !== null) {
      setSelectedCountries(newSelectedCountries);
      setFilters(prevFilters => {
        const newFilters = {
          ...prevFilters,
          interventionCountries: []
        };
        console.log('🔧 Updated filters (clear):', newFilters);
        return newFilters;
      });
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
      console.log('🗺️ Updated selected countries:', Array.from(newSelection));
      return newSelection;
    });

    setFilters(prevFilters => {
      const newFilters = {
        ...prevFilters,
        interventionCountries: countryName ? [countryName] : []
      };
      console.log('🔧 Updated filters:', newFilters);
      return newFilters;
    });
  }, []);

  const handleClearFilters = () => {
    setIsConfirmDialogOpen(true);
  };

  const confirmClearFilters = () => {
    setFilters({
      strategicResultArea: '',
      subStrategicResultArea: '',
      interventionCountries: [],
      partnership: '',
    });
    
    setSelectedCountries(new Set());
    setSubSraOptions(['All Sub Categories']);
    setReports([]);
    fetchReports();
    setIsConfirmDialogOpen(false);
  };

  const filteredReports = useMemo(() => {
    console.log('🔍 Filtering reports:', {
      totalReports: reports.length,
      filters: filters,
      selectedCountries: Array.from(selectedCountries)
    });
    
    // Debug: Check report statuses
    const statusCounts = reports.reduce((acc, r) => {
      const status = r.status || 'no-status';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
    console.log('📊 Report status breakdown:', statusCounts);
    
    // Show only approved reports on the main dashboard
    const approvedReports = reports.filter(r => r.status === 'approved');
    
    const filtered = approvedReports.filter(report => {
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
      
      if (filters.interventionCountries.length > 0) {
        console.log(`🔍 Report "${report.interventionCountry}": countryMatch=${countryMatch}, sraMatch=${sraMatch}, subSraMatch=${refinedSubSraMatch}, partnershipMatch=${partnershipMatch}`);
      }
      
      return sraMatch && refinedSubSraMatch && countryMatch && partnershipMatch;
    });
    
    console.log('🔍 Filtered results:', filtered.length, 'reports');
    if (filtered.length === 0 && filters.interventionCountries.length > 0) {
      console.log('⚠️ No reports found for selected country. Available countries in data:', [...new Set(reports.map(r => r.interventionCountry))].sort());
    }
    return filtered;
  }, [reports, filters, selectedCountries]);

  const activeFilterCount = useMemo(() => {
    return Object.values(filters).filter(value => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== '';
    }).length;
  }, [filters]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredReports.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header activeTab={activeTab} />
      
      {/* Tab Navigation */}
      <div className="container mx-auto px-4 pt-1 mt-1">
        <TabNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
        />
      </div>

      {/* Conditional Content Based on Active Tab */}
      {activeTab === 'strategic-reports' ? (
        <main className="container mx-auto px-4 py-4">
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
                      reports={reports}
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
                    Add New Report
                  </Button>
                  {profile && (
                    <button
                      onClick={() => setIsStrategicDataMgmtOpen(true)}
                      className="px-3 py-2 text-sm bg-green-100 hover:bg-green-200 dark:bg-green-900/20 dark:hover:bg-green-900/40 text-green-700 dark:text-green-300 rounded transition-colors font-semibold border border-green-200 dark:border-green-700 flex items-center whitespace-nowrap"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3-6.75h3.75M3.75 6.75h16.5A1.125 1.125 0 0 1 21 7.875v10.5A1.125 1.125 0 0 1 19.875 18H3.75A1.125 1.125 0 0 0 3 17.625V7.875A1.125 1.125 0 0 1 3.75 6.75Z" />
                      </svg>
                      Strategic Data Management
                    </button>
                  )}
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
                
                <p className="mb-4 text-slate-900 dark:text-gray-300 font-medium">
                  Explore detailed reports from across African countries
                </p>

                {/* Reports Cards */}
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
                    currentItems.map((report) => (
                      <ReportCard
                        key={`${report.$id}-${report.reportIndex || 'fallback'}-${report.strategicResultArea}`}
                        report={report}
                      />
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
        </main>
      ) : (
        /* APPRM Reports Tab */
        <main className="container mx-auto px-4 py-4">
          <APPRMDashboard />
        </main>
      )}

      {/* Modals */}
      <ProtectedForm
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />

      <EnhancedDataManagement 
        isOpen={isStrategicDataMgmtOpen} 
        onClose={() => setIsStrategicDataMgmtOpen(false)} 
        admin={profile} 
      />

      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={confirmClearFilters}
        title="Clear All Filters"
        message="Are you sure you want to clear all active filters? This will reset the dashboard to show all reports."
      />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/*" element={<MainAppUI />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;