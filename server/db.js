import Database from 'better-sqlite3';
import { MOCK_REPORTS } from './data.js';

// Initialize database
const db = new Database('reports.db', { verbose: console.log });

// Create tables
const initDb = () => {
    // Create reports table
    db.exec(`
        CREATE TABLE IF NOT EXISTS reports (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            strategicResultArea TEXT,
            subStrategicResultArea TEXT,
            interventionCountry TEXT NOT NULL,
            partnerships TEXT,
            year INTEGER NOT NULL,
            sdgContribution TEXT,
            supportingLinks TEXT,
            details TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Check if we need to import initial data
    const count = db.prepare('SELECT COUNT(*) as count FROM reports').get();
    if (count.count === 0) {
        // Import mock data
        const insert = db.prepare(`
            INSERT INTO reports (
                strategicResultArea, subStrategicResultArea, interventionCountry,
                partnerships, year, sdgContribution, supportingLinks, details
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `);

        MOCK_REPORTS.forEach(report => {
            insert.run(
                report.strategicResultArea,
                report.subStrategicResultArea,
                report.interventionCountry,
                Array.isArray(report.partnerships) ? report.partnerships.join(',') : report.partnerships,
                report.year,
                report.sdgContribution,
                Array.isArray(report.supportingLinks) ? report.supportingLinks.join(',') : report.supportingLinks,
                Array.isArray(report.details) ? report.details.join('\n') : report.details
            );
        });
    }
};

// Initialize the database
initDb();

// Database operations
export const getAllReports = () => {
    const reports = db.prepare('SELECT * FROM reports ORDER BY year DESC').all();
    return reports.map(formatReport);
};

export const getReportsByCountry = (country) => {
    const reports = db.prepare('SELECT * FROM reports WHERE interventionCountry = ? ORDER BY year DESC').all(country);
    return reports.map(formatReport);
};

export const getReportsByYear = (year) => {
    const reports = db.prepare('SELECT * FROM reports WHERE year = ? ORDER BY interventionCountry').all(year);
    return reports.map(formatReport);
};

export const addReport = (report) => {
    const insert = db.prepare(`
        INSERT INTO reports (
            strategicResultArea, subStrategicResultArea, interventionCountry,
            partnerships, year, sdgContribution, supportingLinks, details
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(
        report.strategicResultArea,
        report.subStrategicResultArea,
        report.interventionCountry,
        Array.isArray(report.partnerships) ? report.partnerships.join(',') : report.partnerships,
        report.year,
        report.sdgContribution,
        Array.isArray(report.supportingLinks) ? report.supportingLinks.join(',') : report.supportingLinks,
        Array.isArray(report.details) ? report.details.join('\n') : report.details
    );

    return { ...report, id: result.lastInsertRowid };
};

// Helper function to format report data
const formatReport = (report) => ({
    ...report,
    partnerships: report.partnerships ? report.partnerships.split(',') : [],
    supportingLinks: report.supportingLinks ? report.supportingLinks.split(',') : [],
    details: report.details ? report.details.split('\n').filter(Boolean) : []
});

export default db; 