// Africa Country Codes
export const AfricaCountryCodes = {
  ALGERIA: 'Algeria',
  ANGOLA: 'Angola',
  BENIN: 'Benin',
  BOTSWANA: 'Botswana',
  BURKINA_FASO: 'Burkina Faso',
  BURUNDI: 'Burundi',
  CAMEROON: 'Cameroon',
  CABO_VERDE: 'Cabo Verde', 
  CENTRAL_AFRICAN_REPUBLIC: 'Central African Republic',
  CHAD: 'Chad',
  COMOROS: 'Comoros',
  CONGO: 'Congo',
  DEMOCRATIC_REPUBLIC_OF_CONGO: 'Democratic Republic of Congo',
  DJIBOUTI: 'Djibouti',
  EGYPT: 'Egypt',
  EQUATORIAL_GUINEA: 'Equatorial Guinea',
  ERITREA: 'Eritrea',
  ETHIOPIA: 'Ethiopia',
  GABON: 'Gabon',
  GAMBIA: 'Gambia',
  GHANA: 'Ghana',
  GUINEA: 'Guinea',
  GUINEA_BISSAU: 'Guinea-Bissau',
  COTE_DIVOIRE: 'Côte divoire',  
  KENYA: 'Kenya',
  LESOTHO: 'Lesotho',
  LIBERIA: 'Liberia',
  LIBYA: 'Libya',
  MADAGASCAR: 'Madagascar',
  MALAWI: 'Malawi',
  MALI: 'Mali',
  MAURITANIA: 'Mauritania',
  MAURITIUS: 'Mauritius',
  MOROCCO: 'Morocco',
  MOZAMBIQUE: 'Mozambique',
  NAMIBIA: 'Namibia',
  NIGER: 'Niger',
  NIGERIA: 'Nigeria',
  RWANDA: 'Rwanda',
  SAO_TOME_AND_PRINCIPE: 'Sao Tome and Principe',
  SENEGAL: 'Senegal',
  SEYCHELLES: 'Seychelles',
  SIERRA_LEONE: 'Sierra Leone',
  SOMALIA: 'Somalia',
  SOUTH_AFRICA: 'South Africa',
  SOUTH_SUDAN: 'South Sudan',
  SUDAN: 'Sudan',
  ESWATINI: 'Eswatini', // Formerly Swaziland
  TANZANIA: 'Tanzania',
  TOGO: 'Togo',
  TUNISIA: 'Tunisia',
  UGANDA: 'Uganda',
  WESTERN_SAHARA: 'Western Sahara',
  ZAMBIA: 'Zambia',
  ZIMBABWE: 'Zimbabwe'
};

// Strategic Result Areas with full names
export const STRATEGIC_RESULT_AREAS = {
  "Strategic Result Area 1": "Strategic Result Area 1: Production and Dissemination of Comparable Economic Data",
  "Strategic Result Area 2": "Strategic Result Area 2: Integration of Statistical and Geospatial Information Frameworks",
  "Strategic Result Area 3": "Strategic Result Area 3: Digital Transformation and Modernization of Statistical Systems",
  "Strategic Result Area 4": "Strategic Result Area 4: Improved CRVS System"
};

export const STRATEGIC_RESULTS_HIERARCHY = {
  "Strategic Result Area 1": [
    "Integration into the TiVA Database",
    "Support to produce GDP and other key national accounts indicators",
    "Big data, machine learning, and digital technologies"
  ],
  "Strategic Result Area 2": [
    "Integrated Geospatial Information Framework [IGIF] (ECA-Africa Secretariat) Country-Led Action Plans Implementation processes",
    "Developing Fundamental Datasets and Standards: National Geospatial Datasets",
    "Implementation of the African Geodetic Reference Frame (AFREF)",
    "Geopatial Land Management and Adminstration",
    "Spatial Analysis Angola: Geo-statistics for the development of urban spatial frameworks in Africa",
    "Spatial Analysis-Madagascar Nexus-Water-Energy-Food",
    "Spatial Analysis-Nexus-Climate Change-Environment-Food Security"
  ],
  "Strategic Result Area 3": [
    "Implementation of the Roadmap for Transformation and Modernization of Statistics in Africa",
    "Modernizing Agropastoral data",
    "Modernizing Turnover Index",
    "Modernizing GDP data Production",
    "Advancing South-South Cooperation Measurement",
    "SDG Dashboard Work Package",
    "National Quality Assurance Framework",
    "The UN regional Hub on Big Data and Data Science for Africa",
    "Performace Dashboard",
    "Support on Census Field Monitoring System",
    "Common data reporting and exchange mechanisms for SDGs, Agenda 2063 and socio-economic datasets"
  ],
  "Strategic Result Area 4": [
    "CVRS Mentorship",
    "Capacity development on CRVS Applied Research",
    "Tablet Support and Dashboard",
    "Support on the 4th Population and Health Survey"
  ],
};

export const ALL_AFRICAN_COUNTRIES = Object.values(AfricaCountryCodes).sort();

// Partnerships list
export const PARTNERSHIPS = [
  'AfDB',
  'AFRISTAT',
  'AUC',
  'European Union',
  'INSEED',
  'IOM',
  'Ministries of Climate Change-Environment-Agriculture',
  'Ministries of Water-Energy-Agriculture',
  'National Mapping Agencies',
  'National Statistics Offices',
  'NGOs',
  'OIBC-1',
  'OECD',
  'ONS-UK',
  'SDG Alliance',
  'UNCIEF',
  'UNESCAP',
  'UNHCR',
  'UNICEF',
  'UNRCO',
  'UNSD',
  'WFP',
  'WTO'
];

// Update the mock reports to use these partnerships
export const MOCK_REPORTS = [

    {
      "id": "0",
      "strategicResultArea": "",
      "subStrategicResultArea": "",
      "interventionCountry": AfricaCountryCodes.ALGERIA,
      "partnerships": "WTO, OECD",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": ""
    },
    
    {
      "id": "1",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Spatial Analysis Angola: Geo-statistics for the development of urban spatial frameworks in Africa",
      "interventionCountry": AfricaCountryCodes.ANGOLA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Geospatial databases develped",
        "Compiled several data sets including geospatial information, satellite imagery, demographic, and socio-economic data",
        "Study report on geo-statistical foundation to assist urban planners in African cities completed",
        "Geostatic models developed",
        "Urban spatial framework and geodatabase repository developed to promote sustainable, equitable, connected, resilient and economically vibrant environments"
      ]
    },
    {
      "id": "2",
      "strategicResultArea": "Strategic Result Area 1",
      "subStrategicResultArea": "Integration into the TiVA Database",
      "interventionCountry": AfricaCountryCodes.BENIN,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Integration into the TiVA Database completed",
        "National Supply and Use Tables (SUT) aliegned to international classification standards",
        "Regional seminar on learning and practice on National Accounts, SUT, Input-Output Table, trade in service and trade in commodities for the AfCIOT",
        "Advisory support provided to prepare and compile national data and validate AfCIOT national intermediary outputs"
      ]
    },
    {
      "id": "3",
      "strategicResultArea": "Strategic Result Area 3",
      "subStrategicResultArea": "Support on Census Field Monitoring System",
      "interventionCountry": AfricaCountryCodes.BENIN,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "A well-organized Census Monitoring Dashboard developed",
        "Census monitoring capacities of respective countries developed"
      ]
    },
    {
      "id": "4",
      "strategicResultArea": "Strategic Result Area 3",
      "subStrategicResultArea": "Support on Census Field Monitoring System",
      "interventionCountry": AfricaCountryCodes.BENIN,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Post-Enumeration auto-matching completed in Gambia, with IT assets such as the census monitoring dashboard, tablets/smartphones, and a field issues tracking system deployed.",
        "Capacities in the respective countries developed to undertake high quality and timely censuses that fulfil the five qualities defined by the UN of individual enumeration, universality within a defined territory, simultaneity, and defined periodicity."
      ]
    },
    {
      "id": "5",
      "strategicResultArea": "Strategic Result Area 3",
      "subStrategicResultArea": "Performace Dashboard",
      "interventionCountry": AfricaCountryCodes.BOTSWANA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "The performance Dashboard launched and in Botswana,"
      ]
    },
    {
      "id": "6",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Integrated Geospatial Information Framework [IGIF] (ECA-Africa Secretariat) Country-Led Action Plans Implementation processes",
      "interventionCountry": AfricaCountryCodes.BURKINA_FASO,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Workshops and trainings facilitated on United Nations Integrated Geospatial Information Framework"
      ]
    },
    {
      "id": "7",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Developing Fundamental Datasets and Standards: National Geospatial Datasets",
      "interventionCountry": AfricaCountryCodes.BURKINA_FASO,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Geocoding, Enumeration Areas mapping, Digital Address Systems, Geographic Names, spatial Analysis of Census Data developed"
      ]
    },
    {
      "id": "8",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Geopatial Land Management and Adminstration",
      "interventionCountry": AfricaCountryCodes.BURKINA_FASO,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Implementing land reforms and cadastral urban land management promoted",
        "Technical advisory support on land reforms and cadastral urban land management provided"
      ]
    },
    {
      "id": "9",
      "strategicResultArea": "Strategic Result Area 4",
      "subStrategicResultArea": "CVRS Mentorship",
      "interventionCountry": AfricaCountryCodes.BURKINA_FASO,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "A national CRVS stakeholders coordination framework established",
        "Key national priorities through the application of the CRVS systems improvement framework identified"
      ]
    },
    {
      "id": "10",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Developing Fundamental Datasets and Standards: National Geospatial Datasets",
      "interventionCountry": AfricaCountryCodes.BURUNDI,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Geocoding, Enumeration Areas mapping, Digital Address Systems, Geographic Names, spatial Analysis of Census Data developed",
        "Geospatial databeses developed"
      ]
    },
    {
      "id": "11",
      "strategicResultArea": "Strategic Result Area 3",
      "subStrategicResultArea": "Modernizing Agropastoral data",
      "interventionCountry": AfricaCountryCodes.BURUNDI,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "A thorough analysis of the quality and structure of agropastoral data completed",
        "Quality assurance on the centralized agropastoral data",
        "Data management streamlined and the overall efficiency and accuracy of agricultural statistics production improved"
      ]
    },
    {
      "id": "12",
      "strategicResultArea": "Strategic Result Area 3",
      "subStrategicResultArea": "Support on Census Field Monitoring System",
      "interventionCountry": AfricaCountryCodes.BURUNDI,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "A well-organized Census Monitoring Dashboard developed",
        "Census monitoring capacities of respective countries developed"
      ]
    },
    {
      "id": "13",
      "strategicResultArea": "Strategic Result Area 3",
      "subStrategicResultArea": "Common data reporting and exchange mechanisms for SDGs, Agenda 2063 and socio-economic datasets",
      "interventionCountry": AfricaCountryCodes.BURUNDI,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Assessment of reporting and dissemination needs identified",
        "Country reporting and dissemination platform in four member States deployed",
        "Staff from countries trained in dissemination"
      ]
    },
    {
      "id": "14",
      "strategicResultArea": "Strategic Result Area 4",
      "subStrategicResultArea": "CVRS Mentorship",
      "interventionCountry": AfricaCountryCodes.BURUNDI,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "A national CRVS stakeholders coordination framework established",
        "Key national priorities through the application of the CRVS systems improvement framework identified"
      ]
    },
    {
      "id": "15",
      "strategicResultArea": "Strategic Result Area 4",
      "subStrategicResultArea": "Tablet Support and Dashboard",
      "interventionCountry": AfricaCountryCodes.BURUNDI,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Comprehensive support provided in the form of supplying tablets, utilizing a census-monitoring dashboard and help desk tool."
      ]
    },
    {
      "id": "16",
      "strategicResultArea": "Strategic Result Area 1",
      "subStrategicResultArea": "Integration into the TiVA Database",
      "interventionCountry": AfricaCountryCodes.CAMEROON,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Integration into the TiVA Database completed",
        "National Supply and Use Tables (SUT) aliegned to international classification standards",
        "Regional seminar on learning and practice on National Accounts, SUT, Input-Output Table, trade in service and trade in commodities for the AfCIOT",
        "Advisory support provided to prepare and compile national data and validate AfCIOT national intermediary outputs"
      ]
    },
    {
      "id": "17",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Integrated Geospatial Information Framework [IGIF] (ECA-Africa Secretariat) Country-Led Action Plans Implementation processes",
      "interventionCountry": AfricaCountryCodes.CAMEROON,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Workshops and trainings facilitated on United Nations Integrated Geospatial Information Framework",
        "Country Action plan developed on IGIF"
      ]
    },
    {
      "id": "18",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Developing Fundamental Datasets and Standards: National Geospatial Datasets",
      "interventionCountry": AfricaCountryCodes.CAMEROON,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Geocoding, Enumeration Areas mapping, Digital Address Systems, Geographic Names, spatial Analysis of Census Data developed"
      ]
    },
    {
      "id": "19",
      "strategicResultArea": "Strategic Result Area 3",
      "subStrategicResultArea": "Modernizing Turnover Index",
      "interventionCountry": AfricaCountryCodes.CAMEROON,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Advisory technical support to review and validate the methodology and preliminary results of the Turnover Indices derived from administrative data",
        "A comprehensive roadmap has been prepared to finalize the production of the Turnover Index"
      ]
    },
    {
      "id": "20",
      "strategicResultArea": "Strategic Result Area 3",
      "subStrategicResultArea": "SDG Dashboard Work Package",
      "interventionCountry": AfricaCountryCodes.CAMEROON,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Advisory technical support to finalize the configuration of their national open SDG platforms.",
        "Capacities built in standardizing and harmonizing SDG data and metadata for machine-readable dissemination."
      ]
    },
    {
      "id": "21",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Integrated Geospatial Information Framework [IGIF] (ECA-Africa Secretariat) Country-Led Action Plans Implementation processes",
      "interventionCountry": AfricaCountryCodes.COMOROS,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Workshops and trainings facilitated on United Nations Integrated Geospatial Information Framework"
      ]
    },
    {
      "id": "22",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Developing Fundamental Datasets and Standards: National Geospatial Datasets",
      "interventionCountry": AfricaCountryCodes.COMOROS,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Geocoding, Enumeration Areas mapping, Digital Address Systems, Geographic Names, spatial Analysis of Census Data developed"
      ]
    },
    {
      "id": "23",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Implementation of the African Geodetic Reference Frame (AFREF)",
      "interventionCountry": AfricaCountryCodes.COMOROS,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Technical advisory support provided on African Geodetic Reference Frame (AFREF) implementation"
      ]
    },
    {
      "id": "24",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Geopatial Land Management and Adminstration",
      "interventionCountry": AfricaCountryCodes.COMOROS,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Implementing land reforms and cadastral urban land management promoted",
        "Technical advisory support on land reforms and cadastral urban land management provided"
      ]
    },
    {
      "id": "25",
      "strategicResultArea": "Strategic Result Area 1",
      "subStrategicResultArea": "Big data, machine learning, and digital technologies",
      "interventionCountry": AfricaCountryCodes.DEMOCRATIC_REPUBLIC_OF_CONGO,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Organized multiple training sessions for national statistical offices (NSOs) in GDP nowcasting, focusing on the use of Google Trends data to estimate economic indicators in near real-time.",
        "Development of a Google Trends-based nowcasting tool to help NSOs produce more timely economic estimates."
      ]
    },
    {
      "id": "26",
      "strategicResultArea": "Strategic Result Area 3",
      "subStrategicResultArea": "Support on Census Field Monitoring System",
      "interventionCountry": AfricaCountryCodes.DJIBOUTI,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "A well-organized Census Monitoring Dashboard developed",
        "Census monitoring capacities of respective countries developed"
      ]
    },
    {
      "id": "27",
      "strategicResultArea": "Strategic Result Area 3",
      "subStrategicResultArea": "Support on Census Field Monitoring System",
      "interventionCountry": AfricaCountryCodes.DJIBOUTI,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Post-Enumeration auto-matching completed in Gambia, with IT assets such as the census monitoring dashboard, tablets/smartphones, and a field issues tracking system deployed.",
        "Census project management toolkit provided, alongside dissemination of results and the use of Computer-Assisted Personal Interviews (CAPI)"
      ]
    },
    {
      "id": "28",
      "strategicResultArea": "Strategic Result Area 1",
      "subStrategicResultArea": "Integration into the TiVA Database",
      "interventionCountry": AfricaCountryCodes.EGYPT,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Integration into the TiVA Database completed",
        "National Supply and Use Tables (SUT) aliegned to international classification standards",
        "Regional seminar on learning and practice on National Accounts, SUT, Input-Output Table, trade in service and trade in commodities for the AfCIOT",
        "Advisory support provided to prepare and compile national data and validate AfCIOT national intermediary outputs"
      ]
    },
    {
      "id": "29",
      "strategicResultArea": "Strategic Result Area 1",
      "subStrategicResultArea": "Big data, machine learning, and digital technologies",
      "interventionCountry": AfricaCountryCodes.EGYPT,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Organized multiple training sessions for national statistical offices (NSOs) in GDP nowcasting, focusing on the use of Google Trends data to estimate economic indicators in near real-time.",
        "Development of a Google Trends-based nowcasting tool to help NSOs produce more timely economic estimates."
      ]
    },
    {
      "id": "30",
      "strategicResultArea": "Strategic Result Area 3",
      "subStrategicResultArea": "Support on Census Field Monitoring System",
      "interventionCountry": AfricaCountryCodes.EQUATORIAL_GUINEA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Capacities in the respective countries developed to undertake high quality and timely censuses that fulfil the five qualities defined by the UN of individual enumeration, universality within a defined territory, simultaneity, and defined periodicity."
      ]
    },
    {
      "id": "31",
      "strategicResultArea": "Strategic Result Area 1",
      "subStrategicResultArea": "Support to produce GDP and other key national accounts indicators",
      "interventionCountry": AfricaCountryCodes.ERITREA,
      "partnerships": [
        "UNRCO"
      ],
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Scoping missions to understand the existing practices",
        "Capacity development trainings and experience sharing stages with NSO in Kenya organized to develop institutional frameworks and enhance technical skills necessary for the regular production of GDP and other critical indicators in accordance with the 2008 System of National Accounts.",
        "Data collection tools standardized to ensure they enable the collection of data and information required for the compilation of GDP estimates through the production approach and by economic activities"
      ]
    },
    {
      "id": "32",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Developing Fundamental Datasets and Standards: National Geospatial Datasets",
      "interventionCountry": AfricaCountryCodes.ERITREA,
      "partnerships": [
        "UNRCO"
      ],
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Geospatial databeses developed"
      ]
    },
    {
      "id": "33",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Spatial Analysis- [Nexus-Climate Change-Environment-Food Security]",
      "interventionCountry": AfricaCountryCodes.ERITREA,
      "partnerships": [
        "UNRCO"
      ],
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Spatial patterns and hotspots of vulnerability to climate change impacts on food security, especially in rain-fed agriculture and fragile ecosystems identified",
        "Interactions between climate variability, environmental degradation, and socioeconomic factors affecting food production and nutrition anakyzed",
        "Targeted policies and interventions to address food insecurity, promote sustainable resource management, and build climate resilience supported",
        "Data, remote sensing, and modeling tools for improved early warning systems and decision-making at all levels were uses"
      ]
    },
    {
      "id": "34",
      "strategicResultArea": "Strategic Result Area 3",
      "subStrategicResultArea": "Modernizing GDP data Production",
      "interventionCountry": AfricaCountryCodes.ERITREA,
      "partnerships": [
        "UNRCO"
      ],
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Available administrative data sources relevant to GDP compilation reviewed",
        "Tools are being utilized to gather the necessary administrative data for GDP calculation"
      ]
    },
    {
      "id": "35",
      "strategicResultArea": "Strategic Result Area 4",
      "subStrategicResultArea": "Support on the 4th Population and Health Survey",
      "interventionCountry": AfricaCountryCodes.ERITREA,
      "partnerships": [
        "UNRCO"
      ],
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Capacity development of NSO staff on creating a new master sampling frame, including preparation for the fourth Eritrean Population and Health Survey.",
        "Development of survey tools, including questionnaires, the computer-Assisted Personal Interview (CAPI) application, and related documentation.",
        "Experience sharing with the Kenya National Bureau of Statistics (KNBS) on tablet programming for the Eritrean Population and Health Survey"
      ]
    },
    {
      "id": "36",
      "strategicResultArea": "Strategic Result Area 1",
      "subStrategicResultArea": "Big data, machine learning, and digital technologies",
      "interventionCountry": AfricaCountryCodes.ESWATINI,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Organized training sessions for national statistical offices (NSOs) in GDP nowcasting, focusing on the use of Google Trends data to estimate economic indicators in near real-time.",
        "Development of a Google Trends-based nowcasting tool to help NSOs produce more timely economic estimates."
      ]
    },
    {
      "id": "37",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Integrated Geospatial Information Framework [IGIF] (ECA-Africa Secretariat) Country-Led Action Plans Implementation processes",
      "interventionCountry": AfricaCountryCodes.ETHIOPIA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Workshops and trainings facilitated on United Nations Integrated Geospatial Information Framework"
      ]
    },
    {
      "id": "38",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Developing Fundamental Datasets and Standards: National Geospatial Datasets",
      "interventionCountry": AfricaCountryCodes.ETHIOPIA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Geocoding, Enumeration Areas mapping, Digital Address Systems, Geographic Names, spatial Analysis of Census Data developed"
      ]
    },
    {
      "id": "39",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Implementation of the African Geodetic Reference Frame (AFREF)",
      "interventionCountry": AfricaCountryCodes.ETHIOPIA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Technical advisory support provided on African Geodetic Reference Frame (AFREF) implementation"
      ]
    },
    {
      "id": "40",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Geopatial Land Management and Adminstration",
      "interventionCountry": AfricaCountryCodes.ETHIOPIA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Implementing land reforms and cadastral urban land management promoted",
        "Technical advisory support on land reforms and cadastral urban land management provided"
      ]
    },
    {
      "id": "41",
      "strategicResultArea": "Strategic Result Area 3",
      "subStrategicResultArea": "Support on Census Field Monitoring System",
      "interventionCountry": AfricaCountryCodes.GABON,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Capacities in the respective countries developed to undertake high quality and timely censuses that fulfil the five qualities defined by the UN of individual enumeration, universality within a defined territory, simultaneity, and defined periodicity."
      ]
    },
    {
      "id": "42",
      "strategicResultArea": "Strategic Result Area 3",
      "subStrategicResultArea": "Support on Census Field Monitoring System",
      "interventionCountry": AfricaCountryCodes.GAMBIA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "A well-organized Census Monitoring Dashboard developed",
        "Census monitoring capacities of respective countries developed"
      ]
    },
    {
      "id": "43",
      "strategicResultArea": "Strategic Result Area 3",
      "subStrategicResultArea": "Support on Census Field Monitoring System",
      "interventionCountry": AfricaCountryCodes.GAMBIA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Post-Enumeration auto-matching completed in Gambia, with IT assets such as the census monitoring dashboard, tablets/smartphones, and a field issues tracking system deployed.",
        "Capacities in the respective countries developed to undertake high quality and timely censuses that fulfil the five qualities defined by the UN of individual enumeration, universality within a defined territory, simultaneity, and defined periodicity."
      ]
    },
    {
      "id": "44",
      "strategicResultArea": "Strategic Result Area 3",
      "subStrategicResultArea": "Common data reporting and exchange mechanisms for SDGs, Agenda 2063 and socio-economic datasets",
      "interventionCountry": AfricaCountryCodes.GAMBIA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Assessment of reporting and dissemination needs identified",
        "Country reporting and dissemination platform in four member States deployed",
        "Staff from countries trained in dissemination"
      ]
    },
    {
      "id": "45",
      "strategicResultArea": "Strategic Result Area 4",
      "subStrategicResultArea": "Tablet Support and Dashboard",
      "interventionCountry": AfricaCountryCodes.GAMBIA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Comprehensive support provided in the form of supplying tablets, utilizing a census-monitoring dashboard and help desk tool."
      ]
    },
    {
      "id": "46",
      "strategicResultArea": "Strategic Result Area 1",
      "subStrategicResultArea": "Integration into the TiVA Database",
      "interventionCountry": AfricaCountryCodes.GHANA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Integration into the TiVA Database completed",
        "National Supply and Use Tables (SUT) aliegned to international classification standards",
        "Regional seminar on learning and practice on National Accounts, SUT, Input-Output Table, trade in service and trade in commodities for the AfCIOT",
        "Advisory support provided to prepare and compile national data and validate AfCIOT national intermediary outputs"
      ]
    },
    {
      "id": "47",
      "strategicResultArea": "Strategic Result Area 4",
      "subStrategicResultArea": "CVRS Mentorship",
      "interventionCountry": AfricaCountryCodes.GHANA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "A national CRVS stakeholders coordination framework established",
        "Key national priorities through the application of the CRVS systems improvement framework identified"
      ]
    },
    {
      "id": "48",
      "strategicResultArea": "Strategic Result Area 1",
      "subStrategicResultArea": "Integration into the TiVA Database",
      "interventionCountry": AfricaCountryCodes.COTE_DIVOIRE,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Integration into the TiVA Database completed",
        "National Supply and Use Tables (SUT) aliegned to international classification standards",
        "Regional seminar on learning and practice on National Accounts, SUT, Input-Output Table, trade in service and trade in commodities for the AfCIOT",
        "Advisory support provided to prepare and compile national data and validate AfCIOT national intermediary outputs"
      ]
    },
    {
      "id": "49",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Integrated Geospatial Information Framework [IGIF] (ECA-Africa Secretariat) Country-Led Action Plans Implementation processes",
      "interventionCountry": AfricaCountryCodes.COTE_DIVOIRE,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Workshops and trainings facilitated on United Nations Integrated Geospatial Information Framework"
      ]
    },
    {
      "id": "50",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Developing Fundamental Datasets and Standards: National Geospatial Datasets",
      "interventionCountry": AfricaCountryCodes.COTE_DIVOIRE,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Geocoding, Enumeration Areas mapping, Digital Address Systems, Geographic Names, spatial Analysis of Census Data developed"
      ]
    },
    {
      "id": "51",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Implementation of the African Geodetic Reference Frame (AFREF)",
      "interventionCountry": AfricaCountryCodes.COTE_DIVOIRE,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Technical advisory support provided on African Geodetic Reference Frame (AFREF) implementation"
      ]
    },
    {
      "id": "52",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Geopatial Land Management and Adminstration",
      "interventionCountry": AfricaCountryCodes.COTE_DIVOIRE,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Implementing land reforms and cadastral urban land management promoted",
        "Technical advisory support on land reforms and cadastral urban land management provided"
      ]
    },
    {
      "id": "53",
      "strategicResultArea": "Strategic Result Area 1",
      "subStrategicResultArea": "Integration into the TiVA Database",
      "interventionCountry": AfricaCountryCodes.KENYA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Integration into the TiVA Database completed",
        "National Supply and Use Tables (SUT) aliegned to international classification standards",
        "Regional seminar on learning and practice on National Accounts, SUT, Input-Output Table, trade in service and trade in commodities for the AfCIOT",
        "Advisory support provided to prepare and compile national data and validate AfCIOT national intermediary outputs"
      ]
    },
    {
      "id": "54",
      "strategicResultArea": "Strategic Result Area 1",
      "subStrategicResultArea": "Big data, machine learning, and digital technologies",
      "interventionCountry": AfricaCountryCodes.KENYA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Organized multiple training sessions for national statistical offices (NSOs) in GDP nowcasting, focusing on the use of Google Trends data to estimate economic indicators in near real-time.",
        "Development of a Google Trends-based nowcasting tool to help NSOs produce more timely economic estimates."
      ]
    },
    {
      "id": "55",
      "strategicResultArea": "Strategic Result Area 1",
      "subStrategicResultArea": "Big data, machine learning, and digital technologies",
      "interventionCountry": AfricaCountryCodes.LESOTHO,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Organized  training sessions for national statistical offices (NSOs) in GDP nowcasting, focusing on the use of Google Trends data to estimate economic indicators in near real-time.",
        "Development of a Google Trends-based nowcasting tool to help NSOs produce more timely economic estimates."
      ]
    },
    {
      "id": "56",
      "strategicResultArea": "Strategic Result Area 4",
      "subStrategicResultArea": "CVRS Mentorship",
      "interventionCountry": AfricaCountryCodes.LESOTHO,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "A national CRVS stakeholders coordination framework established",
        "Key national priorities through the application of the CRVS systems improvement framework identified"
      ]
    },
    {
      "id": "57",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Developing Fundamental Datasets and Standards: National Geospatial Datasets",
      "interventionCountry": AfricaCountryCodes.MADAGASCAR,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Geospatial databases develped"
      ]
    },
    {
      "id": "58",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Spatial Analysis-Madagascar [Nexus-Water-Energy-Food]",
      "interventionCountry": AfricaCountryCodes.MADAGASCAR,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Map and analyze the distribution of water, energy, and food resources, identifying challenges and opportunities completed",
        "Design coordinated interventions and business models to optimize benefits across sectors.",
        "Build capacity and inform policy and investment frameworks, focusing on Nexus-Water-Energy-Food Geoportals."
      ]
    },
    {
      "id": "59",
      "strategicResultArea": "Strategic Result Area 3",
      "subStrategicResultArea": "Performace Dashboard",
      "interventionCountry": AfricaCountryCodes.MALAWI,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "The technical and advisory supports tto develop the performance management dasahboard are ongoing in Malawi"
      ]
    },
    {
      "id": "60",
      "strategicResultArea": "Strategic Result Area 4",
      "subStrategicResultArea": "Capacity development on CRVS Applied Research",
      "interventionCountry": AfricaCountryCodes.MALAWI,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "The researchers have been studying the determinants of incomplete registration of vital events and identifying barriers to universal coverage.",
        "Findings from respective researchers have been disseminated to governments to help address barriers related to CRVS and improve registration systems."
      ]
    },
    {
      "id": "61",
      "strategicResultArea": "Strategic Result Area 1",
      "subStrategicResultArea": "Integration into the TiVA Database",
      "interventionCountry": AfricaCountryCodes.MALI,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Integration into the TiVA Database completed",
        "National Supply and Use Tables (SUT) aliegned to international classification standards",
        "Regional seminar on learning and practice on National Accounts, SUT, Input-Output Table, trade in service and trade in commodities for the AfCIOT",
        "Advisory support provided to prepare and compile national data and validate AfCIOT national intermediary outputs"
      ]
    },
    {
      "id": "62",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Integrated Geospatial Information Framework [IGIF] (ECA-Africa Secretariat) Country-Led Action Plans Implementation processes",
      "interventionCountry": AfricaCountryCodes.MALI,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Workshops and trainings facilitated on United Nations Integrated Geospatial Information Framework",
        "Developed country Action Plan on IGIF"
      ]
    },
    {
      "id": "63",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Developing Fundamental Datasets and Standards: National Geospatial Datasets",
      "interventionCountry": AfricaCountryCodes.MALI,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Geocoding, Enumeration Areas mapping, Digital Address Systems, Geographic Names, spatial Analysis of Census Data developed"
      ]
    },
    {
      "id": "64",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Implementation of the African Geodetic Reference Frame (AFREF)",
      "interventionCountry": AfricaCountryCodes.MALI,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Technical advisory support provided on African Geodetic Reference Frame (AFREF) implementation"
      ]
    },
    {
      "id": "65",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Geopatial Land Management and Adminstration",
      "interventionCountry": AfricaCountryCodes.MALI,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Implementing land reforms and cadastral urban land management promoted",
        "Technical advisory support on land reforms and cadastral urban land management provided"
      ]
    },
    {
      "id": "66",
      "strategicResultArea": "Strategic Result Area 1",
      "subStrategicResultArea": "Integration into the TiVA Database",
      "interventionCountry": AfricaCountryCodes.MAURITANIA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Integration into the TiVA Database completed",
        "National Supply and Use Tables (SUT) aliegned to international classification standards",
        "Regional seminar on learning and practice on National Accounts, SUT, Input-Output Table, trade in service and trade in commodities for the AfCIOT",
        "Advisory support provided to prepare and compile national data and validate AfCIOT national intermediary outputs"
      ]
    },
    {
      "id": "67",
      "strategicResultArea": "Strategic Result Area 1",
      "subStrategicResultArea": "Integration into the TiVA Database",
      "interventionCountry": AfricaCountryCodes.MAURITIUS,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Integration into the TiVA Database completed",
        "National Supply and Use Tables (SUT) aliegned to international classification standards",
        "Regional seminar on learning and practice on National Accounts, SUT, Input-Output Table, trade in service and trade in commodities for the AfCIOT",
        "Advisory support provided to prepare and compile national data and validate AfCIOT national intermediary outputs"
      ]
    },
    {
      "id": "68",
      "strategicResultArea": "Strategic Result Area 1",
      "subStrategicResultArea": "Integration into the TiVA Database",
      "interventionCountry": AfricaCountryCodes.MOROCCO,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Integration into the TiVA Database completed",
        "National Supply and Use Tables (SUT) aliegned to international classification standards",
        "Regional seminar on learning and practice on National Accounts, SUT, Input-Output Table, trade in service and trade in commodities for the AfCIOT",
        "Advisory support provided to prepare and compile national data and validate AfCIOT national intermediary outputs"
      ]
    },
    {
      "id": "69",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Integrated Geospatial Information Framework [IGIF] (ECA-Africa Secretariat) Country-Led Action Plans Implementation processes",
      "interventionCountry": AfricaCountryCodes.MOZAMBIQUE,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Workshops and trainings facilitated on United Nations Integrated Geospatial Information Framework"
      ]
    },
    {
      "id": "70",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Implementation of the African Geodetic Reference Frame (AFREF)",
      "interventionCountry": AfricaCountryCodes.MOZAMBIQUE,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Technical advisory support provided on African Geodetic Reference Frame (AFREF) implementation"
      ]
    },
    {
      "id": "71",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Geopatial Land Management and Adminstration",
      "interventionCountry": AfricaCountryCodes.MOZAMBIQUE,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Implementing land reforms and cadastral urban land management promoted",
        "Technical advisory support on land reforms and cadastral urban land management provided"
      ]
    },
    {
      "id": "72",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Developing Fundamental Datasets and Standards: National Geospatial Datasets",
      "interventionCountry": AfricaCountryCodes.NAMIBIA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Geospatial databeses developed"
      ]
    },
    {
      "id": "73",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Spatial Analysis- [Nexus-Climate Change-Environment-Food Security]",
      "interventionCountry": AfricaCountryCodes.NAMIBIA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Spatial patterns and hotspots of vulnerability to climate change impacts on food security, especially in rain-fed agriculture and fragile ecosystems identified",
        "Interactions between climate variability, environmental degradation, and socioeconomic factors affecting food production and nutrition anakyzed",
        "Targeted policies and interventions to address food insecurity, promote sustainable resource management, and build climate resilience supported",
        "Data, remote sensing, and modeling tools for improved early warning systems and decision-making at all levels were uses"
      ]
    },
    {
      "id": "74",
      "strategicResultArea": "Strategic Result Area 3",
      "subStrategicResultArea": "Advancing South-South Cooperation Measurement",
      "interventionCountry": AfricaCountryCodes.NAMIBIA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Technical advisory support and experience sharing visit on Framework for Measuring South-South Cooperation and its accompanying Manual conducted",
        "Training workshop on the South-South Cooperation measurement framework",
        "Assessment of the data quality developed"
      ]
    },
    {
      "id": "75",
      "strategicResultArea": "Strategic Result Area 3",
      "subStrategicResultArea": "Common data reporting and exchange mechanisms for SDGs, Agenda 2063 and socio-economic datasets",
      "interventionCountry": AfricaCountryCodes.NAMIBIA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Assessment of reporting and dissemination needs identified",
        "Country reporting and dissemination platform in four member States deployed",
        "Staff from countries trained in dissemination"
      ]
    },
    {
      "id": "76",
      "strategicResultArea": "Strategic Result Area 4",
      "subStrategicResultArea": "Capacity development on CRVS Applied Research",
      "interventionCountry": AfricaCountryCodes.NAMIBIA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "The researchers have been studying the determinants of incomplete registration of vital events and identifying barriers to universal coverage.",
        "Findings from respective researchers have been disseminated to governments to help address barriers related to CRVS and improve registration systems."
      ]
    },
    {
      "id": "77",
      "strategicResultArea": "Strategic Result Area 1",
      "subStrategicResultArea": "Integration into the TiVA Database",
      "interventionCountry": AfricaCountryCodes.NIGERIA,
      "partnerships": [
        "European Union",
        "National Statistics Offices"
      ],
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Integration into the TiVA Database completed",
        "National Supply and Use Tables (SUT) aliegned to international classification standards",
        "Regional seminar on learning and practice on National Accounts, SUT, Input-Output Table, trade in service and trade in commodities for the AfCIOT",
        "Advisory support provided to prepare and compile national data and validate AfCIOT national intermediary outputs"
      ]
    },
    {
      "id": "78",
      "strategicResultArea": "Strategic Result Area 1",
      "subStrategicResultArea": "Big data, machine learning, and digital technologies",
      "interventionCountry": AfricaCountryCodes.NIGERIA,
      "partnerships": [
        "European Union",
        "National Statistics Offices"
      ],
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Organized multiple training sessions for national statistical offices (NSOs) in GDP nowcasting, focusing on the use of Google Trends data to estimate economic indicators in near real-time.",
        "Development of a Google Trends-based nowcasting tool to help NSOs produce more timely economic estimates."
      ]
    },
    {
      "id": "79",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Geopatial Land Management and Adminstration",
      "interventionCountry": AfricaCountryCodes.NIGERIA,
      "partnerships": [
        "European Union",
        "National Statistics Offices"
      ],
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Implementing land reforms and cadastral urban land management promoted",
        "Technical advisory support on land reforms and cadastral urban land management provided"
      ]
    },
    {
      "id": "80",
      "strategicResultArea": "Strategic Result Area 4",
      "subStrategicResultArea": "Capacity development on CRVS Applied Research",
      "interventionCountry":AfricaCountryCodes.NIGERIA,
      "partnerships": [
        "European Union",
        "National Statistics Offices"
      ],
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "The researchers have been studying the determinants of incomplete registration of vital events and identifying barriers to universal coverage.",
        "Findings from respective researchers have been disseminated to governments to help address barriers related to CRVS and improve registration systems."
      ]
    },
    {
      "id": "81",
      "strategicResultArea": "Strategic Result Area 1",
      "subStrategicResultArea": "Big data, machine learning, and digital technologies",
      "interventionCountry": AfricaCountryCodes.RWANDA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Organized  training sessions for national statistical offices (NSOs) in GDP nowcasting, focusing on the use of Google Trends data to estimate economic indicators in near real-time.",
        "Development of a Google Trends-based nowcasting tool to help NSOs produce more timely economic estimates."
      ]
    },
    {
      "id": "82",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Integrated Geospatial Information Framework [IGIF] (ECA-Africa Secretariat) Country-Led Action Plans Implementation processes",
      "interventionCountry": AfricaCountryCodes.RWANDA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Workshops and trainings facilitated on United Nations Integrated Geospatial Information Framework"
      ]
    },
    {
      "id": "83",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Developing Fundamental Datasets and Standards: National Geospatial Datasets",
      "interventionCountry": AfricaCountryCodes.RWANDA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Geocoding, Enumeration Areas mapping, Digital Address Systems, Geographic Names, spatial Analysis of Census Data developed"
      ]
    },
    {
      "id": "84",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Implementation of the African Geodetic Reference Frame (AFREF)",
      "interventionCountry": AfricaCountryCodes.RWANDA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Technical advisory support provided on African Geodetic Reference Frame (AFREF) implementation"
      ]
    },
    {
      "id": "85",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Geopatial Land Management and Adminstration",
      "interventionCountry": AfricaCountryCodes.RWANDA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Implementing land reforms and cadastral urban land management promoted",
        "Technical advisory support on land reforms and cadastral urban land management provided"
      ]
    },
    {
      "id": "86",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Spatial Analysis- [Nexus-Climate Change-Environment-Food Security]",
      "interventionCountry": AfricaCountryCodes.RWANDA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Spatial patterns and hotspots of vulnerability to climate change impacts on food security, especially in rain-fed agriculture and fragile ecosystems identified",
        "Interactions between climate variability, environmental degradation, and socioeconomic factors affecting food production and nutrition anakyzed",
        "Targeted policies and interventions to address food insecurity, promote sustainable resource management, and build climate resilience supported",
        "Data, remote sensing, and modeling tools for improved early warning systems and decision-making at all levels were uses"
      ]
    },
    {
      "id": "87",
      "strategicResultArea": "Strategic Result Area 1",
      "subStrategicResultArea": "Big data, machine learning, and digital technologies",
      "interventionCountry": AfricaCountryCodes.SAO_TOME_AND_PRINCIPE,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Organized training sessions for national statistical offices (NSOs) in GDP nowcasting, focusing on the use of Google Trends data to estimate economic indicators in near real-time.",
        "Development of a Google Trends-based nowcasting tool to help NSOs produce more timely economic estimates."
      ]
    },
    {
      "id": "88",
      "strategicResultArea": "Strategic Result Area 1",
      "subStrategicResultArea": "Integration into the TiVA Database",
      "interventionCountry": AfricaCountryCodes.SENEGAL,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Integration into the TiVA Database completed",
        "National Supply and Use Tables (SUT) aliegned to international classification standards",
        "Regional seminar on learning and practice on National Accounts, SUT, Input-Output Table, trade in service and trade in commodities for the AfCIOT",
        "Advisory support provided to prepare and compile national data and validate AfCIOT national intermediary outputs"
      ]
    },
    {
      "id": "89",
      "strategicResultArea": "Strategic Result Area 1",
      "subStrategicResultArea": "Integration into the TiVA Database",
      "interventionCountry": AfricaCountryCodes.SOUTH_AFRICA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Integration into the TiVA Database completed",
        "National Supply and Use Tables (SUT) aliegned to international classification standards",
        "Regional seminar on learning and practice on National Accounts, SUT, Input-Output Table, trade in service and trade in commodities for the AfCIOT",
        "Advisory support provided to prepare and compile national data and validate AfCIOT national intermediary outputs"
      ]
    },
    {
      "id": "90",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Integrated Geospatial Information Framework [IGIF] (ECA-Africa Secretariat) Country-Led Action Plans Implementation processes",
      "interventionCountry": AfricaCountryCodes.SOUTH_AFRICA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Workshops and trainings facilitated on United Nations Integrated Geospatial Information Framework"
      ]
    },
    {
      "id": "91",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Developing Fundamental Datasets and Standards: National Geospatial Datasets",
      "interventionCountry": AfricaCountryCodes.SOUTH_AFRICA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Geocoding, Enumeration Areas mapping, Digital Address Systems, Geographic Names, spatial Analysis of Census Data developed.",
        "Geospatial datasets adopted for other countries"
      ]
    },
    {
      "id": "92",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Geopatial Land Management and Adminstration",
      "interventionCountry": AfricaCountryCodes.SOUTH_AFRICA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Implementing land reforms and cadastral urban land management promoted",
        "Technical advisory support on land reforms and cadastral urban land management provided"
      ]
    },
    {
      "id": "93",
      "strategicResultArea": "Strategic Result Area 4",
      "subStrategicResultArea": "Capacity development on CRVS Applied Research",
      "interventionCountry": AfricaCountryCodes.SOUTH_AFRICA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "The researchers have been studying the determinants of incomplete registration of vital events and identifying barriers to universal coverage.",
        "Findings from respective researchers have been disseminated to governments to help address barriers related to CRVS and improve registration systems."
      ]
    },
    {
      "id": "94",
      "strategicResultArea": "Strategic Result Area 4",
      "subStrategicResultArea": "CVRS Mentorship",
      "interventionCountry": AfricaCountryCodes.SOUTH_SUDAN,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "A national CRVS stakeholders coordination framework established",
        "Key national priorities through the application of the CRVS systems improvement framework identified"
      ]
    },
    {
      "id": "95",
      "strategicResultArea": "Strategic Result Area 3",
      "subStrategicResultArea": "National Quality Assurance Framework",
      "interventionCountry": AfricaCountryCodes.TOGO,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Advisory technical support and capacity building trainings provided to develop and endorse the national quality assurance framework on statistics",
        "The national quality assurance framework endorsed by the NSO-Togo"
      ]
    },
    {
      "id": "96",
      "strategicResultArea": "Strategic Result Area 1",
      "subStrategicResultArea": "Integration into the TiVA Database",
      "interventionCountry": AfricaCountryCodes.TANZANIA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Integration into the TiVA Database completed",
        "National Supply and Use Tables (SUT) aliegned to international classification standards",
        "Regional seminar on learning and practice on National Accounts, SUT, Input-Output Table, trade in service and trade in commodities for the AfCIOT",
        "Advisory support provided to prepare and compile national data and validate AfCIOT national intermediary outputs"
      ]
    },
    {
      "id": "97",
      "strategicResultArea": "Strategic Result Area 1",
      "subStrategicResultArea": "Big data, machine learning, and digital technologies",
      "interventionCountry": AfricaCountryCodes.TANZANIA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Organized multiple training sessions for national statistical offices (NSOs) in GDP nowcasting, focusing on the use of Google Trends data to estimate economic indicators in near real-time.",
        "Development of a Google Trends-based nowcasting tool to help NSOs produce more timely economic estimates."
      ]
    },
    {
      "id": "98",
      "strategicResultArea": "Strategic Result Area 3",
      "subStrategicResultArea": "Support on Census Field Monitoring System",
      "interventionCountry": AfricaCountryCodes.TUNISIA,
      "partnerships": [
        "European Union",
        "National Statistics Offices"
      ],
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Capacities in the respective countries developed to undertake high quality and timely censuses that fulfil the five qualities defined by the UN of individual enumeration, universality within a defined territory, simultaneity, and defined periodicity."
      ]
    },
    {
      "id": "99",
      "strategicResultArea": "Strategic Result Area 1",
      "subStrategicResultArea": "Integration into the TiVA Database",
      "interventionCountry": AfricaCountryCodes.UGANDA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Integration into the TiVA Database completed",
        "National Supply and Use Tables (SUT) aliegned to international classification standards",
        "Regional seminar on learning and practice on National Accounts, SUT, Input-Output Table, trade in service and trade in commodities for the AfCIOT",
        "Advisory support provided to prepare and compile national data and validate AfCIOT national intermediary outputs"
      ]
    },
    {
      "id": "100",
      "strategicResultArea": "Strategic Result Area 2",
      "subStrategicResultArea": "Developing Fundamental Datasets and Standards: National Geospatial Datasets",
      "interventionCountry": AfricaCountryCodes.UGANDA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Geocoding, Enumeration Areas mapping, Digital Address Systems, Geographic Names, spatial Analysis of Census Data developed"
      ]
    },
    {
      "id": "101",
      "strategicResultArea": "Strategic Result Area 3",
      "subStrategicResultArea": "Support on Census Field Monitoring System",
      "interventionCountry": AfricaCountryCodes.UGANDA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "A well-organized Census Monitoring Dashboard developed",
        "ensus monitoring capacities of respective countries developed"
      ]
    },
    {
      "id": "102",
      "strategicResultArea": "Strategic Result Area 3",
      "subStrategicResultArea": "Support on Census Field Monitoring System",
      "interventionCountry": AfricaCountryCodes.UGANDA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Census project management toolkit provided, alongside dissemination of results and the use of Computer-Assisted Personal Interviews (CAPI)"
      ]
    },
    {
      "id": "103",
      "strategicResultArea": "Strategic Result Area 4",
      "subStrategicResultArea": "Capacity development on CRVS Applied Research",
      "interventionCountry": AfricaCountryCodes.UGANDA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "The researchers have been studying the determinants of incomplete registration of vital events and identifying barriers to universal coverage.",
        "Findings from respective researchers have been disseminated to governments to help address barriers related to CRVS and improve registration systems."
      ]
    },
    {
      "id": "104",
      "strategicResultArea": "Strategic Result Area 1",
      "subStrategicResultArea": "Big data, machine learning, and digital technologies",
      "interventionCountry": AfricaCountryCodes.ZAMBIA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Organized  training sessions for national statistical offices (NSOs) in GDP nowcasting, focusing on the use of Google Trends data to estimate economic indicators in near real-time.",
        "Development of a Google Trends-based nowcasting tool to help NSOs produce more timely economic estimates."
      ]
    },
    {
      "id": "105",
      "strategicResultArea": "Strategic Result Area 3",
      "subStrategicResultArea": "Common data reporting and exchange mechanisms for SDGs, Agenda 2063 and socio-economic datasets",
      "interventionCountry": AfricaCountryCodes.ZAMBIA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Assessment of reporting and dissemination needs identified",
        "Country reporting and dissemination platform in four member States deployed",
        "Zambia  have deployed the Census Executive Monitor mobile app developed",
        "Staff from countries trained in dissemination"
      ]
    },
    {
      "id": "106",
      "strategicResultArea": "Strategic Result Area 3",
      "subStrategicResultArea": "Common data reporting and exchange mechanisms for SDGs, Agenda 2063 and socio-economic datasets",
      "interventionCountry": AfricaCountryCodes.ZIMBABWE,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": [
        "Assessment of reporting and dissemination needs identified",
        "Country reporting and dissemination platform in four member States deployed",
        "Zimbabwe have deployed the Census Executive Monitor mobile app developed",
        "Staff from countries trained in dissemination"
      ]
    },


       {
      "id": "107",
      "strategicResultArea": "Strategic Result Area 4",
      "subStrategicResultArea": "CVRS Mentorship",
      "interventionCountry": AfricaCountryCodes.SOMALIA,
      "partnerships": "",
      "year": 2025,
      "sdgContribution": "SGD 16.9",
      "supportingLinks": "",
      "details": [
       "CRVS mentorship program which aims to improve and strengthen the civil registration systems and processes.", 
       "The mentorship programme is designed to support a local expert who will receive intensive training from ECA and work through the National Civil Registration Office, which is the main government department responsible for issuing civil registration documents.",
       "Somalia has been provided with 1,500 for the digitalization of the CRVS system.",  
       "The tablets are essential for the nationwide rollout of the unified digital civil registration and vital statistics system.", 
       "The tablets have been deployed in rural and remote areas to facilitate the registration of vital events and ensuring broader access to civil registration and legal identity services in Somalia as envisaged in SGD 16.9.",
      ]
    },

    {
      "id": "108",
      "strategicResultArea": "",
      "subStrategicResultArea": "",
      "interventionCountry": AfricaCountryCodes.LIBYA,
      "partnerships": "SDG Alliance, National Mapping Agencies, NGOs",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": "",
      "details": ""
    },
















];

import { generateMapData } from './utils/geoUtils';

// Generate map data from GeoJSON
export const AFRICA_MAP_DATA = generateMapData();

// Initial empty map data
export const INITIAL_MAP_DATA = [];

// Real SVG paths for African countries
export const AFRICA_MAP_DATA_SVG = [
  {
    id: 'DZA',
    name: AfricaCountryCodes.ALGERIA,
    path: 'M424 190L429 171L437 165L450 160L458 147L473 142L477 134L485 130L498 130L505 125L515 125L525 130L530 140L525 150L520 165L515 180L502 190L492 200L482 205L470 205L460 200L450 195L440 195L430 195L424 190Z'
  },
  {
    id: 'AGO',
    name: AfricaCountryCodes.ANGOLA,
    path: 'M460 320L470 315L485 315L500 320L510 325L515 335L515 350L510 360L500 365L485 365L475 360L465 355L460 345L460 320Z'
  },
  {
    id: 'BEN',
    name: AfricaCountryCodes.BENIN,
    path: 'M425 275L430 270L440 270L445 275L445 285L440 295L435 300L430 295L425 290L425 275Z'
  },
  {
    id: 'BWA',
    name: AfricaCountryCodes.BOTSWANA,
    path: 'M485 380L500 375L515 375L525 380L525 390L520 400L510 405L495 405L485 400L485 380Z'
  },
  {
    id: 'BFA',
    name: AfricaCountryCodes.BURKINA_FASO,
    path: 'M405 260L420 255L435 255L450 260L450 270L445 280L435 285L420 285L410 280L405 270L405 260Z'
  },
  {
    id: 'BDI',
    name: AfricaCountryCodes.BURUNDI,
    path: 'M505 315L510 310L520 310L525 315L525 320L520 325L510 325L505 320L505 315Z'
  },
  {
    id: 'CMR',
    name: AfricaCountryCodes.CAMEROON,
    path: 'M455 285L470 280L485 280L495 285L495 300L490 310L480 315L470 310L460 305L455 295L455 285Z'
  },
  {
    id: 'CPV',
    name: AfricaCountryCodes.CABO_VERDE,
    path: 'M325 240L330 235L335 240L335 245L330 250L325 245L325 240Z'
  },
  {
    id: 'CAF',
    name: AfricaCountryCodes.CENTRAL_AFRICAN_REPUBLIC,
    path: 'M490 270 L520 265 L540 268 L545 280 L540 295 L520 300 L500 295 L495 285 Z'
  },
  {
    id: 'TCD',
    name: AfricaCountryCodes.CHAD,
    path: 'M470 230 L500 225 L530 228 L535 250 L530 275 L500 280 L480 275 L475 255 Z'
  },
  {
    id: 'COM',
    name: AfricaCountryCodes.COMOROS,
    path: 'M580 360 L582 359 L584 360 L584 362 L582 363 L580 362 Z'
  },
  {
    id: 'COG',
    name: AfricaCountryCodes.CONGO,
    path: 'M470 300 L490 295 L505 298 L510 310 L505 325 L490 330 L480 325 L475 315 Z'
  },
  {
    id: 'COD',
    name: AfricaCountryCodes.DEMOCRATIC_REPUBLIC_OF_CONGO,
    path: 'M490 290 L530 285 L560 288 L570 300 L565 330 L530 335 L500 330 L485 325 L480 305 Z'
  },
  {
    id: 'DJI',
    name: AfricaCountryCodes.DJIBOUTI,
    path: 'M560 260 L565 258 L570 260 L570 265 L565 267 L562 265 Z'
  },
  {
    id: 'EGY',
    name: AfricaCountryCodes.EGYPT,
    path: 'M510 180 L550 175 L580 178 L585 190 L580 210 L550 215 L520 210 L515 195 Z'
  },
  {
    id: 'GNQ',
    name: AfricaCountryCodes.EQUATORIAL_GUINEA,
    path: 'M450 305 L455 303 L458 305 L458 308 L455 310 L452 308 Z'
  },
  {
    id: 'ERI',
    name: AfricaCountryCodes.ERITREA,
    path: 'M540 230 L560 225 L570 228 L575 240 L570 250 L555 255 L545 250 L542 240 Z'
  },
  {
    id: 'ETH',
    name: AfricaCountryCodes.ETHIOPIA,
    path: 'M530 240 L570 235 L590 238 L595 260 L590 280 L570 285 L550 280 L535 275 Z'
  },
  {
    id: 'GAB',
    name: AfricaCountryCodes.GABON,
    path: 'M455 310 L470 305 L480 308 L485 320 L480 330 L470 335 L465 330 L460 320 Z'
  },
  {
    id: 'GMB',
    name: AfricaCountryCodes.GAMBIA,
    path: 'M340 270 L350 268 L355 270 L355 273 L350 275 L345 273 Z'
  },
  {
    id: 'GHA',
    name: AfricaCountryCodes.GHANA,
    path: 'M410 290 L425 285 L435 288 L440 300 L435 315 L425 320 L415 315 L410 305 Z'
  },
  {
    id: 'GIN',
    name: AfricaCountryCodes.GUINEA,
    path: 'M360 280 L380 275 L395 278 L400 290 L395 305 L380 310 L370 305 L365 295 Z'
  },
  {
    id: 'GNB',
    name: AfricaCountryCodes.GUINEA_BISSAU,
    path: 'M350 280 L360 278 L365 280 L365 285 L360 287 L355 285 Z'
  },
  {
    id: 'CIV',
    name: AfricaCountryCodes.IVORY_COAST,
    path: 'M380 290 L400 285 L415 288 L420 300 L415 315 L400 320 L390 315 L385 305 Z'
  },
  {
    id: 'KEN',
    name: AfricaCountryCodes.KENYA,
    path: 'M540 280 L560 275 L575 278 L580 290 L575 305 L560 310 L550 305 L545 295 Z'
  },
  {
    id: 'LSO',
    name: AfricaCountryCodes.LESOTHO,
    path: 'M495 430 L505 428 L510 430 L510 435 L505 437 L500 435 Z'
  },
  {
    id: 'LBR',
    name: AfricaCountryCodes.LIBERIA,
    path: 'M370 300 L385 295 L395 298 L400 310 L395 320 L385 325 L380 320 L375 310 Z'
  },
  {
    id: 'LBY',
    name: AfricaCountryCodes.LIBYA,
    path: 'M460 180 L500 175 L530 178 L535 190 L530 220 L500 225 L470 220 L465 200 Z'
  },
  {
    id: 'MDG',
    name: AfricaCountryCodes.MADAGASCAR,
    path: 'M580 340 L590 335 L600 338 L605 350 L600 370 L590 375 L585 365 L580 355 Z'
  },
  {
    id: 'MWI',
    name: AfricaCountryCodes.MALAWI,
    path: 'M520 350 L530 345 L535 348 L540 360 L535 370 L530 365 L525 355 Z'
  },
  {
    id: 'MLI',
    name: AfricaCountryCodes.MALI,
    path: 'M380 230 L420 225 L450 228 L455 240 L450 270 L420 275 L400 270 L385 250 Z'
  },
  {
    id: 'MRT',
    name: AfricaCountryCodes.MAURITANIA,
    path: 'M350 220 L390 215 L420 218 L425 230 L420 260 L390 265 L370 260 L355 240 Z'
  },
  {
    id: 'MUS',
    name: AfricaCountryCodes.MAURITIUS,
    path: 'M610 380 L612 379 L614 380 L614 382 L612 383 L610 382 Z'
  },
  {
    id: 'MAR',
    name: AfricaCountryCodes.MOROCCO,
    path: 'M380 160 L420 155 L450 158 L455 170 L450 200 L420 205 L400 200 L385 180 Z'
  },
  {
    id: 'MOZ',
    name: AfricaCountryCodes.MOZAMBIQUE,
    path: 'M520 340 L550 335 L570 338 L575 360 L570 390 L550 395 L530 390 L525 370 Z'
  },
  {
    id: 'NAM',
    name: AfricaCountryCodes.NAMIBIA,
    path: 'M450 380 L480 375 L500 378 L505 390 L500 420 L480 425 L470 420 L465 400 Z'
  },
  {
    id: 'NER',
    name: AfricaCountryCodes.NIGER,
    path: 'M420 220 L460 215 L490 218 L495 230 L490 260 L460 265 L440 260 L425 240 Z'
  },
  {
    id: 'NGA',
    name: AfricaCountryCodes.NIGERIA,
    path: 'M440 270 L470 265 L490 268 L495 280 L490 300 L470 305 L450 300 L445 290 Z'
  },
  {
    id: 'RWA',
    name: AfricaCountryCodes.RWANDA,
    path: 'M515 305 L520 303 L525 305 L525 308 L520 310 L517 308 Z'
  },
  {
    id: 'STP',
    name: AfricaCountryCodes.SAO_TOME_AND_PRINCIPE,
    path: 'M440 315 L442 314 L444 315 L444 317 L442 318 L440 317 Z'
  },
  {
    id: 'SEN',
    name: AfricaCountryCodes.SENEGAL,
    path: 'M340 260 L360 255 L375 258 L380 270 L375 285 L360 290 L350 285 L345 275 Z'
  },
  {
    id: 'SYC',
    name: AfricaCountryCodes.SEYCHELLES,
    path: 'M600 300 L602 299 L604 300 L604 302 L602 303 L600 302 Z'
  },
  {
    id: 'SLE',
    name: AfricaCountryCodes.SIERRA_LEONE,
    path: 'M355 290 L365 285 L375 288 L380 300 L375 310 L365 315 L360 310 L355 300 Z'
  },
  {
    id: 'SOM',
    name: AfricaCountryCodes.SOMALIA,
    path: 'M570 260 L590 255 L610 258 L615 270 L610 290 L590 295 L580 290 L575 280 Z'
  },
  {
    id: 'ZAF',
    name: AfricaCountryCodes.SOUTH_AFRICA,
    path: 'M475 400L490 395L505 395L520 400L530 405L535 415L535 430L525 440L510 445L495 445L485 440L480 430L475 415L475 400Z'
  },
  {
    id: 'SSD',
    name: AfricaCountryCodes.SOUTH_SUDAN,
    path: 'M510 250 L540 245 L560 248 L565 260 L560 275 L540 280 L530 275 L525 265 Z'
  },
  {
    id: 'SDN',
    name: AfricaCountryCodes.SUDAN,
    path: 'M490 210 L530 205 L560 208 L565 220 L560 250 L530 255 L510 250 L505 230 Z'
  },
  {
    id: 'SWZ',
    name: AfricaCountryCodes.ESWATINI,
    path: 'M515 415 L520 413 L525 415 L525 418 L520 420 L517 418 Z'
  },
  {
    id: 'TZA',
    name: AfricaCountryCodes.TANZANIA,
    path: 'M530 300 L560 295 L580 298 L585 310 L580 330 L560 335 L540 330 L535 320 Z'
  },
  {
    id: 'TGO',
    name: AfricaCountryCodes.TOGO,
    path: 'M430 285 L435 283 L440 285 L440 295 L435 297 L432 295 Z'
  },
  {
    id: 'TUN',
    name: AfricaCountryCodes.TUNISIA,
    path: 'M450 150 L470 145 L485 148 L490 160 L485 175 L470 180 L460 175 L455 165 Z'
  },
  {
    id: 'UGA',
    name: AfricaCountryCodes.UGANDA,
    path: 'M520 280 L535 275 L545 278 L550 290 L545 300 L535 305 L530 300 L525 290 Z'
  },
  {
    id: 'ZMB',
    name: AfricaCountryCodes.ZAMBIA,
    path: 'M490 340 L520 335 L540 338 L545 350 L540 370 L520 375 L510 370 L505 360 Z'
  },
  {
    id: 'ZWE',
    name: AfricaCountryCodes.ZIMBABWE,
    path: 'M495 365L510 360L520 365L525 375L520 385L510 390L500 385L495 375L495 365Z'
  }
]; 