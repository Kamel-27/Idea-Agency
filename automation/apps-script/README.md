# Lead Inbox (Google Apps Script)

A free backup for leads, inside the CRM Sheet. The website sends every lead here **and** to Make:

- **Step 1** (name, WhatsApp, business) is saved when the visitor clicks Next, as `partial`. The visitor sees nothing. It costs no Make operations.
- **Every complete lead** is saved as `complete`, even when Make is down or out of operations.

Every hour, `checkInbox` emails the team about:

- complete leads that are **not in the Leads tab** after 1 hour (Make did not process them)
- visitors who **filled step 1 but did not finish** within 2 hours (call them: you have their WhatsApp number)

Each row is reported once (column `alerted`).

## Setup (10 minutes)

1. Open the **Idea Agency CRM** Sheet → **Extensions → Apps Script**.
2. Delete the sample code, paste all of `inbox.gs`, and click **Save**.
3. **Project Settings** (gear icon) → **Script Properties** → add two:
   - `INBOX_SECRET`: a long random password you make up (letters and numbers, 30+ characters)
   - `TEAM_EMAIL`: the email that gets the alerts
4. Back in the editor, choose the function **setup** at the top and click **Run**. Google asks for permission: allow it. This creates the `Inbox` tab and the hourly check.
5. **Deploy → New deployment** → type **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**

   Click **Deploy** and copy the **Web app URL** (ends with `/exec`).
6. In **Vercel → Project → Settings → Environment Variables**, add:
   - `INBOX_URL` = the Web app URL
   - `INBOX_SECRET` = the same password as step 3

   Then **Redeploy** the site.

"Anyone" only means the website can reach it without a Google login. The script refuses any request without the secret, and the secret never reaches the browser (the website sends it from the server).

## Test

Open the landing page, fill step 1 and click Next. Within a few seconds a `partial` row appears in the `Inbox` tab.

## If you change the code later

Save, then **Deploy → Manage deployments → Edit → Version: New version → Deploy**. The URL stays the same.
