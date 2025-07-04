# African Centre for Statistics Country-Based Reporting Dashboard

This repository contains the concept and related documentation for the `African Centre for Statistics (ACS) Country Engagement Dashboard`, an internal reporting tool designed to enhance `visibility`, `accountability`, and `strategic alignment` of ACS interventions across African countries.


### 1. Overview

The ACS Country Engagement Dashboard addresses the current lack of a centralized, dynamic platform for a country-level overview of ACS engagements. 

It aims to provide a `clear` and `interactive` overview of ACS activities in each African country, linked directly to UNECA's `strategic frameworks` and `delivery indicators`. 

The dashboard will help in monitoring ACS's delivery, identifying gaps, and reporting results, particularly at the country level.


### 2. Objectives
The dashboard is designed to:

- Display ACS activities by country, mapped against Programme `Planning and Budgeting (PPB)` outputs and `Annual Business Plan (ABP)` priorities. 

- Facilitate evidence-based reporting, strategic oversight, and coordination. 

- Enhance accountability and visibility of country-level engagements. 

- Support tracking of delivery progress, status updates, and alignment with SDGs and Gender Marker coding. 

### 3. Core Features

The dashboard will include the following core features:


#### 1: General Features
- Modern and clean React-based architecture
- Responsive design for all screen sizes
- Dark/Light theme support
- Data Export and Sharing: URL-based filter sharing
- It support page pagination for long content 

#### 2. Interactive African Map
- Visual representation of intervention countries
- Responsive tooltips showing country information
- Multiple Country selection/deselection
- Selection counter and clear selection button
- Dynamic legends adapting to visualization modes


#### 3. Advanced Filtering System
- Filter by Strategic Result Areas (4):
  - Production and Dissemination of Comparable Economic Data
  - Integration of Statistical and Geospatial Information Frameworks
  - Digital Transformation and Modernization of Statistical Systems
  - Improved CRVS System
- Sub-strategic result area filtering
- Country-specific filtering
- Partnership-based filtering
- Clear selection button


#### 3. Detailed Report Cards
- Comprehensive project information display
- Expandable/collapsible detailed view
- Report cards showing intervention details including:
  - Strategic and sub-strategic result areas
  - Intervention country
  - Partnership information
  - Project year
  - SDG contributions
  - Supporting links
  - Detailed project descriptions

#### 4: Data Visualization Components:
- Intervention Heat Map
- Regional Bar Chart showing intervention distribution


- The reporting dashboard is built using **React**, a popular **JavaScript library** for building user interfaces.

- **vite** is used for fast development.

- **Tailwind CSS** for styling and **ESLint** for code quality.

- **JSON** for data storage and structure.

- **GeoJSON** for geographical data mapping.


### 4. Implementation Plan (High-Level Timeline)

The implementation involves several key steps:
- Week 1: Review ABP and PPB documents. 
- Week 2: Define data structure and design the data collection tool. 
- Week 3: Pilot data collection with 3-5 countries and develop a prototype. 
- Week 5: Internal validation and feedback session. 
- Week 6: Finalize dashboard with full data and visualizations. 
- Week 7: Prepare Standard Operating Procedures (SOP) and internal rollout, followed by final validation and approval. 


### 5. Lead and Collaborative Units

- Lead Unit: Project Management Office (PMO), African Centre for Statistics (ACS). 

- Economic, Infrastructure and Agriculture Statistics Section (EIASS).

- Collaborative Unit: Statistical Development, Data Innovation and Outreach Section (SDDIOS). 


### 6. Information to be Collected

The dashboard will incorporate information across various ACS activities, including:

- Parliamentary Documentation and Substantive Meetings/Conferences (e.g., StatCom-Africa, UN-GGIM: Africa, CRVS Conference). 

- RPTC (Regular Programme for Technical Cooperation) Projects. 

- Seminars, Workshops, and Trainings. 

- Publications (country-relevant statistical publications). 

- Digital Products and Databases (e.g., eCASTAT, SDG Dashboards). 

- Advisory and Technical Support Services. 

- Outreach Events (e.g., Statistical Days, Geospatial Days). 

- Partnerships (UNCTs, inter-agency, bilateral, private sector, academia). 

### 7. Suggested Data Collection Form Contents (Google Form Structure)

The data collection will be structured into several sections, including:

- General Information (Country, ACS Section, Reporting Period). 

- Parliamentary Documentation & Conferences. 

- RPTC Projects. 

- XB Projects (Extra-Budgetary Projects). 

- DA Projects (Development Assistance Projects). 

- Seminars, Workshops, Trainings. 

- Publications. 

- Digital Tools & Databases. 

- Technical Advisory & Support. 

- Outreach Events. 

- Partnerships. 

- Strategic Linkages (SDGs, Cross-cutting Focus Areas). 

- Supporting Documentation. 

## License
This project is licensed under the MIT License - see the LICENSE file for details.
