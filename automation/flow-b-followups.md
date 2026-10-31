# Flow B: follow-ups (as built)

Runs **every day at 10:00**. It finds leads who got the first reply from Flow A but have not answered, and sends the next email. Built and tested on Oct 31, 2026.

```
[1] Google Sheets: Search Rows (status Contacted, touch_count under 3)
      ─ filter "Due today": next_action_date has passed ─►
[2] Gmail: Day 2 or Day 5 email, in the lead's language
[3] Google Sheets: Update the row (touch_count + 1, next date, or Nurture)
[4] Google Sheets: Log row (flow B)
```

| touch_count before | Email sent | After |
| --- | --- | --- |
| 1 | **Day 2:** quotes the lead's own challenge, the free diagnostic is still open | touch_count 2, next email in 3 days |
| 2 | **Day 5:** last note, offer a monthly tip instead | touch_count 3, status **Nurture** |

**How a lead leaves the sequence:** the team changes the status to `Engaged`, `Diagnostic Booked` or anything other than `Contacted`. Flow B only searches `Contacted`, so it never emails that lead again.

## Important: Search Rows returns columns by number

The Search Rows module does not name fields by header. It returns them by column position, starting at `0` for column A. In formulas they are written with backticks, for example ``1.`29` ``.

| Column | Number | Column | Number |
| --- | --- | --- | --- |
| lead_id | `0` | locale | `13` |
| name | `2` | status | `26` |
| email | `4` | next_action_date | `29` |
| challenge | `10` | touch_count | `30` |

Row number for the update: `{{1.__ROW_NUMBER__}}`.

## Module settings

**[1] Search Rows:** sheet `Leads`, headers Yes. Filter: `status` (AA) equal to `Contacted` **and** `touch_count` (AE) less than `3`. Limit 50. Schedule: every day at 10:00.

**Filter "Due today":** `{{parseDate(1.`29`; "M/D/YYYY H:mm:ss")}}`, Date operators: earlier than or equal to `{{now}}`.

**[2] Gmail:** to `{{1.`4`}}`, body type Raw HTML. Subject and content pick the text by `locale` (`` 1.`13` ``) and `touch_count` (`` 1.`30` ``), then replace `{name}` with `` 1.`2` `` and `{challenge}` with `` 1.`10` ``. Arabic emails are wrapped in `<div dir="rtl">`.

**[3] Update a Row:** row `{{1.__ROW_NUMBER__}}`:

- `touch_count`: `{{parseNumber(1.`30`) + 1}}`
- `last_contact`: `{{formatDate(now; "YYYY-MM-DD HH:mm")}}`
- `status`: `{{if(parseNumber(1.`30`) >= 2; "Nurture"; "Contacted")}}`
- `next_action`: `{{if(parseNumber(1.`30`) = 1; "Day 5 last follow-up"; "Nurture: monthly tip")}}`
- `next_action_date`: `{{if(parseNumber(1.`30`) = 1; formatDate(addDays(now; 3); "YYYY-MM-DD HH:mm"); emptystring)}}`

**[4] Add a Row** in `Log`: timestamp, lead_id `{{1.`0`}}`, flow `B`, action `follow-up {{parseNumber(1.`30`) + 1}}`, details "Sent Day 2 email" or "Sent Day 5 email, moved to Nurture".

## How it was built

The 4 modules were created with Make's AI builder (Maia) from a written prompt, then every field was checked and filled by hand. Maia left the Gmail module empty and used header names that Search Rows does not return; both were fixed in testing (see `docs/08-testing-report.md`).
