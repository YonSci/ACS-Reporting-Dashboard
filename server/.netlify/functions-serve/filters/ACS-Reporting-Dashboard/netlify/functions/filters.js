// ../netlify/functions/filters.js
var headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Content-Type": "application/json"
};
var strategicResultHierarchy = {
  "Economic Development": [
    "Trade and Industry",
    "Infrastructure Development",
    "Agriculture and Food Security"
  ],
  "Social Development": [
    "Education",
    "Healthcare",
    "Social Protection"
  ],
  "Environmental Sustainability": [
    "Climate Change Mitigation",
    "Natural Resource Management",
    "Environmental Protection"
  ],
  "Governance": [
    "Public Administration",
    "Justice and Rule of Law",
    "Public Financial Management"
  ]
};
var allAfricanCountries = [
  "Algeria",
  "Angola",
  "Benin",
  "Botswana",
  "Burkina Faso",
  "Burundi",
  "Cameroon",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Comoros",
  "Congo",
  "Democratic Republic of the Congo",
  "Djibouti",
  "Egypt",
  "Equatorial Guinea",
  "Eritrea",
  "Ethiopia",
  "Gabon",
  "Gambia",
  "Ghana",
  "Guinea",
  "Guinea-Bissau",
  "Ivory Coast",
  "Kenya",
  "Lesotho",
  "Liberia",
  "Libya",
  "Madagascar",
  "Malawi",
  "Mali",
  "Mauritania",
  "Mauritius",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Niger",
  "Nigeria",
  "Rwanda",
  "Sao Tome and Principe",
  "Senegal",
  "Seychelles",
  "Sierra Leone",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Sudan",
  "Swaziland",
  "Tanzania",
  "Togo",
  "Tunisia",
  "Uganda",
  "Zambia",
  "Zimbabwe"
];
var partnerships = [
  "Government Agencies",
  "International Organizations",
  "NGOs",
  "Private Sector",
  "Academic Institutions",
  "Civil Society Organizations",
  "Regional Bodies",
  "Development Banks"
];
exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers
    };
  }
  try {
    if (event.httpMethod !== "GET") {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: "Method not allowed" })
      };
    }
    const data = {
      strategicResultHierarchy,
      allAfricanCountries,
      partnerships
    };
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Internal Server Error",
        message: error.message
      })
    };
  }
};
//# sourceMappingURL=filters.js.map
