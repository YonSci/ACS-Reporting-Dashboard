# African Centre for Statistics Country-Based Reporting Dashboard

This repository contains the concept and related documentation for the `African Centre for Statistics (ACS) Country Engagement Dashboard`, an internal reporting tool designed to enhance visibility, accountability, and strategic alignment of the interventions with the United Nations Economic Commission for Africa (UNECA) `Annual Business Plan (ABP)` and `Programme Planning and Budgeting (PPB)` framework.  


### 1. Overview

The `ACS Country Engagement Dashboard` addresses the current lack of a centralized, dynamic platform for a country-level overview of ACS engagements. 

It aims to provide a clear and interactive overview of ACS activities and interventions in each African country, linked directly to UNECA's strategic frameworks. 

The mapping also organized by themes, such as `Strategic Result Areas`, `Sub Strategic Result Areas`, `Partnerships`,  `Project year`, `SDG contributions`, `Supporting links`, and `Detailed project descriptions`.  

The dashboard will help in monitoring ACS's delivery, identifying gaps, and reporting results, particularly at the country level.

### 2. Objectives

The dashboard is designed to:

- Display ACS activities by country, mapped against `Annual Business Plan (ABP)` priorities and `Programme Planning and Budgeting (PPB)` outputs. 

- Facilitate evidence-based reporting, strategic oversight, and coordination. 

- Enhance accountability and visibility of country-level engagements. 

- Support tracking of delivery progress, status updates, and alignment with SDGs and Gender Marker coding. 

### 3. Core Features

The dashboard include the following core features:

#### General Features
- Modern and clean React-based architecture
- Responsive design for all screen sizes
- Dark/Light theme support
- Data Export and Sharing: URL-based filter sharing
- It support page pagination for long content 

#### Interactive African Map
- Visual representation of intervention countries
- Responsive tooltips showing country information
- Multiple Country selection/deselection
- Selection counter and clear selection button
- Dynamic legends adapting to visualization modes


#### Advanced Filtering System
- Filter by Strategic Result Areas (4):
  - Strategic Result Area 1: Production and Dissemination of Comparable Economic Data  
  - Strategic Result Area 2: Integration of Statistical and Geospatial Information Frameworks  
  - Strategic Result Area 3: Digital Transformation and Modernization of Statistical Systems   
  - Strategic Result Area 4: Improved CRVS System  

- Sub-strategic result area filtering  
- Country-specific filtering  
- Partnership-based filtering  
- Clear selection button  


#### Detailed Report Cards
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

#### Data Visualization Components:
- Intervention Heat Map
- Regional Bar Chart showing intervention distribution

### 4. Tech stacks

#### Frontend:

- **React**: A popular JavaScript library for building user interfaces.
- **Vite**: A fast development build tool for modern web projects.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **ESLint**: A tool for maintaining code quality and enforcing coding standards.

#### Backend:

- **Node.js**: A JavaScript runtime for building server-side applications.
- **Express.js**: A web application framework for Node.js.
- **MongoDB Atlas**: A cloud-based NoSQL database for storing and managing data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB.

#### Data Formats:

- **JSON**: Used for data storage and structure.
- **GeoJSON**: Used for geographical data mapping.


### 4. Implementation Plan (High-Level Timeline)

The implementation involves several key steps:

| Week | Task | Responsible | Status |
|------|------|-------------|--------|
| 1    | Review ABP and PPB documents | PMO | Completed |
| 2    | Define data structure and design the data collection tool | PMO | Completed |
| 3    | Pilot data collection with 3-5 countries and develop a prototype | PMO | Completed |
| 4 -5    | Dashboard devlopment and deployment | Dev Team | Completed |
| 6    | Testing and debugging | Dev Team | Completed |
| 7    | First review and approval | OiC- ACS, SDDIOS, EIASS | Completed |
| 8    | Prepare Standard Operating Procedures (SOP) and internal rollout | OiC ACS and section chiefs | Ongoing |
| 9    | Final validation and approval | OiC- ACS and section chiefs | Ongoing |
| 10   | Finalize and document the project | PMO | Ongoing |

### 5. Information Collected

The dashboard incorporated information across various ACS activities, including:

- Parliamentary Documentation and Substantive Meetings/Conferences (e.g., StatCom-Africa, UN-GGIM: Africa, CRVS Conference). 

- RPTC (Regular Programme for Technical Cooperation) Projects.

- XB Projects (Extra-Budgetary Projects). 

- DA Projects (Development Assistance Projects). 

- Seminars, Workshops, and Trainings. 

- Publications (country-relevant statistical publications). 

- Digital Products and Databases (e.g., eCASTAT, SDG Dashboards). 

- Advisory and Technical Support Services. 

- Outreach Events (e.g., Statistical Days, Geospatial Days). 

- Partnerships (UNCTs, inter-agency, bilateral, private sector, academia). 

- Strategic Linkages (SDGs, Cross-cutting Focus Areas). 

- Supporting Documentation. 


## Lead and Collaborative Units

- Lead Unit: Project Management Office (PMO), African Centre for Statistics (ACS). 

- Statistical Development, Data Innovation and Outreach Section (SDDIOS). 

- Economic, Infrastructure and Agriculture Statistics Section (EIASS).

## License
This project is licensed under the MIT License - see the LICENSE file for details.
