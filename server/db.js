import sqlite3 from 'sqlite3';

// Initialize database
const db = new sqlite3.Database('reports.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to the SQLite database.');
        initDb();
    }
});

// Promisify db.run
const run = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID, changes: this.changes });
            }
        });
    });
};

// Promisify db.get
const get = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

// Promisify db.all
const all = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Initialize database
const initDb = async () => {
    try {
        // Create reports table with submittedBy field
        await run(`
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
                submittedBy TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Add submittedBy column if it doesn't exist (for existing databases)
        try {
            await run("ALTER TABLE reports ADD COLUMN submittedBy TEXT");
        } catch (error) {
            // Column might already exist, ignore the error
            if (!error.message.includes('duplicate column name')) {
                throw error;
            }
        }
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

// Report operations
export const getAllReports = async () => {
    return all('SELECT * FROM reports ORDER BY created_at DESC');
};

export const getReportsByCountry = async (country) => {
    return all('SELECT * FROM reports WHERE interventionCountry = ? ORDER BY year DESC', [country]);
};

export const getReportsByYear = async (year) => {
    return all('SELECT * FROM reports WHERE year = ? ORDER BY interventionCountry', [year]);
};

export const addNewReport = async (report, userEmail) => {
    if (!userEmail) {
        throw new Error('User email is required to submit a report');
    }

    const result = await run(
        `INSERT INTO reports (
            strategicResultArea, subStrategicResultArea, interventionCountry,
            partnerships, year, sdgContribution, supportingLinks, details,
            submittedBy
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            report.strategicResultArea,
            report.subStrategicResultArea,
            report.interventionCountry,
            Array.isArray(report.partnerships) ? report.partnerships.join(',') : report.partnerships,
            report.year,
            report.sdgContribution,
            Array.isArray(report.supportingLinks) ? report.supportingLinks.join(',') : report.supportingLinks,
            Array.isArray(report.details) ? report.details.join('\n') : report.details,
            userEmail
        ]
    );
    
    // Return the newly created report
    if (result.id) {
        return get('SELECT * FROM reports WHERE id = ?', [result.id]);
    }
    throw new Error('Failed to create report');
};

export default db; 