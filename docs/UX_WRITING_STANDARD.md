# UX Writing Standard

> Governs every user-facing string in the product: labels, buttons, headings, descriptions, empty states, errors, toasts, tooltips, onboarding, emails. Enforced by the `ux-writing-auditor` skill. Subordinate only to `NORTH_STAR.md`.

The reader is a busy government professional — a Permanent Secretary, a Minister's delivery adviser, a programme lead in a state ministry. They are not impressed by friendliness. They want to know what a thing is, what to do, and what happens next. Write for them.

## Voice

Confident, plain, exact. The register of Stripe, Linear, Figma, and the UK/Nigeria civil service at its clearest — **not** a chatbot, not a marketing site, not a startup mascot.

- Plain English. Short sentences. One idea per sentence.
- Government-appropriate, neutral, and calm. Authority without stiffness.
- Address the user as "you". Refer to the system as "the platform" only when necessary — usually you don't need to name it at all.

## The rules

**Never do these:**
- No exclamation marks. Ever.
- No filler: "simply", "just", "easily", "amazing", "awesome", "magic", "seamless", "powerful", "robust", "delight", "supercharge", "unlock", "empower", "leverage", "effortless".
- No forced friendliness: "Oops!", "Uh oh!", "Looks like…", "Let's…", "Yay", "Woohoo", "Ready to get started?", emoji.
- No marketing copy inside the product. Sell nothing. The user already signed in.
- No AI tells: "Here's…", "I've…", "Feel free to…", "Dive in", "Let's get you set up", "In today's fast-paced world", hedging ("might", "perhaps") where a fact belongs.
- No vague reassurance: "Don't worry", "No problem", "Hang tight".
- Don't explain what is obvious from the UI. Don't over-explain.

**Always do these:**
- Lead with the noun or the action. Labels are verbs or things, not sentences.
- Use sentence case for everything (headings, buttons, labels) except proper nouns.
- Be specific. "Report published" beats "Success". "3 activities overdue" beats "Some items need attention".
- State the fact, then the next action. Especially in empty states and errors.
- Use the product's own vocabulary consistently (see `docs/foundation/06-vocabulary.md`): Priority Area, Intervention, Activity, Milestone, Target, Financier.

## Patterns

**Buttons / actions** — verb + object, sentence case:
- `Create project` · `Add intervention` · `Assign owner` · `Publish report` · `Invite member` · `Approve milestone`
- Not: `Create your project` · `+ New` (alone) · `Submit` (say what it does) · `Let's go`

**Empty states** — fact, then the one next action:
- `No interventions yet. Create one to begin tracking delivery.`
- `No reports yet. Generate a report to brief leadership.`
- `Nothing overdue. Every activity is on track.`
- Not: `Looks like it's empty here!` · `You don't have any data yet, but that's okay!`

**Errors** — what happened, then what to do. No blame, no apology theatre:
- `Couldn't save. Check your connection and try again.`
- `You don't have permission to approve this milestone. Ask an admin.`
- Not: `Oops! Something went wrong 😕` · `Error 500`

**Confirmations / toasts** — the result, stated flatly:
- `Project created` · `Report published` · `Milestone approved` · `Member invited`
- Not: `Success!` · `All done!` · `Your project has been created successfully! 🎉`

**Descriptions / helper text** — one line, the question the screen answers (per North Star §5):
- Priority Areas page: `Which national priorities need attention.`
- Intervention page: `What is blocking delivery.`
- Not: `This is where you can manage all of your priority areas in one convenient place.`

**Destructive actions** — name the object and the consequence:
- `Archive "Ward 4 Reconstruction"? It will move to the archive and stop appearing in reports. You can restore it later.`
- Not: `Are you sure?` (alone)

## Nigeria-first content

- Placeholders use real Nigerian institutions and `.gov.ng` emails (see North Star §3).
- Currency examples in Naira (₦).
- Example owners are plausibly Nigerian names; example bodies are real MDAs.

## The test

Before shipping any string, ask:
1. Would a Permanent Secretary read this and know exactly what to do?
2. Could I delete a word without losing meaning? (If yes, delete it.)
3. Does it sound like a person who has done this job for ten years — or like a helpful robot?
4. Is there an exclamation mark, an emoji, or a word from the banned list? Remove it.

If a string fails any of these, it is not done.
