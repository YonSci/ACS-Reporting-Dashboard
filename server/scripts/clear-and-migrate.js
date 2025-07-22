import { Client, Databases } from 'appwrite';
import dotenv from 'dotenv';
import { MOCK_REPORTS as reports } from '../data.js';

dotenv.config();

const APPWRITE_ENDPOINT = process.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = process.env.VITE_APPWRITE_PROJECT_ID;
const APPWRITE_API_KEY = process.env.VITE_APPWRITE_API_KEY;
const APPWRITE_DATABASE_ID = process.env.VITE_APPWRITE_DATABASE_ID || 'acs-dashboard';
const APPWRITE_REPORTS_COLLECTION_ID = process.env.VITE_APPWRITE_REPORTS_COLLECTION_ID || 'reports';

const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

const databases = new Databases(client, APPWRITE_API_KEY);

async function clearAndMigrate() {
    try {
        console.log('🚀 Clear and Re-migrate All Data to Appwrite');
        console.log('============================================');
        console.log('Project ID:', APPWRITE_PROJECT_ID);
        console.log('Database ID:', APPWRITE_DATABASE_ID);
        console.log('Collection ID:', APPWRITE_REPORTS_COLLECTION_ID);

        // 1. Clear existing documents
        let allDocuments = [];
        let offset = 0;
        const limit = 100;
        while (true) {
            const response = await databases.listDocuments(
                APPWRITE_DATABASE_ID,
                APPWRITE_REPORTS_COLLECTION_ID,
                [],
                limit,
                offset
            );
            allDocuments = allDocuments.concat(response.documents);
            if (response.documents.length < limit) break;
            offset += limit;
        }
        console.log(`📊 Current documents in collection: ${allDocuments.length}`);
        if (allDocuments.length > 0) {
            console.log('🗑️ Clearing existing documents...');
            for (const doc of allDocuments) {
                await databases.deleteDocument(
                    APPWRITE_DATABASE_ID,
                    APPWRITE_REPORTS_COLLECTION_ID,
                    doc.$id
                );
                console.log('🗑️ Deleted document:', doc.$id);
            }
            console.log('✅ All existing documents cleared!');
        }

        // 2. Migrate new data
        console.log('📊 Starting fresh data migration...');
        console.log(`📝 Found ${reports.length} reports to migrate from server/data.js`);
        for (let i = 0; i < reports.length; i++) {
            const report = { ...reports[i] };
            delete report.createdByUsername;
            delete report.approvedByUsername;
            delete report.id;
            report.reportIndex = i;
            if (!report.status) {
                report.status = 'draft';
            }
            if (!report.createdBy) {
                report.createdBy = 'system';
            }
            if (!report.approvedBy) {
                report.approvedBy = 'system';
            }
            // Ensure partnerships is always an array
            if (!Array.isArray(report.partnerships)) {
                report.partnerships = report.partnerships
                    ? report.partnerships.split(',').map(s => s.trim()).filter(Boolean)
                    : [];
            }
            // Ensure details is always an array
            if (!Array.isArray(report.details)) {
                report.details = report.details
                    ? [report.details]
                    : [];
            }
            try {
                const created = await databases.createDocument(
                    APPWRITE_DATABASE_ID,
                    APPWRITE_REPORTS_COLLECTION_ID,
                    'unique()',
                    report
                );
                console.log(`✅ Successfully created document: ${created.$id}`);
            } catch (err) {
                console.error(`❌ Failed to create document for reportIndex ${i}:`, err.message);
            }
        }
        console.log('🎉 Fresh data migration completed!');
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

clearAndMigrate(); 