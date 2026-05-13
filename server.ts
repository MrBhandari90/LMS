import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

// Lazy initialization of Resend client to avoid crashing on startup if key is missing
let resendClient: Resend | null = null;
let lastTriedKey: string | null = null;

function getResendClient() {
  const key = process.env.RESEND_API_KEY?.trim();
  
  if (!key) {
    console.warn("[RESEND] API key is undefined or empty string.");
    return null;
  }

  // If the key in env changed, or we haven't initialized yet
  if (!resendClient || key !== lastTriedKey) {
    console.log(`[RESEND] Initializing client with key (length: ${key.length})`);
    resendClient = new Resend(key);
    lastTriedKey = key;
  }
  
  return resendClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.post("/api/contact", async (req, res) => {
    let { name, email, subject, message } = req.body;

    // Basic Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields except subject are required." });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Please provide a valid email address." });
    }

    // Basic sanitization
    const sanitize = (str: string) => str.replace(/[&<>"']/g, (m) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m] || m));

    const sName = sanitize(name);
    const sEmail = sanitize(email);
    const sSubject = sanitize(subject || 'No Subject');
    const sMessage = sanitize(message);
    const timestamp = new Date().toISOString();

    const client = getResendClient();
    if (!client) {
      console.error("[CRITICAL] RESEND_API_KEY is not defined in process.env.");
      return res.status(500).json({ 
        error: "Email service is not configured. Please add RESEND_API_KEY in the 'Application Settings' -> 'Environment Variables' menu of AI Studio.",
        code: "MISSING_KEY"
      });
    }

    try {
      console.log(`[RESEND] Attempting dispatch: From onboarding@resend.dev TO mrbhandari329@gmail.com`);
      
      const { data, error } = await client.emails.send({
        from: 'onboarding@resend.dev', // Must be exactly this for Resend sandbox
        to: 'mrbhandari329@gmail.com', // In sandbox, this must be YOUR registered email
        replyTo: email,
        subject: `[Portfolio Inquiry] ${sSubject.substring(0, 80)}`,
        text: `Sender: ${name}\nEmail: ${email}\nTime: ${timestamp}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: sans-serif; padding: 24px; color: #1a2e1a; background: #fdfefd; border: 1px solid #e5ede5; border-radius: 12px;">
            <h2 style="color: #4a6741; margin-top: 0;">New Contact Form Submission</h2>
            <p><strong>From:</strong> ${sName} (<a href="mailto:${sEmail}">${sEmail}</a>)</p>
            <p><strong>Subject:</strong> ${sSubject}</p>
            <p><strong>Date:</strong> ${timestamp}</p>
            <hr style="border: none; border-top: 1px solid #e5ede5; margin: 20px 0;" />
            <div style="white-space: pre-wrap; line-height: 1.6;">${sMessage}</div>
          </div>
        `,
      });

      if (error) {
        console.error("[RESEND ERROR]", JSON.stringify(error, null, 2));
        
        let customMessage = error.message;
        if (error.name === 'validation_error') {
          customMessage = `Resend Validation Error: ${error.message}. Hint: Ensure 'mrbhandari329@gmail.com' is your verified Resend account email if using the sandbox.`;
        }

        return res.status(400).json({ 
          error: customMessage,
          name: error.name,
          details: error 
        });
      }

      console.log("Email sent successfully:", data?.id);
      res.status(200).json({ status: "ok", data });
    } catch (err: any) {
      console.error("Server exception during email dispatch:", err);
      res.status(500).json({ 
        error: "Internal server error during email dispatch.",
        message: err?.message,
        stack: process.env.NODE_ENV === 'development' ? err?.stack : undefined
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
