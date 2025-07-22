import { Client, Databases } from 'appwrite';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Appwrite Configuration
const APPWRITE_ENDPOINT = process.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = process.env.VITE_APPWRITE_PROJECT_ID;
const APPWRITE_DATABASE_ID = process.env.VITE_APPWRITE_DATABASE_ID || 'acs-dashboard';
const APPWRITE_REPORTS_COLLECTION_ID = process.env.VITE_APPWRITE_REPORTS_COLLECTION_ID || 'reports';

// Initialize Appwrite Client
const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

const databases = new Databases(client);

async function removeDuplicates() {
    try {
        console.log('🔍 Starting duplicate removal process by $id...');
        console.log(`📊 Database: ${APPWRITE_DATABASE_ID}`);
        console.log(`📊 Collection: ${APPWRITE_REPORTS_COLLECTION_ID}`);

        // Get all documents
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

        console.log(`📊 Total documents found: ${allDocuments.length}`);

        // Remove all but one document per unique $id
        const seenIds = new Set();
        const toDelete = [];
        allDocuments.forEach(doc => {
            if (seenIds.has(doc.$id)) {
                toDelete.push(doc.$id);
            } else {
                seenIds.add(doc.$id);
            }
        });

        console.log(`🗑️ Will delete ${toDelete.length} duplicate documents (by $id)`);
        for (let i = 0; i < toDelete.length; i++) {
            const docId = toDelete[i];
            try {
                await databases.deleteDocument(
                    APPWRITE_DATABASE_ID,
                    APPWRITE_REPORTS_COLLECTION_ID,
                    docId
                );
                console.log(`✅ Deleted duplicate ${i + 1}/${toDelete.length}: ${docId}`);
            } catch (error) {
                console.error(`❌ Failed to delete ${docId}:`, error.message);
            }
        }

        console.log(`🎉 Finished. Only one document per $id remains.`);
        console.log(`📊 Remaining unique documents: ${seenIds.size}`);
    } catch (error) {
        console.error('❌ Error removing duplicates:', error);
        throw error;
    }
}

// Run the script
removeDuplicates()
    .then(() => {
        console.log('✅ Duplicate removal completed successfully!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Duplicate removal failed:', error);
        process.exit(1);
    }); 