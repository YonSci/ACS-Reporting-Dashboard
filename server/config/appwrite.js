import { Client, Databases, Account } from 'appwrite';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Appwrite Configuration
const APPWRITE_ENDPOINT = process.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = process.env.VITE_APPWRITE_PROJECT_ID;
const APPWRITE_API_KEY = process.env.VITE_APPWRITE_API_KEY;
const DATABASE_ID = process.env.VITE_APPWRITE_DATABASE_ID || 'acs-dashboard';
const REPORTS_COLLECTION_ID = process.env.VITE_APPWRITE_REPORTS_COLLECTION_ID || 'reports';

// Initialize Appwrite Client
const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID)
    .setKey(APPWRITE_API_KEY);

// Initialize services
export const databases = new Databases(client);
export const account = new Account(client);

// Database and Collection IDs
export const APPWRITE_CONFIG = {
    DATABASE_ID,
    REPORTS_COLLECTION_ID
};

// Helper functions for reports
export const reportsAPI = {
    // Get all reports
    async getAllReports() {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                REPORTS_COLLECTION_ID
            );
            return response.documents;
        } catch (error) {
            console.error('Error fetching reports:', error);
            throw error;
        }
    },

    // Get reports by status
    async getReportsByStatus(status) {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                REPORTS_COLLECTION_ID,
                [
                    `equal("status", "${status}")`
                ]
            );
            return response.documents;
        } catch (error) {
            console.error('Error fetching reports by status:', error);
            throw error;
        }
    },

    // Get reports by user
    async getReportsByUser(userId) {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                REPORTS_COLLECTION_ID,
                [
                    `equal("createdBy", "${userId}")`
                ]
            );
            return response.documents;
        } catch (error) {
            console.error('Error fetching user reports:', error);
            throw error;
        }
    },

    // Create new report
    async createReport(reportData) {
        try {
            const response = await databases.createDocument(
                DATABASE_ID,
                REPORTS_COLLECTION_ID,
                'unique()',
                {
                    ...reportData,
                    status: reportData.status || 'draft',
                    createdAt: new Date().toISOString()
                }
            );
            return response;
        } catch (error) {
            console.error('Error creating report:', error);
            throw error;
        }
    },

    // Update report
    async updateReport(documentId, updates) {
        try {
            const response = await databases.updateDocument(
                DATABASE_ID,
                REPORTS_COLLECTION_ID,
                documentId,
                {
                    ...updates,
                    updatedAt: new Date().toISOString()
                }
            );
            return response;
        } catch (error) {
            console.error('Error updating report:', error);
            throw error;
        }
    },

    // Delete report
    async deleteReport(documentId) {
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                REPORTS_COLLECTION_ID,
                documentId
            );
            return true;
        } catch (error) {
            console.error('Error deleting report:', error);
            throw error;
        }
    },

    // Bulk update reports
    async bulkUpdateReports(documentIds, updates) {
        try {
            const promises = documentIds.map(id => 
                this.updateReport(id, updates)
            );
            const results = await Promise.all(promises);
            return results;
        } catch (error) {
            console.error('Error bulk updating reports:', error);
            throw error;
        }
    },

    // Get statistics
    async getStatistics() {
        try {
            const [allReports, draftReports, pendingReports, approvedReports, archivedReports] = await Promise.all([
                this.getAllReports(),
                this.getReportsByStatus('draft'),
                this.getReportsByStatus('pending_approval'),
                this.getReportsByStatus('approved'),
                this.getReportsByStatus('archived')
            ]);

            return {
                totalReports: allReports.length,
                statusCounts: {
                    draft: draftReports.length,
                    pending_approval: pendingReports.length,
                    approved: approvedReports.length,
                    archived: archivedReports.length
                },
                recentReports: allReports.slice(0, 5)
            };
        } catch (error) {
            console.error('Error getting statistics:', error);
            throw error;
        }
    }
};

export default client; 