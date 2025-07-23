import { Client, Databases, Account, Teams, Query } from 'appwrite';

// Appwrite Configuration
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID || 'your-project-id';
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || 'acs-dashboard';
const APPWRITE_REPORTS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_REPORTS_COLLECTION_ID || 'reports';
const APPWRITE_APPRM_COLLECTION_ID = import.meta.env.VITE_APPWRITE_APPRM_COLLECTION_ID || 'apprm';

// Initialize Appwrite Client
const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

// Initialize services
export const databases = new Databases(client);
export const account = new Account(client);
export const teams = new Teams(client);

// Database and Collection IDs
export const DATABASE_ID = APPWRITE_DATABASE_ID;
export const REPORTS_COLLECTION_ID = APPWRITE_REPORTS_COLLECTION_ID;
export const APPRM_COLLECTION_ID = APPWRITE_APPRM_COLLECTION_ID;

// Helper functions for reports
export const reportsAPI = {
    // Get all reports
    async getAllReports() {
        console.log('🚀 NEW PAGINATION CODE: Starting getAllReports with pagination...');
        console.log(`🔧 Using DATABASE_ID: ${DATABASE_ID}`);
        console.log(`🔧 Using REPORTS_COLLECTION_ID: ${REPORTS_COLLECTION_ID}`);
        try {
            let allDocuments = [];
            let offset = 0;
            const limit = 100; // Appwrite Cloud max per request
            let maxIterations = 50; // Safety limit
            let iteration = 0;
            while (iteration < maxIterations) {
                iteration++;
                const response = await databases.listDocuments(
                    DATABASE_ID,
                    REPORTS_COLLECTION_ID,
                    [
                        Query.limit(limit),
                        Query.offset(offset)
                    ],
                );
                allDocuments = allDocuments.concat(response.documents);
                if (response.documents.length < limit) break;
                offset += limit;
            }
            
            // Step 2: Log ID counts to check for repeated $id
            const idCounts = allDocuments.reduce((acc, doc) => {
                acc[doc.$id] = (acc[doc.$id] || 0) + 1;
                return acc;
            }, {});
            console.log('🆔 ID counts:', idCounts);
            const repeatedIds = Object.entries(idCounts).filter(([id, count]) => count > 1);
            if (repeatedIds.length > 0) {
                console.warn('⚠️ Repeated $id detected:', repeatedIds);
            } else {
                console.log('✅ All $id values are unique.');
            }
            
            // Deduplicate by $id as a safety net
            const uniqueDocuments = Array.from(
                new Map(allDocuments.map(doc => [doc.$id, doc])).values()
            );
            // Sort by reportIndex in JS as a workaround for Appwrite Cloud
            uniqueDocuments.sort((a, b) => (a.reportIndex ?? 0) - (b.reportIndex ?? 0));
            console.log(`✅ Unique documents after deduplication and sorting: ${uniqueDocuments.length}`);
            console.log(`🚀 NEW PAGINATION CODE: Fetched ${uniqueDocuments.length} reports from Appwrite using pagination!`);
            return uniqueDocuments;
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
            console.log('📝 Creating report with data:', reportData);
            console.log('📝 Report data fields:', Object.keys(reportData));
            
            const response = await databases.createDocument(
                DATABASE_ID,
                REPORTS_COLLECTION_ID,
                'unique()',
                {
                    ...reportData,
                    status: reportData.status || 'draft'
                }
            );
            
            console.log('✅ Created report response:', response);
            return response;
        } catch (error) {
            console.error('❌ Error creating report:', error);
            console.error('❌ Error details:', error.message);
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
                updates
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

    // Update report status (for admin approval workflow)
    async updateReportStatus(reportId, newStatus, admin) {
        try {
            // Start with just the essential status field
            const updateData = {
                status: newStatus
            };

            // Note: approverName attribute doesn't exist in collection
            // Approval tracking is handled by the admin user in the Data Management UI

            console.log('📝 Updating report with data:', updateData);
            
            const response = await databases.updateDocument(
                DATABASE_ID,
                REPORTS_COLLECTION_ID,
                reportId,
                updateData
            );
            
            console.log('✅ Update response:', response);
            return response;
        } catch (error) {
            console.error('❌ Error updating report status:', error);
            console.error('❌ Error details:', error.message);
            console.error('❌ Full error object:', error);
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

// Helper functions for APPRM data
export const apprmAPI = {
    // Get all APPRM country data
    async getAllAPPRMData() {
        console.log('🚀 Starting getAllAPPRMData with pagination...');
        console.log(`🔧 Using DATABASE_ID: ${DATABASE_ID}`);
        console.log(`🔧 Using APPRM_COLLECTION_ID: ${APPRM_COLLECTION_ID}`);
        try {
            let allDocuments = [];
            let offset = 0;
            const limit = 100; // Appwrite Cloud max per request
            let maxIterations = 50; // Safety limit
            let iteration = 0;
            
            while (iteration < maxIterations) {
                iteration++;
                const response = await databases.listDocuments(
                    DATABASE_ID,
                    APPRM_COLLECTION_ID,
                    [
                        Query.limit(limit),
                        Query.offset(offset)
                    ],
                );
                
                allDocuments = allDocuments.concat(response.documents);
                if (response.documents.length < limit) break;
                offset += limit;
            }
            
            // Deduplicate by $id as a safety net
            const uniqueDocuments = Array.from(
                new Map(allDocuments.map(doc => [doc.$id, doc])).values()
            );
            
            // Sort by reportIndex in JS
            uniqueDocuments.sort((a, b) => (b.reportIndex ?? 0) - (a.reportIndex ?? 0));
            
            console.log(`✅ Fetched ${uniqueDocuments.length} APPRM records from Appwrite!`);
            return uniqueDocuments;
        } catch (error) {
            console.error('Error fetching APPRM data:', error);
            throw error;
        }
    },

    // Get APPRM data by status
    async getAPPRMDataByStatus(status) {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                APPRM_COLLECTION_ID,
                [
                    Query.equal("status", status)
                ]
            );
            return response.documents;
        } catch (error) {
            console.error('Error fetching APPRM data by status:', error);
            throw error;
        }
    },

    // Get APPRM data by country
    async getAPPRMDataByCountry(country) {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                APPRM_COLLECTION_ID,
                [
                    Query.equal("country", country)
                ]
            );
            return response.documents;
        } catch (error) {
            console.error('Error fetching APPRM data by country:', error);
            throw error;
        }
    },

    // Get APPRM data by year and quarter
    async getAPPRMDataByPeriod(year, quarter = null) {
        try {
            const queries = [Query.equal("Year", year)];
            if (quarter) {
                queries.push(Query.equal("Quarter", quarter));
            }
            
            const response = await databases.listDocuments(
                DATABASE_ID,
                APPRM_COLLECTION_ID,
                queries
            );
            return response.documents;
        } catch (error) {
            console.error('Error fetching APPRM data by period:', error);
            throw error;
        }
    },

    // Get APPRM data by user
    async getAPPRMDataByUser(userId) {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                APPRM_COLLECTION_ID,
                [
                    Query.equal("createdBy", userId)
                ]
            );
            return response.documents;
        } catch (error) {
            console.error('Error fetching user APPRM data:', error);
            throw error;
        }
    },

    // Create new APPRM entry
    async createAPPRMData(apprmData) {
        try {
            console.log('📝 Creating APPRM data with:', apprmData);
            console.log('📝 APPRM data fields:', Object.keys(apprmData));
            
            const response = await databases.createDocument(
                DATABASE_ID,
                APPRM_COLLECTION_ID,
                'unique()',
                {
                    ...apprmData,
                    status: apprmData.status || 'pending'
                }
            );
            
            console.log('✅ Created APPRM data response:', response);
            return response;
        } catch (error) {
            console.error('❌ Error creating APPRM data:', error);
            console.error('❌ Error details:', error.message);
            throw error;
        }
    },

    // Update APPRM entry
    async updateAPPRMData(documentId, updates) {
        try {
            const response = await databases.updateDocument(
                DATABASE_ID,
                APPRM_COLLECTION_ID,
                documentId,
                updates
            );
            return response;
        } catch (error) {
            console.error('Error updating APPRM data:', error);
            throw error;
        }
    },

    // Delete APPRM entry
    async deleteAPPRMData(documentId) {
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                APPRM_COLLECTION_ID,
                documentId
            );
            return true;
        } catch (error) {
            console.error('Error deleting APPRM data:', error);
            throw error;
        }
    },

    // Update APPRM status (for admin approval workflow)
    async updateAPPRMStatus(documentId, newStatus, approver = null) {
        try {
            const updateData = {
                status: newStatus
            };
            
            // Add approver info if provided
            if (approver && newStatus === 'approved') {
                updateData.approvedBy = approver;
            }

            console.log('📝 Updating APPRM status with data:', updateData);
            
            const response = await databases.updateDocument(
                DATABASE_ID,
                APPRM_COLLECTION_ID,
                documentId,
                updateData
            );
            
            console.log('✅ APPRM status update response:', response);
            return response;
        } catch (error) {
            console.error('❌ Error updating APPRM status:', error);
            console.error('❌ Error details:', error.message);
            throw error;
        }
    },

    // Get APPRM statistics
    async getAPPRMStatistics() {
        try {
            const [allData, pendingData, approvedData] = await Promise.all([
                this.getAllAPPRMData(),
                this.getAPPRMDataByStatus('pending'),
                this.getAPPRMDataByStatus('approved')
            ]);

            // Calculate country distribution
            const countryDistribution = allData.reduce((acc, item) => {
                acc[item.country] = (acc[item.country] || 0) + 1;
                return acc;
            }, {});

            // Calculate year distribution
            const yearDistribution = allData.reduce((acc, item) => {
                acc[item.Year] = (acc[item.Year] || 0) + 1;
                return acc;
            }, {});

            return {
                totalEntries: allData.length,
                statusCounts: {
                    pending: pendingData.length,
                    approved: approvedData.length
                },
                countryDistribution,
                yearDistribution,
                recentEntries: allData.slice(0, 5)
            };
        } catch (error) {
            console.error('Error getting APPRM statistics:', error);
            throw error;
        }
    },

    // Bulk operations for APPRM data
    async bulkUpdateAPPRMStatus(documentIds, newStatus, approver = null) {
        try {
            const updateData = { status: newStatus };
            if (approver && newStatus === 'approved') {
                updateData.approvedBy = approver;
            }

            const promises = documentIds.map(id => 
                this.updateAPPRMData(id, updateData)
            );
            const results = await Promise.all(promises);
            return results;
        } catch (error) {
            console.error('Error bulk updating APPRM status:', error);
            throw error;
        }
    }
};

export default client;
