// Africa Country Codes
export const AfricaCountryCodes = {
  ALGERIA: 'Algeria',
  ANGOLA: 'Angola',
  BENIN: 'Benin',
  BOTSWANA: 'Botswana',
  BURKINA_FASO: 'Burkina Faso',
  BURUNDI: 'Burundi',
  CAMEROON: 'Cameroon',
  CAPE_VERDE: 'Cape Verde',
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
  IVORY_COAST: 'Ivory Coast',
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
    "[Spatial Analysis] Angola: Geo-statistics for the development of urban spatial frameworks in Africa",
    "Spatial Analysis-Madagascar [Nexus-Water-Energy-Food]",
    "Spatial Analysis- [Nexus-Climate Change-Environment-Food Security]"
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
    id: "1",
    strategicResultArea: "Strategic Result Area 4",
    subStrategicResultArea: "CVRS Mentorship",
    interventionCountry: AfricaCountryCodes.GHANA,
    partnerships: ["UNICEF", "National Statistics Offices"],
    year: 2025,
    sdgContribution: "SDG 16.9",
    supportingLinks: "https://www.unicef.org/ghana/ghana-national-statistics-office-unicef-sign-agreement-strengthen-data-collection-and-use",
    details: [
      "System assessment completed",
      "Digital transformation roadmap created",
      "Staff training program implemented",
      "Pilot program launched in selected regions",
      "Monitoring and evaluation framework established"
    ]
  }
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
    name: AfricaCountryCodes.CAPE_VERDE,
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