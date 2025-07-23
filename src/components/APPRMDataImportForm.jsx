import React, { useState } from 'react';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { Button, Box, Typography, Alert, ThemeProvider, Paper } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useTheme } from '../utils/themeContext';
import { useAuth } from '../contexts/AuthContext';
import { apprmAPI } from '../lib/appwrite';
import { sendAPPRMAdminNotification } from '../utils/reportUtils';
import { ALL_AFRICAN_COUNTRIES, PARTNERSHIPS } from '../../server/data.js';

const APPRMDataImportForm = ({ onClose }) => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // No predefined options - users can input custom SDGs and UNSDCF Result Areas

  // Generate year options (current year and past 5 years + next year)
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let i = 2020; i <= currentYear + 1; i++) {
    yearOptions.push(i.toString());
  }

  // APPRM Form Schema (matching Appwrite collection exactly)
  const apprmSchema = {
    type: "object",
    required: ["country", "Year", "Quarter", "deliverables", "outcomes"],
    properties: {
      country: {
        type: "string",
        title: "Country",
        enum: ALL_AFRICAN_COUNTRIES,
        enumNames: ALL_AFRICAN_COUNTRIES
      },
      Year: {
        type: "string",
        title: "Year",
        enum: yearOptions,
        enumNames: yearOptions,
        default: currentYear.toString()
      },
      Quarter: {
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
        type: "array",
        title: "Partnerships (Optional)",
        items: {
          type: "string",
          enum: PARTNERSHIPS,
          enumNames: PARTNERSHIPS
        },
        minItems: 0,
        uniqueItems: true,
        description: "Select multiple partner organizations"
      },
      sdgunsdcf: {
        type: "array",
        title: "SDGs & UNSDCF Result Areas (Optional)",
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
    Year: {
      "ui:help": "Select year from the dropdown when activities were implemented"
    },
    Quarter: {
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
      "ui:help": "Select multiple partner organizations (optional)",
      "ui:options": {
        orderable: false,
        addable: true,
        removable: true
      },
      items: {
        "ui:placeholder": "Select partnership..."
      }
    },
    sdgunsdcf: {
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
      // Convert Year string to integer for database storage
      const processedData = {
        ...submitData,
        Year: parseInt(submitData.Year)
      };

      // Add metadata to match Appwrite collection structure
      const finalData = {
        ...processedData,
        createdBy: user?.fullName || 'Unknown User',
        approvedBy: '', // Empty initially, to be filled by admin approval process
        status: 'pending', // Default status for new APPRM entries
        reportIndex: Date.now() // Use timestamp as unique index for now
      };

      console.log('Final APPRM data to submit to Appwrite:', finalData);
      
      // Submit to Appwrite using the apprmAPI
      const response = await apprmAPI.createAPPRMData(finalData);
      console.log('✅ Successfully created APPRM data:', response);
      
      // Send notification to admins about new APPRM submission
      try {
        await sendAPPRMAdminNotification(finalData, user);
        console.log('✅ APPRM notification sent to admins');
      } catch (notificationError) {
        console.warn('⚠️ APPRM data saved but notification failed:', notificationError);
        // Don't fail the submission if notification fails
      }
      
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (err) {
      console.error('APPRM submission error:', err);
      // Handle specific Appwrite errors
      if (err.code === 401) {
        setError('Authentication required. Please log in and try again.');
      } else if (err.code === 400) {
        setError('Invalid data format. Please check your entries and try again.');
      } else {
        setError(err.message || 'Failed to submit APPRM data. Please try again.');
      }
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
          You can select multiple partnerships as needed. Partnership and SDGs/UNSDCF Result Areas are optional.
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