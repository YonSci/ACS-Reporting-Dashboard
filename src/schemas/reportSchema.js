import { ALL_AFRICAN_COUNTRIES } from '../constants';
import { STRATEGIC_RESULT_AREAS, COMMON_PARTNERSHIPS, REPORT_YEARS, STRATEGIC_RESULTS_HIERARCHY } from '../constants';

export const reportSchema = {
  type: "object",
  required: ["strategicResultArea", "subStrategicResultArea", "interventionCountry", "year", "details"],
  properties: {
    strategicResultArea: {
      type: "string",
      title: "Strategic Result Area",
      enum: Object.keys(STRATEGIC_RESULT_AREAS),
      enumNames: Object.values(STRATEGIC_RESULT_AREAS)
    },
    subStrategicResultArea: {
      type: "string",
      title: "Sub Strategic Result Area",
      description: "Select a Strategic Result Area first",
      enum: [],
      enumNames: []
    },
    interventionCountry: {
      type: "string",
      title: "Intervention Country",
      enum: ALL_AFRICAN_COUNTRIES
    },
    partnerships: {
      type: "array",
      title: "Partnerships",
      description: "Add any relevant partnerships for this intervention",
      items: {
        type: "string",
        title: "Partner",
        enum: COMMON_PARTNERSHIPS
      },
      uniqueItems: true
    },
    year: {
      type: "string",
      title: "Year",
      description: "Year of the intervention",
      enum: REPORT_YEARS
    },
    sdgContribution: {
      type: "string",
      title: "SDG Contribution",
      description: "Describe how this report contributes to Sustainable Development Goals"
    },
    supportingLinks: {
      type: "array",
      title: "Supporting Links",
      description: "Add any relevant URLs or document references",
      items: {
        type: "string",
        format: "uri",
        title: "URL"
      }
    },
    details: {
      type: "string",
      title: "Details",
      description: "List the key details and achievements of this intervention"
    }
  }
};

export const uiSchema = {
  strategicResultArea: {
    "ui:placeholder": "Select a Strategic Result Area",
    "ui:autofocus": true,
    "ui:help": "Choose a strategic result area to see available sub-areas"
  },
  subStrategicResultArea: {
    "ui:placeholder": "Select a Sub Strategic Result Area",
    "ui:disabled": (formData) => !formData.strategicResultArea,
    "ui:help": "Sub-areas will be available after selecting a strategic area"
  },
  interventionCountry: {
    "ui:placeholder": "Select a country"
  },
  partnerships: {
    "ui:options": {
      orderable: false,
      addable: true,
      removable: true
    },
    items: {
      "ui:placeholder": "Select or enter a partner",
      "ui:enumDisabled": []
    }
  },
  year: {
    "ui:placeholder": "Select a year"
  },
  sdgContribution: {
    "ui:widget": "textarea",
    "ui:options": {
      rows: 4
    },
    "ui:placeholder": "Describe SDG contribution"
  },
  supportingLinks: {
    "ui:options": {
      orderable: false,
      addable: true,
      removable: true
    },
    items: {
      "ui:placeholder": "Enter URL"
    }
  },
  details: {
    "ui:widget": "textarea",
    "ui:options": {
      rows: 6
    },
    "ui:placeholder": "Enter intervention details"
  }
}; 