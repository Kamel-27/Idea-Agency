# Test scenarios for Flow A

The 12 test scenarios from `docs/03-system-spec.md`. Each JSON file is exactly what the website sends to Make, with `is_simulated: true`.

Send one:

```bash
node automation/scripts/send-test-lead.mjs automation/test-leads/01-hot-owner-high-spend.json
```

Send all, 3 seconds apart:

```bash
node automation/scripts/send-test-lead.mjs all
```

Run them in order: test 04 (duplicate) needs test 01 to exist first.

## Expected results

Rule score = spend + timeline + role + team size (max 90). The total adds Gemini's rating (0 to 10), so totals below show the rule score plus a likely rating.

| # | File | What it tests | Rule score | Expected result |
| --- | --- | --- | --- | --- |
| 1 | `01-hot-owner-high-spend` | Owner, over 20,000 EGP, this month | 90 | **Hot** (about 97). Email reply, team alert, status Contacted |
| 2 | `02-cold-student-no-budget` | Student, no budget, exploring | 15 | **Cold**. Email reply, no alert |
| 3 | `03-warm-marketing-manager` | Manager, under 5,000 EGP, LinkedIn source | 55 | **Warm** (about 62). Email reply, `utm_source` = linkedin |
| 4 | `04-duplicate-phone` | Same phone as test 1 | none | No new row. Test 1's row says "Submitted the form again". Log row `duplicate` |
| 5 | `05-invalid-phone` | Phone `12345` | none | The **website** blocks it with an error message (test it on the form). Sent straight to Make, it shows how Make handles bad data: note what happens |
| 6 | `06-arabic-challenge` | Arabic page and Arabic challenge | 85 | **Hot**. Email in Egyptian Arabic, right-to-left |
| 7 | `07-english-challenge` | English challenge | 60 | **Warm** (about 67). Email in English |
| 8 | `08-spam-text` | Nonsense text | 15 | `is_spam` true, rating 0 to 2. **No email**, status Needs review |
| 9 | `09-no-whatsapp-opt-in` | Opt-in box not ticked | 75 | Email only. `wa_link` says "No opt-in: email only" |
| 10 | `10-ai-failure` | Gemini fails | 75 | First break the Gemini key in Make on purpose. Template email still goes out, Errors tab gets a row, status Needs review. Fix the key after |
| 11 | `11-no-utm-direct` | No UTM tags | 75 | `utm_source` = direct, `utm_medium` = none |
| 12 | (manual) | Lead replies | none | In the sheet, change a lead's status to `Engaged`. Flow B must skip it on its next run |

## For the testing report

For each test, save a screenshot of: the Make run (green), the CRM row, and the email or alert. Write the result (pass or fail, and why) in the testing report.

## Cleaning up

Test rows have `is_simulated = TRUE`. Filter them out in Looker Studio, or delete them before launch. Also delete their phone numbers from the `Idea leads index` Data store, or real leads with the same number will look like duplicates.
