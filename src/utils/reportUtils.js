import { reportsAPI } from '../lib/appwrite';

// Email notification function
const sendAdminNotification = async (reportData, user) => {
  try {
    // For now, we'll use a simple email service or webhook
    // You can replace this with your preferred email service (SendGrid, Mailgun, etc.)
    
    const notificationData = {
      type: 'new_report_submission',
      reportDetails: {
        strategicResultArea: reportData.strategicResultArea,
        subStrategicResultArea: reportData.subStrategicResultArea,
        interventionCountry: reportData.interventionCountry,
        year: reportData.year,
        submittedBy: user?.fullName || user?.username || user?.email || 'Anonymous User',
        submittedAt: new Date().toISOString()
      },
             adminEmails: [
        'yonas.mersha14@gmail.com',
        'yonas.yigezu@un.org',
      ],
      dashboardUrl: window.location.origin + '/data-management'
    };

    // Option 1: Use a webhook to send email (recommended for production)
    // await fetch('/api/send-notification', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(notificationData)
    // });

    // Option 2: Use Appwrite Functions (if available)
    // await functions.createExecution('send-notification', JSON.stringify(notificationData));

    // Option 3: Use EmailJS for client-side email sending (simple solution)
    // Send to each admin email
    const emailPromises = notificationData.adminEmails.map(async (adminEmail) => {
      try {
        await sendEmailNotification({ ...notificationData, adminEmail });
        console.log(`✅ Email sent to: ${adminEmail}`);
        return { email: adminEmail, success: true };
      } catch (error) {
        console.error(`❌ Failed to send email to ${adminEmail}:`, error.message);
        return { email: adminEmail, success: false, error: error.message };
      }
    });
    
    const results = await Promise.all(emailPromises);
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    console.log(`📧 Email Results: ${successful} successful, ${failed} failed out of ${notificationData.adminEmails.length} total admin(s)`);
    
    if (failed > 0) {
      const failedEmails = results.filter(r => !r.success).map(r => r.email);
      console.warn(`⚠️ Failed to send emails to: ${failedEmails.join(', ')}`);
    }
  } catch (error) {
    console.error('❌ Failed to send admin notification:', error);
    // Don't throw error - report submission should succeed even if notification fails
  }
};

// EmailJS implementation (simple client-side solution)
const sendEmailNotification = async (notificationData) => {
  try {
    // EmailJS Configuration - UPDATE THESE VALUES:
    const emailjsConfig = {
      serviceId: 'service_2e3pbqx', // ✅ EmailJS Service ID
      templateId: 'template_xwg784v', // ✅ EmailJS Template ID (Working)
      publicKey: 'sCf0lxIhgQjrHLsAj' // ✅ EmailJS Public Key
    };

    // Check if EmailJS is configured
    if (emailjsConfig.serviceId.includes('acs_reports') || 
        emailjsConfig.templateId.includes('new_report') || 
        emailjsConfig.publicKey.includes('your_emailjs')) {
      
      // Not configured yet - just log
      console.log('📧 EmailJS not configured yet. Email notification preview:', {
        to: notificationData.adminEmail,
        subject: 'New Report Submitted for Approval',
        data: {
          report_area: notificationData.reportDetails.strategicResultArea,
          report_country: notificationData.reportDetails.interventionCountry,
          report_year: notificationData.reportDetails.year,
          submitted_by: notificationData.reportDetails.submittedBy,
          dashboard_url: notificationData.dashboardUrl
        }
      });
      
      console.log('ℹ️ To enable emails: Update emailjsConfig in src/utils/reportUtils.js with your EmailJS credentials');
      return;
    }

    // Send actual email using EmailJS
    console.log('📧 Attempting to send email with EmailJS...');
    console.log('🔧 Service ID:', emailjsConfig.serviceId);
    console.log('🔧 Template ID:', emailjsConfig.templateId);
    console.log('🔧 Public Key:', emailjsConfig.publicKey.substring(0, 5) + '...');
    console.log('📧 Sending to:', notificationData.adminEmail);
    
    const { default: emailjs } = await import('@emailjs/browser');
    
    const emailParams = {
      to_email: notificationData.adminEmail,
      report_area: notificationData.reportDetails.strategicResultArea,
      report_country: notificationData.reportDetails.interventionCountry,
      report_year: notificationData.reportDetails.year,
      submitted_by: notificationData.reportDetails.submittedBy,
      submission_date: new Date(notificationData.reportDetails.submittedAt).toLocaleDateString(),
      dashboard_url: notificationData.dashboardUrl
    };
    
    console.log('📝 Email parameters:', emailParams);
    console.log('📧 Sending email TO:', emailParams.to_email);
    
    const response = await emailjs.send(
      emailjsConfig.serviceId,
      emailjsConfig.templateId,
      emailParams,
      emailjsConfig.publicKey
    );

    console.log('✅ Email sent successfully via EmailJS');
    console.log('📧 EmailJS Response:', response);

  } catch (error) {
    console.error('❌ Failed to send email notification:', error);
    throw error;
  }
};
// Search and filter utilities for reports
export const searchReports = (reports, searchTerm) => {
  if (!searchTerm) return reports;
  
  const searchTermLower = searchTerm.toLowerCase();
  return reports.filter(report => {
    // Search through all string and number fields
    const searchableFields = [
      report.title,
      report.description,
      report.strategicResultArea,
      report.subStrategicResultArea,
      report.interventionCountry,
      ...(Array.isArray(report.partnerships) ? report.partnerships : [report.partnerships]),
      report.status,
      report.projectId?.toString(),
      report.budget?.toString(),
    ].filter(Boolean); // Remove null/undefined values

    return searchableFields.some(field => 
      field.toLowerCase().includes(searchTermLower)
    );
  });
};

export const filterReportsByDate = (reports, startDate, endDate) => {
  if (!startDate && !endDate) return reports;

  return reports.filter(report => {
    const reportDate = new Date(report.date);
    if (startDate && endDate) {
      return reportDate >= new Date(startDate) && reportDate <= new Date(endDate);
    } else if (startDate) {
      return reportDate >= new Date(startDate);
    } else {
      return reportDate <= new Date(endDate);
    }
  });
};

export const applyAdvancedFilters = (reports, filters) => {
  if (!filters || !filters.length) return reports;

  return reports.filter(report => {
    return filters.some(filterGroup => {
      // Each filter group is combined with AND logic internally
      return filterGroup.every(condition => {
        const { field, operator, value } = condition;
        const reportValue = report[field];

        switch (operator) {
          case 'equals':
            return reportValue === value;
          case 'contains':
            return String(reportValue).toLowerCase().includes(String(value).toLowerCase());
          case 'greaterThan':
            return Number(reportValue) > Number(value);
          case 'lessThan':
            return Number(reportValue) < Number(value);
          case 'between':
            const [min, max] = value;
            return Number(reportValue) >= Number(min) && Number(reportValue) <= Number(max);
          case 'in':
            return Array.isArray(value) ? value.includes(reportValue) : false;
          default:
            return true;
        }
      });
    });
  });
};

// Local storage key for saved filter presets
const FILTER_PRESETS_KEY = 'reportFilterPresets';

export const saveFilterPreset = (preset) => {
  const existingPresets = JSON.parse(localStorage.getItem(FILTER_PRESETS_KEY) || '[]');
  const updatedPresets = [...existingPresets, { ...preset, id: Date.now() }];
  localStorage.setItem(FILTER_PRESETS_KEY, JSON.stringify(updatedPresets));
  return updatedPresets;
};

export const getFilterPresets = () => {
  return JSON.parse(localStorage.getItem(FILTER_PRESETS_KEY) || '[]');
};

export const deleteFilterPreset = (presetId) => {
  const existingPresets = JSON.parse(localStorage.getItem(FILTER_PRESETS_KEY) || '[]');
  const updatedPresets = existingPresets.filter(preset => preset.id !== presetId);
  localStorage.setItem(FILTER_PRESETS_KEY, JSON.stringify(updatedPresets));
  return updatedPresets;
}; 

export const submitReportData = async (reportData, user) => {
  try {
    const now = new Date().toISOString();
    
    // Get current reports to determine next reportIndex
    const existingReports = await reportsAPI.getAllReports();
    const maxIndex = existingReports.reduce((max, report) => 
      Math.max(max, report.reportIndex || 0), 0
    );
    const nextIndex = maxIndex + 1;
    
    const report = {
      ...reportData,
      status: 'pending_approval',
      createdBy: user?.$id || 'system', // Required field - use 'system' to match migration
      approvedBy: 'system', // Required field - use 'system' to match migration
      reportIndex: nextIndex, // Add sequential index
      // Ensure year is an integer
      year: parseInt(reportData.year) || new Date().getFullYear(),
      // Ensure partnerships is an array
      partnerships: Array.isArray(reportData.partnerships) 
        ? reportData.partnerships 
        : (reportData.partnerships ? [reportData.partnerships] : []),
      // Ensure details is an array
      details: Array.isArray(reportData.details) 
        ? reportData.details 
        : (reportData.details ? [reportData.details] : [])
    };
    
    console.log('📝 Submitting report data:', report);
    console.log('📝 Report fields:', Object.keys(report));
    
    const createdReport = await reportsAPI.createReport(report);
    
    // Send notification to admin about new report submission
    await sendAdminNotification(reportData, user);
    
    return createdReport;
  } catch (error) {
    console.error('Error submitting report data:', error);
    throw error;
  }
};