import React, { useState, useEffect } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Box, Typography, Alert, Chip } from '@mui/material';
import { validateReport } from '../schemas/reportSchema';
import { STRATEGIC_RESULT_AREAS, STRATEGIC_RESULTS_HIERARCHY, ALL_AFRICAN_COUNTRIES, COMMON_PARTNERSHIPS, REPORT_YEARS } from '../constants';

const DataImportForm = () => {
    const [formData, setFormData] = useState({
        strategicResultArea: '',
        subStrategicResultArea: '',
        interventionCountry: '',
        partnerships: [],
        year: '',
        sdgContribution: '',
        supportingLinks: [],
        details: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [subAreas, setSubAreas] = useState([]);

    useEffect(() => {
        // Update sub-areas when strategic result area changes
        if (formData.strategicResultArea && STRATEGIC_RESULTS_HIERARCHY[formData.strategicResultArea]) {
            setSubAreas(STRATEGIC_RESULTS_HIERARCHY[formData.strategicResultArea]);
        } else {
            setSubAreas([]);
        }
        // Clear sub area when main area changes
        setFormData(prev => ({
            ...prev,
            subStrategicResultArea: ''
        }));
    }, [formData.strategicResultArea]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePartnershipsChange = (event) => {
        setFormData(prev => ({
            ...prev,
            partnerships: event.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            // Validate the report data
            const validationError = validateReport(formData);
            if (validationError) {
                setError(validationError);
                return;
            }

            // Submit the report
            const response = await fetch('http://localhost:3001/api/reports', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit report');
            }

            setSuccess(true);
            setFormData({
                strategicResultArea: '',
                subStrategicResultArea: '',
                interventionCountry: '',
                partnerships: [],
                year: '',
                sdgContribution: '',
                supportingLinks: [],
                details: ''
            });
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
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
                    Report added successfully!
                </Alert>
            )}

            <form onSubmit={handleSubmit}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Strategic Result Area</InputLabel>
                    <Select
                        name="strategicResultArea"
                        value={formData.strategicResultArea}
                        onChange={handleChange}
                        label="Strategic Result Area"
                        required
                    >
                        {Object.entries(STRATEGIC_RESULT_AREAS).map(([key, value]) => (
                            <MenuItem key={key} value={key}>{value}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Sub Strategic Result Area</InputLabel>
                    <Select
                        name="subStrategicResultArea"
                        value={formData.subStrategicResultArea}
                        onChange={handleChange}
                        label="Sub Strategic Result Area"
                        required
                        disabled={!formData.strategicResultArea}
                    >
                        {subAreas.map((area) => (
                            <MenuItem key={area} value={area}>{area}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Intervention Country</InputLabel>
                    <Select
                        name="interventionCountry"
                        value={formData.interventionCountry}
                        onChange={handleChange}
                        label="Intervention Country"
                        required
                    >
                        {ALL_AFRICAN_COUNTRIES.map((country) => (
                            <MenuItem key={country} value={country}>{country}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Partnerships</InputLabel>
                    <Select
                        multiple
                        name="partnerships"
                        value={formData.partnerships}
                        onChange={handlePartnershipsChange}
                        label="Partnerships"
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                    >
                        {COMMON_PARTNERSHIPS.map((partnership) => (
                            <MenuItem key={partnership} value={partnership}>
                                {partnership}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Year</InputLabel>
                    <Select
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        label="Year"
                        required
                    >
                        {REPORT_YEARS.map((year) => (
                            <MenuItem key={year} value={year}>{year}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    label="SDG Contribution"
                    name="sdgContribution"
                    value={formData.sdgContribution}
                    onChange={handleChange}
                    multiline
                    rows={2}
                    sx={{ mb: 2 }}
                />

                <TextField
                    fullWidth
                    label="Supporting Links"
                    name="supportingLinks"
                    value={formData.supportingLinks.join('\n')}
                    onChange={(e) => {
                        const links = e.target.value.split('\n').filter(link => link.trim());
                        setFormData(prev => ({
                            ...prev,
                            supportingLinks: links
                        }));
                    }}
                    multiline
                    rows={2}
                    helperText="Enter one link per line"
                    sx={{ mb: 2 }}
                />

                <TextField
                    fullWidth
                    label="Details"
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    required
                    sx={{ mb: 2 }}
                />

                <Button type="submit" variant="contained" color="primary">
                    Submit Report
                </Button>
            </form>
        </Box>
    );
};

export default DataImportForm; 