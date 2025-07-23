import React, { useState } from 'react';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { Button, Box, Typography, Alert, ThemeProvider, Paper } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useTheme } from '../utils/themeContext';
import { useAuth } from '../contexts/AuthContext';
import { ALL_AFRICAN_COUNTRIES, PARTNERSHIPS } from '../../server/data.js';

const APPRMDataImportForm = ({ onClose }) => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // No predefined options - users can input custom SDGs and UNSDCF Result Areas

  // APPRM Form Schema
  const apprmSchema = {
    type: "object",
    required: ["country", "year", "quarter", "deliverables", "outcomes"],
    properties: {
      country: {
        type: "string",
        title: "Country",
        enum: ALL_AFRICAN_COUNTRIES,
        enumNames: ALL_AFRICAN_COUNTRIES
      },
      year: {
        type: "integer",
        title: "Year",
        minimum: 2020,
        maximum: new Date().getFullYear() + 1,
        default: new Date().getFullYear()
      },
      quarter: {
        type: "string",
        title: "Quarter",
        enum: ["Q1", "Q2", "Q3", "Q4"],
        enumNames: ["Q1", "Q2", "Q3", "Q4"]
      },
      deliverables: {
        type: "array",
        title: "Deliverables",
        items: {
          type: "string",
          title: "Deliverable"
        },
        minItems: 1,
        description: "List of deliverables achieved"
      },
      outcomes: {
        type: "array",
        title: "Outcomes",
        items: {
          type: "string",
          title: "Outcome"
        },
        minItems: 1,
        description: "List of outcomes achieved"
      },
      partnership: {
        type: "string",
        title: "Partnership (Optional)",
        enum: ['', ...PARTNERSHIPS],
        enumNames: ['No Partnership', ...PARTNERSHIPS]
      },
      relevantSDGsAndResultAreas: {
        type: "array",
        title: "Relevant SDGs & UNSDCF Result Areas (Optional)",
        items: {
          type: "string",
          title: "SDG or UNSDCF Result Area"
        },
        minItems: 0,
        description: "Add relevant SDGs and UNSDCF Result Areas (optional field)"
      }
    }
  };

  // UI Schema for better form layout
  const uiSchema = {
    country: {
      "ui:help": "Select the African country where activities took place"
    },
    year: {
      "ui:help": "Year of activity implementation"
    },
    quarter: {
      "ui:help": "Quarter when activities were implemented"
    },
    deliverables: {
      "ui:help": "Add each deliverable as a separate item",
      items: {
        "ui:placeholder": "Enter deliverable description..."
      }
    },
    outcomes: {
      "ui:help": "Add each outcome as a separate item",
      items: {
        "ui:placeholder": "Enter outcome description..."
      }
    },
    partnership: {
      "ui:help": "Select the main partner organization (optional)"
    },
    relevantSDGsAndResultAreas: {
      "ui:help": "Add SDGs (e.g., 'SDG 16: Peace, Justice') and UNSDCF Result Areas (e.g., 'Sustainable Development and Climate Action') - This field is optional",
      items: {
        "ui:placeholder": "Enter SDG or UNSDCF Result Area..."
      }
    }
  };

  const theme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
    },
  });

  const handleChange = ({ formData: newFormData }) => {
    console.log('APPRM Form Data Changed:', newFormData);
    setFormData(newFormData);
    setError(null);
  };

  const handleSubmit = async ({ formData: submitData }) => {
    console.log('Submitting APPRM Data:', submitData);
    setIsSubmitting(true);
    setError(null);

    try {
      // Add metadata
      const finalData = {
        ...submitData,
        submittedBy: user?.fullName || 'Unknown User',
        submittedAt: new Date().toISOString(),
        status: 'pending', // Default status for new APPRM entries
        dataType: 'apprm' // Identifier for APPRM data
      };

      // TODO: Replace with actual APPRM API submission
      console.log('Final APPRM data to submit:', finalData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (err) {
      console.error('APPRM submission error:', err);
      setError(err.message || 'Failed to submit APPRM data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleError = (errors) => {
    console.log('APPRM Form Validation Errors:', errors);
    setError('Please correct the validation errors above.');
  };

  if (success) {
    return (
      <ThemeProvider theme={theme}>
        <Box p={3}>
          <Alert severity="success" sx={{ mb: 2 }}>
            <Typography variant="h6">APPRM Data Submitted Successfully!</Typography>
            <Typography variant="body2">
              Your APPRM country footprint data has been submitted and is pending review.
            </Typography>
          </Alert>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box p={3}>
        <Typography variant="h5" gutterBottom color="primary">
          Add APPRM Country Footprint Data
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          Submit country footprint data. Required fields: Country, Year, Quarter, Deliverables, and Outcomes. 
          Partnership and SDGs/UNSDCF Result Areas are optional.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Paper elevation={1} sx={{ p: 2 }}>
          <Form
            schema={apprmSchema}
            uiSchema={uiSchema}
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onError={handleError}
            validator={validator}
            disabled={isSubmitting}
          >
            <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                color="primary"
              >
                {isSubmitting ? 'Submitting...' : 'Submit APPRM Data'}
              </Button>
            </Box>
          </Form>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default APPRMDataImportForm; 