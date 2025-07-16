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
  COTE_DIVOIRE: 'Côte d\'ivoire',  
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
  ]
};

export const ALL_AFRICAN_COUNTRIES = Object.values(AfricaCountryCodes).sort();

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

export const MOCK_REPORTS = [

    {
      "id": "0",
      "strategicResultArea": "",
      "subStrategicResultArea": "",
      "interventionCountry": AfricaCountryCodes.ALGERIA,
      "partnerships": "WTO, OECD",
      "year": 2025,
      "sdgContribution": "",
      "supportingLinks": ["https://example.com/report1", "https://example.com/documentation"],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
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
      "supportingLinks": [],
      "details": [
       "CRVS mentorship program which aims to improve and strengthen the civil registration systems and processes.", 
       "The mentorship programme is designed to support a local expert who will receive intensive training from ECA and work through the National Civil Registration Office, which is the main government department responsible for issuing civil registration documents.",
       "Somalia has been provided with 1,500 for the digitalization of the CRVS system.",  
       "The tablets are essential for the nationwide rollout of the unified digital civil registration and vital statistics system.", 
       "The tablets have been deployed in rural and remote areas to facilitate the registration of vital events and ensuring broader access to civil registration and legal identity services in Somalia as envisaged in SGD 16.9."
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
      "supportingLinks": [],
      "details": ""
    }
];
