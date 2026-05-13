# Email Service Setup Guide

To enable the contact form email functionality, you must configure your Resend API key in Google AI Studio.

## 1. Get your Resend API Key
1. Go to [resend.com](https://resend.com) and sign up/log in.
2. Go to the **API Keys** section and create a new key.
3. **Important (Sandbox Mode):** If you haven't added a custom domain, you are in sandbox mode. You can ONLY send emails to the email address you used to sign up for Resend. Ensure the `to` field in `server.ts` matches this email.

## 2. Add the key to AI Studio
1. Click the **Settings** gear icon in the top right of the Google AI Studio interface.
2. Go to **Application Settings**.
3. Under **Environment Variables**, click **Add Variable**.
4. Set the **Key** to `RESEND_API_KEY`.
5. Set the **Value** to your Resend API key (e.g., `re_abc123...`).
6. Click **Save**.

## 3. Deployment
When you deploy this app to a platform like Vercel, Netlify, or Cloud Run, you must also add `RESEND_API_KEY` to that platform's environment variable settings.

## Troubleshooting
- **"validation_error"**: This usually means the `from` address is invalid or you are trying to send to someone else while in Resend's free sandbox. In sandbox mode, you can ONLY send to your registered email.
- **"Configuration Error"**: This means the environment variable was not found. Restart the dev server or check the Application Settings.
