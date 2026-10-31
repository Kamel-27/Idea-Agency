# 08 Testing report

Deliverable 5 and 6 evidence: the scenarios we ran against the live system, what happened, what broke, and how we fixed it.

**System under test:** live website `https://idea-agency.vercel.app` (English and Arabic), Make.com Flow A (lead capture) and Flow B (follow-ups), Gemini, Google Sheets CRM, Gmail.

**How we tested:** each scenario is a JSON lead in `automation/test-leads/`, sent to the Make webhook with `node automation/scripts/send-test-lead.mjs`, exactly like the website form sends it. Test leads are marked `is_simulated = TRUE`. Real form submissions were also made on the live site.

Screenshots for each test (Make run, CRM row, email) are in Drive, folder 5.

## Results

| # | Scenario | Expected | Result | Status |
| --- | --- | --- | --- | --- |
| 1 | Hot owner, over 20,000 EGP, this month | Hot, reply email, team alert, Contacted | Rating 9, score 99, Hot, IDEA-0001, reply and alert sent | ✅ Pass |
| 2 | Cold student, no budget | Cold, reply email, no alert | Sent Oct 23. Confirm with screenshot | ⏳ |
| 3 | Warm marketing manager, LinkedIn | Warm, `utm_source` linkedin | Sent Oct 23. Confirm with screenshot | ⏳ |
| 4 | Same phone sends again | No new row, Log row with new answers, team email | Worked as expected | ✅ Pass |
| 5 | Invalid phone `12345` | Website blocks it | Form shows "Enter an Egyptian mobile number" and does not submit | ✅ Pass |
| 6 | Arabic page, Arabic challenge | Hot, reply in Egyptian Arabic, right to left | Sent Oct 23. Confirm with screenshot | ⏳ |
| 7 | English challenge | Warm, reply in English | Sent Oct 23. Confirm with screenshot | ⏳ |
| 8 | Spam text | `is_spam`, no email, Needs review | Sent Oct 23. Confirm with screenshot | ⏳ |
| 9 | No WhatsApp opt-in | Email only, `wa_link` "No opt-in" | Sent Oct 23. Confirm with screenshot | ⏳ |
| 10 | Gemini fails | Errors tab row, "AI failed" email to the team | Happened live: Errors row + team email, lead safe | ✅ Pass |
| 11 | No UTM tags | `utm_source` direct | Sent Oct 23. Confirm with screenshot | ⏳ |
| 12 | Lead replies (status Engaged) | Flow B skips the lead | Run with Flow B | ⏳ |
| 13 | Real form on the live site | Lead in CRM, reply email | Form submitted on localhost and on Vercel, reply received | ✅ Pass |
| 14 | Flow B Day 2 follow-up | Email sent, touch_count 2, Log row | Run with Flow B | ⏳ |

## Errors found and fixes

| Problem found during testing | Cause | Fix |
| --- | --- | --- |
| Filter used the whole module instead of one field | Picked `[bundle]` in the mapping panel | Picked the `Exists` field itself |
| Phone lost its `+` in the CRM | Google Sheets read `+2010...` as a number | Wrote `'{{phone}}`, the apostrophe keeps it as text |
| Dates showed as numbers (46316.28) | Column format | Set the date columns to Date time |
| Test leads rated 2 of 10 by Gemini | Names contained "Test", and the prompt rates tests 0 to 2 | Renamed test leads to realistic names |
| Gemini slow (over 4,000 thinking tokens) | Default thinking level | Thinking Level: Low |
| Every Gemini call failed after adding a Response Schema | The schema format was rejected | Removed the schema, kept JSON Output. The error route caught every failure, so no lead was lost |
| Live form sent leads, but nothing arrived | Scenario was inactive at first | Activated the scenario, "immediately as data arrives" |
| Alert emails went to spam | Brand new Gmail account | Marked as not spam. Long term: own domain email |
| Mobile language-switch screen did not cover the page | The blurred header trapped the fixed overlay | Rendered the overlay at page level (React portal) |

## Improvement notes

1. **Own domain email** (`hello@...`) to stop replies landing in spam.
2. **WhatsApp Business API** to send the follow-ups automatically instead of a click-to-chat link.
3. **Booking link** (Cal.com) in the emails, with a webhook that sets status to Diagnostic Booked.
4. **GTM, GA4 and Meta Pixel** installed with a consent banner, so ad performance appears next to CRM data.
5. **Daily lead summary** email for Warm and Cold leads, so the team sees every lead without opening the sheet.
