# 🚀 Quick EmailJS Setup (5 Minutes)

## ✅ Step 1: Create EmailJS Account

1. **Go to https://www.emailjs.com/**
2. **Click "Sign Up"** (it's free - 200 emails/month)
3. **Verify your email**

## ✅ Step 2: Add Email Service

1. **Click "Add New Service"**
2. **Choose "Gmail"** (easiest option)
3. **Click "Connect Account"** and sign in with your Gmail
4. **Copy the Service ID** (looks like `service_xxxxxxx`)

## ✅ Step 3: Create Email Template

1. **Click "Create New Template"**
2. **Set Subject**: `📋 New Report Submitted for Approval`
3. **Set Content**:
```
Hello Admin,

A new report has been submitted and requires your approval:

Strategic Result Area: {{report_area}}
Country: {{report_country}}
Year: {{report_year}}
Submitted by: {{submitted_by}}

Please review and approve at: {{dashboard_url}}

Best regards,
ACS Reporting System
```
4. **Save template** and **copy the Template ID** (looks like `template_xxxxxxx`)

## ✅ Step 4: Get Public Key

1. **Click "Account" in the left menu**
2. **Go to "General" tab**
3. **Copy the Public Key** (looks like `xxxxxxxxxxxxxxx`)

## ✅ Step 5: Update Code (Final Step)

Open `src/utils/reportUtils.js` and update these 3 lines:

```javascript
const emailjsConfig = {
  serviceId: 'service_xxxxxxx',     // 🔧 Paste your Service ID here
  templateId: 'template_xxxxxxx',   // 🔧 Paste your Template ID here  
  publicKey: 'xxxxxxxxxxxxxxx'      // 🔧 Paste your Public Key here
};
```

Also update the admin email:
```javascript
adminEmail: 'your-email@gmail.com', // 🔧 Replace with your email
```

## ✅ Step 6: Test

1. **Submit a test report**
2. **Check your email inbox**
3. **Check browser console** for success/error messages

## 🎯 That's it! 

Your admin will now receive email notifications whenever a new report is submitted.

## 📋 Template Variables Available

- `{{report_area}}` - Strategic Result Area
- `{{report_country}}` - Intervention Country  
- `{{report_year}}` - Year
- `{{submitted_by}}` - Submitter name
- `{{dashboard_url}}` - Link to Data Management

## 🔧 Troubleshooting

- **No email received**: Check spam folder
- **Template error**: Verify template variables match exactly
- **Service error**: Ensure Gmail account is connected properly

## 💡 Pro Tips

- **Test first**: Use your own email for testing
- **Multiple admins**: You can send to multiple emails
- **Custom styling**: EmailJS supports HTML templates
- **Rate limits**: Free plan allows 200 emails/month 