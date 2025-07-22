import { Client, Databases, Query } from 'appwrite';
import 'dotenv/config';

// Initialize Appwrite client for server-side operations
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.VITE_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

const DATABASE_ID = process.env.VITE_APPWRITE_DATABASE_ID;
const REPORTS_COLLECTION_ID = process.env.VITE_APPWRITE_REPORTS_COLLECTION_ID;

async function updateAllReportsToApproved() {
    try {
        console.log('🚀 Starting bulk update of all reports to approved status...');
        
        // Step 1: Get all reports
        let allReports = [];
        let offset = 0;
        const limit = 100;
        let maxIterations = 50;
        let iteration = 0;

        while (iteration < maxIterations) {
            iteration++;
            const response = await databases.listDocuments(
                DATABASE_ID,
                REPORTS_COLLECTION_ID,
                [
                    Query.limit(limit),
                    Query.offset(offset)
                ]
            );
            
            allReports = allReports.concat(response.documents);
            console.log(`📄 Fetched batch ${iteration}: ${response.documents.length} reports (offset: ${offset})`);
            
            if (response.documents.length < limit) break;
            offset += limit;
        }

        console.log(`📊 Total reports found: ${allReports.length}`);

        // Step 2: Update each report to approved status
        const updatePromises = allReports.map(async (report, index) => {
            try {
                const now = new Date().toISOString();
                const updateData = {
                    status: 'approved',
                    approvedBy: 'system',
                    approvedByUsername: 'System Migration',
                    approvedAt: now,
                    updatedAt: now
                };

                await databases.updateDocument(
                    DATABASE_ID,
                    REPORTS_COLLECTION_ID,
                    report.$id,
                    updateData
                );

                console.log(`✅ Updated report ${index + 1}/${allReports.length}: ${report.$id}`);
                return { success: true, id: report.$id };
            } catch (error) {
                console.error(`❌ Failed to update report ${report.$id}:`, error.message);
                return { success: false, id: report.$id, error: error.message };
            }
        });

        // Execute all updates
        const results = await Promise.all(updatePromises);
        
        // Summary
        const successful = results.filter(r => r.success).length;
        const failed = results.filter(r => !r.success).length;

        console.log('\n📈 UPDATE SUMMARY:');
        console.log(`✅ Successfully updated: ${successful} reports`);
        console.log(`❌ Failed to update: ${failed} reports`);
        
        if (failed > 0) {
            console.log('\n❌ Failed reports:');
            results.filter(r => !r.success).forEach(r => {
                console.log(`  - ${r.id}: ${r.error}`);
            });
        }

        console.log('\n🎉 Bulk update completed!');
        console.log('All existing reports are now approved and will show on the dashboard.');

    } catch (error) {
        console.error('💥 Error during bulk update:', error);
        process.exit(1);
    }
}

// Run the update
updateAllReportsToApproved(); 