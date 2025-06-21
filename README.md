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


## Deployment

### Deploying to Netlify

You can deploy this application to Netlify in two ways:

#### Option 1: Deploy with Git (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Log in to [Netlify](https://app.netlify.com/)

3. Click "New site from Git"

4. Choose your Git provider and select your repository

5. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `16` (or higher)

6. Click "Deploy site"

#### Option 2: Deploy manually

1. Build your project locally:
```bash
npm run build
```

2. Install Netlify CLI:
```bash
npm install netlify-cli -g
```

3. Login to Netlify:
```bash
netlify login
```

4. Deploy using Netlify CLI:
```bash
netlify deploy
```

5. Follow the prompts and choose:
   - Select `dist` as your publish directory
   - Confirm the deployment

6. To deploy to production:
```bash
netlify deploy --prod
```

### Environment Variables
If you need to set environment variables:

1. Go to Site settings > Build & deploy > Environment
2. Add your environment variables
3. Rebuild and deploy your site

### Custom Domain
To set up a custom domain:

1. Go to Site settings > Domain management
2. Add your custom domain
3. Follow the DNS configuration instructions

### Deployment Features
- Continuous Deployment from Git
- Automatic HTTPS
- CDN Distribution
- Asset Optimization
- Preview Deployments
- Roll-backs

## License
This project is licensed under the MIT License - see the LICENSE file for details.
