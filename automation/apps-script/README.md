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

# CRM reset, Today tab and Dashboard (`crm-reset.gs`)

Add it as a second file in the same Apps Script project, then run **resetCrmWithSampleData** once:

1. Saves a full backup copy of the Sheet in your Google Drive.
2. Clears the rows of Leads, Log, Errors and Inbox (headers stay).
3. Adds 52 sample leads over the last 4 weeks (`is_simulated` = TRUE). Their emails are the agency Gmail with `+sim01`...`+sim52`, so any follow-up email lands in the agency inbox.
4. Builds the **Today** tab (leads due today, overdue or needing review) and the **Dashboard** tab (KPIs, source, tier, pipeline, weekly trend, form completion, 4 charts). Both update live from the Leads tab.

Afterwards, in Make: **Data stores → Idea leads index → delete all records**, so old test phones are not treated as duplicates.

To rebuild only Today and Dashboard (no data change), run **buildCrmViews**.

## Working in the Today tab

Today lists the leads to contact: due today, overdue, or Needs review. Each row has an **Open WhatsApp** link.
Edit the yellow columns (status dropdown, next_action, next_action_date, owner) right there: the cell turns
green and the change is saved in the Leads tab. The list refreshes when the Sheet opens, or from the menu
**IDEA CRM > Refresh Today**.
