# Raiwa Technologies — Complete Setup & Deployment Guide
**Domain:** [https://raiwatechnologies.com](https://raiwatechnologies.com)  
**Document:** `guide_plan.md`  
**Last Updated:** November 2026  

---

## 📌 Architecture Overview

```
User Browser (raiwatechnologies.com)
  ├── 1. Service Pages (/services/:slug) ──> Context-aware WhatsApp button ("Hey! Can I get more info on <service>?")
  ├── 2. WhatsApp Click ──────────────────> POST /api/track-click ──> Supabase (whatsapp_clicks) + Google Sheets
  ├── 3. Contact Form ────────────────────> POST /api/contact     ──> Supabase (contacts) + Google Sheets + email notification
  └── 4. Floating Chatbot (Bottom-Left) ──> POST /api/chat
                                              ├── OpenRouter Cloud API (Vector Embeddings & Cosine Search, >3 chunks)
                                              └── Ollama Cloud API or OpenRouter (Generates personalized response)
```

---

## 🟢 Part 1: OpenRouter Cloud Embeddings Setup

We use OpenRouter's OpenAI-compatible Cloud Embeddings API (`https://openrouter.ai/api/v1/embeddings`) to generate vector representations of all company knowledge files and student web learning resources.

### Step 1.1: Get an OpenRouter API Key
1. Go to [https://openrouter.ai](https://openrouter.ai) and sign up / log in.
2. Navigate to **Keys** (`https://openrouter.ai/keys`) and click **Create Key**.
3. Copy your API key (starts with `sk-or-v1-...`).

### Step 1.2: Generate Vector Embeddings
Run the embedding build script locally using your OpenRouter API key:

**PowerShell (Windows):**
```powershell
$env:OPENROUTER_API_KEY="sk-or-v1-your-openrouter-key-here"
npm run build:knowledge --prefix apps/web
```

**Or pass as an inline CLI flag:**
```powershell
node apps/web/tools/build-knowledge-base.js --key=sk-or-v1-your-openrouter-key-here
```

**What this does:**
- Scans all Markdown source files in `apps/web/knowledge/` (`company-overview.md`, `services-ecommerce.md`, `services-development.md`, `services-marketing.md`, `web-learning-guide.md`, `faq.md`).
- Chunks them into structured sections.
- Sends each chunk to OpenRouter Cloud Embeddings using `openai/text-embedding-3-small`.
- Saves the full vector index to `apps/web/knowledge/knowledge-index.json`.

---

## 🤖 Part 2: AI Chatbot Setup (Ollama Cloud / OpenRouter)

The chatbot (`ChatWidget.jsx`) sits at the bottom-left of the website. It handles:
- **Client inquiries:** Marketplace management, custom web development, mobile apps, pricing/consultation.
- **Student Q&A:** Technical questions about HTML, CSS, JavaScript, React, APIs, full-stack roadmaps.

### Option A: Using Ollama Cloud (Recommended by user)
If you have an Ollama instance hosted in the cloud or on a VPS:
1. Make sure your Ollama instance is accessible via HTTPS.
2. Set the following environment variables in Vercel:
   - `OLLAMA_API_URL`: Your Ollama URL (e.g. `https://ollama.yourdomain.com`).
   - `OLLAMA_MODEL`: The model name (e.g. `llama3.1`, `mistral`, or `qwen2.5`). Defaults to `llama3.1`.
   - `OLLAMA_API_KEY`: (Optional) Bearer token if your cloud endpoint has an auth proxy.

### Option B: Using OpenRouter for Both Embeddings & Chat
If you prefer to use OpenRouter for the LLM chat completions as well:
1. Simply set `OPENROUTER_API_KEY` in Vercel.
2. (Optional) Set `OPENROUTER_CHAT_MODEL` (e.g. `meta-llama/llama-3.1-8b-instruct:free` or `meta-llama/llama-3.1-70b-instruct`).
3. If `OLLAMA_API_URL` is omitted, `/api/chat` automatically routes through OpenRouter!

> [!NOTE]
> **Built-in Fallback:** If both Ollama and OpenRouter are temporarily offline or unconfigured, the chatbot synthesizes a grounded answer directly from the top matched knowledge chunks rather than showing a blank error.

---

## 📊 Part 3: Google Sheets Setup (When Ready)

When you are ready to connect Google Sheets for automatic lead recording:

### Step 3.1: Create the Google Sheet
1. Create a new Google Spreadsheet in Google Drive.
2. Rename the first tab to: `Contact Submissions`
   - Add row 1 header columns:
     `Timestamp | Name | Email | Phone | Company | Service Interested | Preferred Contact | Message`
3. Create a second tab named: `WhatsApp Clicks`
   - Add row 1 header columns:
     `Timestamp | Page URL | Service Context | Click Source`
4. Copy the **Sheet ID** from your browser address bar:
   `https://docs.google.com/spreadsheets/d/`**`<GOOGLE_SHEET_ID>`**`/edit`

### Step 3.2: Create a Google Cloud Service Account
1. Open [Google Cloud Console](https://console.cloud.google.com/).
2. Create a project and enable the **Google Sheets API**.
3. Go to **IAM & Admin > Service Accounts** and click **Create Service Account**.
4. Generate a **JSON Key** for this service account and download it.
5. In your Google Sheet, click **Share** and paste the service account email (with Editor permission).

### Step 3.3: Set Environment Variables
In Vercel:
- `GOOGLE_SHEET_ID`: Your sheet ID from Step 3.1.
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: `your-service-account@project.iam.gserviceaccount.com`
- `GOOGLE_SERVICE_ACCOUNT_KEY`: The `private_key` field from the downloaded JSON file (keep the `-----BEGIN PRIVATE KEY-----` lines).

---

## 🗄️ Part 4: Supabase Setup

The database schema is maintained in [`supabase/migrations`](./supabase/migrations). The migration creates `contacts` and `whatsapp_clicks` tables with server-only write access; the Supabase service-role key must never be exposed to the browser.

1. Create a Supabase project and copy its project URL and service-role key from **Project Settings → API**.
2. Apply the migration using the Supabase CLI:
   ```powershell
   npx supabase login
   npx supabase link --project-ref YOUR_PROJECT_REF
   npx supabase db push
   ```
   Alternatively, run the SQL in the migration file in the Supabase SQL Editor.
3. Configure `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` for the Vercel serverless functions. For local development, put them in `apps/api/.env`.
4. The Supabase Dashboard / Table Editor replaces the PocketBase admin UI. Data is intentionally not exposed through a public contacts-list API.

Contact email notifications use Resend. Set `RESEND_API_KEY` and a verified `CONTACT_NOTIFICATION_FROM` sender to enable them. The notification is best-effort and does not undo a successful database write.

PocketBase's Hostinger-specific preview-to-live promotion, external admin shell, builder mailer, and log-forwarder hooks were removed; they have no direct Supabase equivalent. Use separate Supabase projects and normal versioned SQL migrations for schema changes, Supabase Studio for administration, the Supabase log explorer/log drains for logs, and the Supabase project's Auth SMTP configuration for auth emails. Existing PocketBase local data was removed as requested and was not transferred.

---

## 🚀 Part 5: Complete Vercel Environment Variables Checklist

Go to **Vercel Dashboard > Project Settings > Environment Variables** and add the following:

| Variable Name | Required | Description | Example |
|---|---|---|---|
| `OPENROUTER_API_KEY` | **Yes** (for vector RAG) | OpenRouter API Key for Cloud Embeddings | `sk-or-v1-...` |
| `OPENROUTER_EMBEDDING_MODEL` | No | Embedding model name | `openai/text-embedding-3-small` (default) |
| `OLLAMA_API_URL` | Optional | Cloud Ollama endpoint URL | `https://ollama.yourdomain.com` |
| `OLLAMA_MODEL` | Optional | Ollama model name | `llama3.1` (default) |
| `OLLAMA_API_KEY` | Optional | Auth token for cloud Ollama | `your-secret-token` |
| `GOOGLE_SHEET_ID` | Optional | ID of Google Sheet for lead sync | `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms` |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Optional | Service account email | `sheets-sync@app.iam.gserviceaccount.com` |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | Optional | Service account private key PEM | `-----BEGIN PRIVATE KEY-----\n...` |
| `SUPABASE_URL` | **Yes** | Supabase project URL | `https://your-project.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | **Yes** | Server-only Supabase service-role secret; never use in browser code | `your-service-role-key` |
| `RESEND_API_KEY` | Optional | Send contact-submission notifications | `re_...` |
| `CONTACT_NOTIFICATION_FROM` | Optional | Verified Resend sender address | `Raiwa Technologies <no-reply@yourdomain.com>` |

---

## 🧪 Part 6: How to Test Locally

1. Add `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and (optionally) the email and Google Sheets variables to `apps/api/.env`.
2. **Start the local website and API:**
   ```powershell
   npm run dev
   ```
3. **Test Context-Aware WhatsApp:**
   - Open `http://localhost:3000/services/digital-marketing`
   - Click the WhatsApp button in the hero or the bottom-right floating button.
   - Verify WhatsApp opens with: `"Hey! Can I get more info on Digital Marketing?"`
4. **Test Chatbot:**
   - Click the **Ask AI & Q/A** floating button at the bottom-left.
   - Ask a company question: *"What services do you offer for Amazon sellers?"*
   - Ask a student web question: *"What is the difference between React and vanilla JavaScript?"*
   - Verify it responds with accurate company details and web guidance.
5. **Deploy to Vercel:**
   ```powershell
   git add .
   git commit -m "feat: context-aware whatsapp, openrouter embeddings, and ai chatbot"
   git push origin main
   ```
   Vercel will automatically build and deploy the update to [raiwatechnologies.com](https://raiwatechnologies.com).
