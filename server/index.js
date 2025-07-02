import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { router as authRoutes } from './routes/auth.js';
import { verifyToken } from './middleware/auth.js';
import { getAllReports, addNewReport } from './db.js';
import { getFilters } from './data.js';

const app = express();
const PORT = process.env.PORT || 3002;

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'], // Allow all Vite dev ports
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);

// Reports endpoints
app.get('/api/reports', async (req, res) => {
  try {
    const reports = await getAllReports();
    res.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

app.post('/api/reports', verifyToken, async (req, res) => {
  try {
    const report = await addNewReport(req.body, req.user.email);
    res.status(201).json(report);
  } catch (error) {
    console.error('Error adding report:', error);
    res.status(500).json({ error: error.message || 'Failed to add report' });
  }
});

// Filters endpoint
app.get('/api/filters', async (req, res) => {
  try {
    const filters = await getFilters();
    res.json(filters);
  } catch (error) {
    console.error('Error fetching filters:', error);
    res.status(500).json({ error: 'Failed to fetch filters' });
  }
});

// API root endpoint
app.get('/api', (req, res) => {
  res.json({ 
    message: 'ACS Reporting Dashboard API',
    endpoints: {
      auth: '/api/auth/*',
      reports: '/api/reports',
      filters: '/api/filters'
    }
  });
});

// Redirect all other requests to the frontend
app.get('*', (req, res) => {
  res.redirect('http://localhost:5175');
});

app.listen(PORT, () => {
  console.log(`API server is running on port ${PORT}`);
  console.log(`API is available at http://localhost:${PORT}/api`);
});
