import express from 'express';
import cors from 'cors';
import { getAllReports, getReportsByCountry, getReportsByYear, addReport } from './db.js';
import { STRATEGIC_RESULTS_HIERARCHY, ALL_AFRICAN_COUNTRIES, PARTNERSHIPS } from './data.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the ACS Reporting Dashboard API');
});

// Get filters endpoint
app.get('/api/filters', (req, res) => {
    try {
        res.json({
            strategicResultHierarchy: STRATEGIC_RESULTS_HIERARCHY,
            allAfricanCountries: ALL_AFRICAN_COUNTRIES,
            partnerships: PARTNERSHIPS
        });
    } catch (error) {
        console.error('Error fetching filters:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all reports
app.get('/api/reports', async (req, res) => {
    try {
        const reports = await getAllReports();
        res.json(reports);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get reports by country
app.get('/api/reports/country/:country', async (req, res) => {
    try {
        const reports = await getReportsByCountry(req.params.country);
        res.json(reports);
    } catch (error) {
        console.error('Error fetching reports by country:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get reports by year
app.get('/api/reports/year/:year', async (req, res) => {
    try {
        const reports = await getReportsByYear(parseInt(req.params.year));
        res.json(reports);
    } catch (error) {
        console.error('Error fetching reports by year:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add a new report
app.post('/api/reports', async (req, res) => {
    try {
        const newReport = await addReport(req.body);
        res.status(201).json(newReport);
    } catch (error) {
        console.error('Error adding report:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
