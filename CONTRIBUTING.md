# Contributing

How we work on this repo. Short on purpose.

## The flow

1. Start from an up-to-date `main`
2. Create a branch for one piece of work
3. Commit small, clear steps
4. Push and open a pull request (PR)
5. Check the PR, then merge into `main`

Never commit straight to `main`.

## Branch names

| Prefix | Use for | Example |
| --- | --- | --- |
| `feat/` | New page, section or feature | `feat/diagnostic-landing-page` |
| `fix/` | Something broken | `fix/mobile-menu-overlap` |
| `docs/` | Documentation only | `docs/system-design` |
| `content/` | Text or image changes only | `content/home-hero-copy` |
| `chore/` | Setup, dependencies, cleanup | `chore/update-next` |

## Commit messages

Start with the same prefix, then say what changed in plain words:

```
feat: add services section to home page
fix: hide header button on tablet
docs: explain the lead scoring flow
```

## Before you open a PR

- [ ] `npm run build` passes (run it inside `site/`)
- [ ] `npm run lint` passes
- [ ] Checked on a phone width (375px) and desktop
- [ ] No secrets in the code (API keys go in `.env.local`, never committed)
- [ ] Copy follows the writing style: no em dashes, US spelling, short sentences
- [ ] No invented proof: no fake reviews, logos, numbers or results

## For teammates who do not code

You can still change text:

1. Open the file in `site/src/content/` on github.com (for example `home.ts`)
2. Click the pencil icon to edit
3. Change only the text between the quotes
4. At the bottom choose **Create a new branch** and **Propose changes**
5. Send the PR link to Kamel

Once Sanity (our CMS) is set up, text changes will happen there instead, with no GitHub needed.

## Where things go

| What | Where |
| --- | --- |
| Website code | `site/` (read `site/README.md`) |
| Project context and specs | `docs/` |
| Make.com blueprints, AI prompts, test cases | `automation/` (coming) |
| Simulated lead data | `data/` (coming) |
| Why we chose something | `docs/decisions.md` |
