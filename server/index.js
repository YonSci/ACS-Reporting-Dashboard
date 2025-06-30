import express from 'express';
import cors from 'cors';
import { MOCK_REPORTS, STRATEGIC_RESULTS_HIERARCHY, ALL_AFRICAN_COUNTRIES, PARTNERSHIPS } from './data.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the ACS Reporting Dashboard API!');
});

app.get('/api/reports', (req, res) => {
  res.json(MOCK_REPORTS);
});

app.get('/api/filters', (req, res) => {
  res.json({
    strategicResultHierarchy: STRATEGIC_RESULTS_HIERARCHY,
    allAfricanCountries: ALL_AFRICAN_COUNTRIES,
    partnerships: PARTNERSHIPS,
  });
});

app.post('/api/reports', (req, res) => {
  const newReport = req.body;
  // Assign a simple unique ID for now
  newReport.id = String(MOCK_REPORTS.length > 0 ? Math.max(...MOCK_REPORTS.map(r => parseInt(r.id))) + 1 : 0);
  MOCK_REPORTS.push(newReport);
  res.status(201).json(newReport);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
