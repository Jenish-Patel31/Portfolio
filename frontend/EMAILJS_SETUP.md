# EmailJS Setup Guide

This guide will help you set up EmailJS to send contact form emails directly to your Gmail address (jenishkp07@gmail.com).

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** as your email service
4. Connect your Gmail account (jenishkp07@gmail.com)
5. Note down the **Service ID** (it will look like `service_xxxxxxx`)

## Step 3: Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template content:

**Subject:**
```
New Contact Form Message: {{subject}}
```

**Content:**
```
You have received a new message from your portfolio contact form.

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Reply directly to this email to respond to {{from_name}}.
```

4. Save the template and note down the **Template ID** (it will look like `template_xxxxxxx`)

## Step 4: Get Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (it will look like a long string of characters)
3. Copy this key

## Step 5: Update Configuration

1. Open `frontend/src/config/emailjs.js`
2. Replace the placeholder values:

```javascript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_service_id_here',        // From Step 2
  TEMPLATE_ID: 'your_template_id_here',      // From Step 3
  PUBLIC_KEY: 'your_public_key_here',        // From Step 4
  TO_EMAIL: 'jenishkp07@gmail.com'           // Already set correctly
};
```


## Step 6: Test the Contact Form

1. Start your development server
2. Go to the contact section
3. Fill out and submit the form
4. Check your Gmail inbox for the message

## Important Notes

- **Free Plan Limits**: EmailJS free plan allows 200 emails/month
- **Security**: The public key is safe to use in frontend code
- **Spam Protection**: EmailJS has built-in spam protection
- **Delivery**: Emails are delivered directly to your Gmail inbox

## Troubleshooting

If emails aren't being delivered:

1. Check your EmailJS dashboard for error logs
2. Verify all IDs and keys are correct
3. Make sure your Gmail account is properly connected
4. Check your spam folder
5. Ensure you haven't exceeded the free plan limits

## Alternative: Backend Solution

If you prefer a backend solution, you can:
1. Create an API endpoint in your backend
2. Use Nodemailer with Gmail SMTP
3. Update the contact form to call your API instead

This would require more setup but gives you full control over email delivery.
