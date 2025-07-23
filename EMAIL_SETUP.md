# Email Notification Setup Guide

This guide explains how to set up email notifications for admin alerts when new reports are submitted.

## Current Implementation

The system includes both **email notifications** and **in-app notifications** for admins:

### 1. In-App Notifications (✅ Already Working)
- **Notification bell** in the header for admins
- **Real-time updates** every 30 seconds
- **Pending report count** with animated badge
- **Quick preview** of pending reports
- **Direct link** to Data Management panel

### 2. Email Notifications (📧 Setup Required)

## Email Setup Options

### Option A: EmailJS (Recommended for Simple Setup)

1. **Create EmailJS Account**
   ```
   1. Go to https://www.emailjs.com/
   2. Sign up for free account
   3. Create a new service (Gmail, Outlook, etc.)
   4. Create an email template
   5. Get your Service ID, Template ID, and Public Key
   ```

2. **Install EmailJS**
   ```bash
   npm install @emailjs/browser
   ```

3. **Update Configuration**
   ```javascript
   // In src/utils/reportUtils.js, update emailjsConfig:
   const emailjsConfig = {
     serviceId: 'your_service_id',     // From EmailJS dashboard
     templateId: 'your_template_id',   // From EmailJS dashboard  
     publicKey: 'your_public_key'      // From EmailJS dashboard
   };
   ```

4. **Enable Email Sending**
   ```javascript
   // In src/utils/reportUtils.js, uncomment the EmailJS code:
   const { default: emailjs } = await import('@emailjs/browser');
   await emailjs.send(/* ... EmailJS parameters ... */);
   ```

### Option B: Backend API (Recommended for Production)

1. **Create API Endpoint**
   ```javascript
   // Create /api/send-notification endpoint
   app.post('/api/send-notification', async (req, res) => {
     const { reportDetails, adminEmail } = req.body;
     
     // Use your preferred email service:
     // - SendGrid
     // - Mailgun  
     // - AWS SES
     // - Nodemailer with SMTP
     
     await sendEmail({
       to: adminEmail,
       subject: 'New Report Submitted for Approval',
       html: createEmailTemplate(reportDetails)
     });
     
     res.json({ success: true });
   });
   ```

2. **Enable Webhook**
   ```javascript
   // In src/utils/reportUtils.js, uncomment:
   await fetch('/api/send-notification', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(notificationData)
   });
   ```

### Option C: Appwrite Functions

1. **Create Appwrite Function**
   ```javascript
   // Deploy function to Appwrite
   export default async ({ req, res }) => {
     const { reportDetails, adminEmail } = JSON.parse(req.body);
     
     // Send email using preferred service
     await sendNotificationEmail(reportDetails, adminEmail);
     
     return res.json({ success: true });
   };
   ```

2. **Enable Function Call**
   ```javascript
   // In src/utils/reportUtils.js, uncomment:
   await functions.createExecution('send-notification', JSON.stringify(notificationData));
   ```

## Email Template Example

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        .email-container { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; }
        .header { background-color: #3b82f6; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9fafb; }
        .report-details { background-color: white; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .button { background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>📋 New Report Submitted</h1>
        </div>
        <div class="content">
            <p>A new report has been submitted and requires your approval:</p>
            
            <div class="report-details">
                <h3>Report Details</h3>
                <p><strong>Strategic Result Area:</strong> {{strategicResultArea}}</p>
                <p><strong>Country:</strong> {{interventionCountry}}</p>
                <p><strong>Year:</strong> {{year}}</p>
                <p><strong>Submitted by:</strong> {{submittedBy}}</p>
                <p><strong>Submitted at:</strong> {{submittedAt}}</p>
            </div>
            
            <p>
                <a href="{{dashboardUrl}}" class="button">Review & Approve Report</a>
            </p>
        </div>
    </div>
</body>
</html>
```

## Configuration

Update the admin email in `src/utils/reportUtils.js`:
```javascript
adminEmail: 'your-admin-email@domain.com', // Replace with actual admin email
```

## Testing

1. **Submit a test report** as a regular user
2. **Check console logs** for notification details
3. **Verify in-app notification** appears for admin
4. **Test email delivery** (if configured)

## Production Checklist

- [ ] Choose email service (EmailJS, SendGrid, etc.)
- [ ] Set up email templates
- [ ] Configure environment variables
- [ ] Test email delivery
- [ ] Set up proper error handling
- [ ] Configure email rate limiting
- [ ] Add email unsubscribe options (if required)

## Troubleshooting

- **In-app notifications not working**: Check admin role and authentication
- **Email not sending**: Verify email service configuration and API keys
- **Template not rendering**: Check template variables and HTML syntax 