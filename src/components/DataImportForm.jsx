import React, { useState } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { Button, Box, Typography, Alert, ThemeProvider, createTheme } from '@mui/material';
import { reportSchema, uiSchema } from '../schemas/reportSchema';
import { submitReportData } from '../utils/reportUtils';

const theme = createTheme();

const DataImportForm = () => {
  const [formData, setFormData] = useState({}); // Initialize with empty object for new entry
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async ({ formData }) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false); // Reset success state on new submission attempt
    try {
      await submitReportData(formData); // Assuming submitReportData handles the API call
      setSuccess(true);
      setFormData({}); // Reset form after successful submission
    } catch (err) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3 }}>
        <Typography variant="h5" gutterBottom>
          Add New Report
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Report submitted successfully!
          </Alert>
        )}

        <Form
          schema={reportSchema}
          uiSchema={uiSchema}
          validator={validator}
          formData={formData}
          onChange={({ formData }) => setFormData(formData)}
          onSubmit={handleSubmit}
          disabled={isSubmitting}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            sx={{ mt: 2 }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </Button>
        </Form>
      </Box>
    </ThemeProvider>
  );
};

export default DataImportForm; 