export const reportSchema = {
  type: "object",
  required: ["title", "reportDate", "region", "indicators"],
  properties: {
    title: {
      type: "string",
      title: "Report Title",
      minLength: 5,
      maxLength: 100
    },
    reportDate: {
      type: "string",
      title: "Report Date",
      format: "date"
    },
    region: {
      type: "string",
      title: "Region",
      enum: ["Northern Africa", "Western Africa", "Central Africa", "Eastern Africa", "Southern Africa"]
    },
    indicators: {
      type: "array",
      title: "Development Indicators",
      items: {
        type: "object",
        required: ["name", "value", "year"],
        properties: {
          name: {
            type: "string",
            title: "Indicator Name"
          },
          value: {
            type: "number",
            title: "Value",
            minimum: 0
          },
          year: {
            type: "integer",
            title: "Year",
            minimum: 2000,
            maximum: 2100
          },
          unit: {
            type: "string",
            title: "Unit of Measurement"
          }
        }
      }
    }
  }
};

export const uiSchema = {
  "ui:order": ["title", "reportDate", "region", "indicators"],
  indicators: {
    items: {
      "ui:order": ["name", "value", "year", "unit"]
    }
  }
}; 