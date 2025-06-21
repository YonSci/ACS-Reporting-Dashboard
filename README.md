# African Development Reporting Dashboard

## Overview
The African Development Reporting Dashboard is an interactive web application designed to visualize and track development initiatives across Africa. The dashboard provides comprehensive insights into various strategic interventions, partnerships, and development projects implemented by the Economic Commission for Africa (ECA) and its partners.

## Purpose
This dashboard serves as a centralized platform to:
- Monitor and evaluate development projects across African nations
- Track strategic interventions in different result areas
- Visualize geographical distribution of initiatives
- Facilitate data-driven decision making
- Enhance transparency in development reporting

## Key Features

### 1. Interactive African Map
- Visual representation of intervention countries
- Click-to-select country functionality
- Color-coded visualization of selected and available countries
- Responsive tooltips showing country information

### 2. Advanced Filtering System
- Filter by Strategic Result Areas:
  - Production and Dissemination of Comparable Economic Data
  - Integration of Statistical and Geospatial Information Frameworks
  - Digital Transformation and Modernization of Statistical Systems
  - Improved CRVS System
- Sub-strategic result area filtering
- Country-specific filtering
- Partnership-based filtering
- Clear all filters functionality

### 3. Detailed Report Cards
- Comprehensive project information display
- Expandable/collapsible detailed view
- Key metrics including:
  - Strategic and sub-strategic result areas
  - Intervention country
  - Partnership information
  - Project year
  - SDG contributions
  - Supporting links
  - Detailed project descriptions

### 4. Partnership Tracking
- Display of multi-stakeholder partnerships


## Technical Features
- Modern React-based frontend
- Responsive design for all screen sizes
- Interactive data visualization
- Real-time filtering and updates
- Optimized performance with useMemo and useCallback
- Clean and intuitive user interface

## Technology Stack

### Frontend
- **React.js** - Core frontend framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
  - Custom UI components
  - Responsive design
  - Dark theme implementation
  - Backdrop blur effects
  - Modern glass-morphism design


### Development Tools
- **PostCSS** - CSS transformation and optimization
- **ESLint** - Code quality and style checking
- **npm/yarn** - Package management
- **Git** - Version control

### Performance Optimization
- Code splitting
- Lazy loading
- Memoization of expensive calculations
- Optimized re-renders using React's memo and useMemo
- Efficient filtering algorithms

### Data Format
- **JSON** - Data storage and structure
- **GeoJSON** - Geographical data for the Africa map

## Data Structure
The dashboard organizes development initiatives into four main Strategic Result Areas:
1. **Production and Dissemination of Comparable Economic Data**
   - Focus on economic indicators and data integration
2. **Integration of Statistical and Geospatial Information Frameworks**
   - Geospatial data management and infrastructure
3. **Digital Transformation and Modernization of Statistical Systems**
   - Modernization of statistical processes and systems
4. **Improved CRVS System**
   - Civil Registration and Vital Statistics enhancement


## License
This project is licensed under the MIT License - see the LICENSE file for details.
