import { Client, Databases } from 'appwrite';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Appwrite Configuration
const APPWRITE_ENDPOINT = process.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = process.env.VITE_APPWRITE_PROJECT_ID;
const APPWRITE_API_KEY = process.env.VITE_APPWRITE_API_KEY;
const DATABASE_ID = process.env.VITE_APPWRITE_DATABASE_ID || 'acs-dashboard';
const REPORTS_COLLECTION_ID = process.env.VITE_APPWRITE_REPORTS_COLLECTION_ID || 'reports';

console.log('🚀 Starting Appwrite Migration...');
console.log('==============================');
console.log('Project ID:', APPWRITE_PROJECT_ID);
console.log('Database ID:', DATABASE_ID);
console.log('Collection ID:', REPORTS_COLLECTION_ID);
console.log('');

// Initialize Appwrite Client
const client = new Client();
client
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

// Initialize Databases service
const databases = new Databases(client, APPWRITE_PROJECT_ID);

// Sample mock data for migration
const MOCK_REPORTS = [
    {
        strategicResultArea: "Economic Development",
        subStrategicResultArea: "Trade Facilitation",
        interventionCountry: "Nigeria",
        year: 2024,
        partnerships: ["UNECA", "African Union"],
        details: ["Implemented new trade policies", "Reduced border delays by 30%"],
        sdgContribution: "SDG 8: Decent Work and Economic Growth",
        supportingLinks: ["https://example.com/report1", "https://example.com/report2"],
        status: "approved",
        createdBy: "system",
        createdByUsername: "System Migration"
    },
    {
        strategicResultArea: "Social Development",
        subStrategicResultArea: "Education",
        interventionCountry: "Kenya",
        year: 2024,
        partnerships: ["UNESCO", "Local NGOs"],
        details: ["Built 5 new schools", "Trained 100 teachers"],
        sdgContribution: "SDG 4: Quality Education",
        supportingLinks: ["https://example.com/education-report"],
        status: "approved",
        createdBy: "system",
        createdByUsername: "System Migration"
    },
    {
        strategicResultArea: "Environmental Sustainability",
        subStrategicResultArea: "Renewable Energy",
        interventionCountry: "South Africa",
        year: 2024,
        partnerships: ["World Bank", "Green Energy Fund"],
        details: ["Installed solar panels in 50 villages", "Reduced carbon emissions by 25%"],
        sdgContribution: "SDG 7: Affordable and Clean Energy",
        supportingLinks: ["https://example.com/energy-report"],
        status: "approved",
        createdBy: "system",
        createdByUsername: "System Migration"
    }
];

// Migration function
async function migrateToAppwrite() {
    try {
        console.log('🧪 Testing connection to Appwrite...');
        
        // Test connection by trying to list documents
        try {
            const response = await databases.listDocuments(DATABASE_ID, REPORTS_COLLECTION_ID);
            console.log('✅ Successfully connected to Appwrite!');
            console.log('📊 Current documents in collection:', response.documents.length);
        } catch (error) {
            if (error.code === 404) {
                console.log('❌ Collection not found. Please create the collection first.');
                console.log('Go to Appwrite Console → Databases → ACS Dashboard → Create Collection');
                console.log('Collection ID should be:', REPORTS_COLLECTION_ID);
                return;
            } else {
                console.log('❌ Connection error:', error.message);
                return;
            }
        }

        console.log('');
        console.log('📊 Starting data migration...');
        
        let successCount = 0;
        let errorCount = 0;

        for (const report of MOCK_REPORTS) {
            try {
                console.log(`📝 Migrating report: ${report.strategicResultArea} - ${report.interventionCountry}`);
                
                // Format the data for Appwrite
                const formattedReport = {
                    strategicResultArea: report.strategicResultArea,
                    subStrategicResultArea: report.subStrategicResultArea || '',
                    interventionCountry: report.interventionCountry,
                    year: parseInt(report.year) || 2024,
                    partnerships: Array.isArray(report.partnerships) 
                        ? report.partnerships 
                        : typeof report.partnerships === 'string'
                            ? report.partnerships.split(',').map(p => p.trim())
                            : [],
                    details: Array.isArray(report.details) 
                        ? report.details 
                        : typeof report.details === 'string'
                            ? [report.details]
                            : [],
                    sdgContribution: report.sdgContribution || '',
                    supportingLinks: Array.isArray(report.supportingLinks) 
                        ? report.supportingLinks 
                        : typeof report.supportingLinks === 'string'
                            ? [report.supportingLinks]
                            : [],
                    status: report.status || 'approved',
                    createdBy: report.createdBy || 'system',
                    createdByUsername: report.createdByUsername || 'System Migration',
                    createdAt: new Date().toISOString()
                };

                // Create document in Appwrite
                const result = await databases.createDocument(
                    DATABASE_ID,
                    REPORTS_COLLECTION_ID,
                    'unique()',
                    formattedReport
                );

                console.log(`✅ Successfully created document: ${result.$id}`);
                successCount++;
                
            } catch (error) {
                console.log(`❌ Error migrating report: ${error.message}`);
                errorCount++;
            }
        }

        console.log('');
        console.log('🎉 Migration completed!');
        console.log(`✅ Successfully migrated: ${successCount} reports`);
        console.log(`❌ Failed migrations: ${errorCount} reports`);
        console.log(`📊 Total processed: ${MOCK_REPORTS.length} reports`);
        
        if (successCount > 0) {
            console.log('');
            console.log('🚀 Your dashboard is now ready to use with Appwrite!');
            console.log('Start your development server: npm run dev');
        }

    } catch (error) {
        console.error('❌ Migration failed:', error);
        console.log('');
        console.log('🔧 Troubleshooting:');
        console.log('1. Make sure the collection exists in Appwrite');
        console.log('2. Check that all required attributes are added to the collection');
        console.log('3. Verify your API key has the correct permissions');
    }
}

// Run migration
migrateToAppwrite(); 