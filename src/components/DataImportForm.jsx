import React, { useState, useEffect } from 'react';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { Button, Box, Typography, Alert, ThemeProvider, Paper } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { reportSchema, uiSchema } from '../schemas/reportSchema';
import { submitReportData } from '../utils/reportUtils';
import { STRATEGIC_RESULT_AREAS, STRATEGIC_RESULTS_HIERARCHY } from '../constants';
import { useTheme } from '../utils/themeContext';

const DataImportForm = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getFormSchema = (selectedArea) => {
    const subAreas = selectedArea ? STRATEGIC_RESULTS_HIERARCHY[selectedArea] || [] : [];
    
    return {
      ...reportSchema,
      properties: {
        ...reportSchema.properties,
        strategicResultArea: {
          type: "string",
          title: "Strategic Result Area",
          enum: Object.keys(STRATEGIC_RESULT_AREAS),
          enumNames: Object.values(STRATEGIC_RESULT_AREAS)
        },
        subStrategicResultArea: {
          type: "string",
          title: "Sub Strategic Result Area",
          description: selectedArea ? "Select a Sub Strategic Result Area" : "Select a Strategic Result Area first",
          enum: subAreas,
          enumNames: subAreas
        }
      }
    };
  };

  const handleChange = ({ formData: newFormData }) => {
    console.log('Form Data Changed:', newFormData);
    // If strategic area changes, reset sub area
    if (newFormData.strategicResultArea !== formData.strategicResultArea) {
      newFormData = {
        ...newFormData,
        subStrategicResultArea: undefined
      };
    }
    setFormData(newFormData);
  };

  const handleSubmit = async ({ formData }) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      await submitReportData(formData);
      setSuccess(true);
      setFormData({});
    } catch (err) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentSchema = getFormSchema(formData.strategicResultArea);
  const customUiSchema = {
    ...uiSchema,
    strategicResultArea: {
      ...uiSchema.strategicResultArea,
      "ui:help": "Choose a strategic result area to see available sub-areas"
    },
    subStrategicResultArea: {
      ...uiSchema.subStrategicResultArea,
      "ui:disabled": !formData.strategicResultArea,
      "ui:help": "Sub-areas will be available after selecting a strategic area"
    }
  };

  const theme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
    },
    components: {
      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
          fullWidth: true,
        },
      },
      MuiSelect: {
        defaultProps: {
          variant: 'outlined',
          fullWidth: true,
        },
      },
      MuiFormControl: {
        defaultProps: {
          fullWidth: true,
        },
        styleOverrides: {
          root: {
            marginBottom: '1rem',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: isDark ? '#fff' : '#000',
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: isDark ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
            },
          },
        },
      },
    },
  });

  const customFormStyle = {
    '& .MuiFormControl-root': {
      marginBottom: '1.5rem',
    },
    '& .field-description': {
      marginTop: '-0.5rem',
      marginBottom: '0.5rem',
      color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
      fontSize: '0.875rem',
    },
    '& .array-item': {
      marginBottom: '1rem',
      padding: '1rem',
      borderRadius: '4px',
      border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'}`,
    },
    '& .array-item-toolbox': {
      marginTop: '0.5rem',
    },
    '& .control-label': {
      color: isDark ? '#fff' : '#000',
    },
    '& .field-description': {
      color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            padding: 3, 
            marginBottom: 3,
            backgroundColor: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              color: isDark ? '#fff' : '#000',
              marginBottom: 3 
            }}
          >
            New Report
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Report submitted successfully!
            </Alert>
          )}

          <Box sx={customFormStyle}>
            <Form
              schema={currentSchema}
              uiSchema={customUiSchema}
              validator={validator}
              formData={formData}
              onChange={handleChange}
              onSubmit={handleSubmit}
              disabled={isSubmitting}
              showErrorList={false}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                sx={{ mt: 3, px: 4, py: 1.5 }}
                fullWidth
              >
                {isSubmitting ? 'Importing...' : 'Submit'}
              </Button>
            </Form>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default DataImportForm; 