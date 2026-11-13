# AlgoVault

**Ace Your Semesters. Crack Your Placements.**

AlgoVault is a local-first study workspace for **Problem Card 17 — PYQ Bank**. Campus Academics provides fictional previous-year-style papers with subject, semester, year and keyword filters, reversible practice tracking, and academic progress. Placement Preparation adds DSA, aptitude, reasoning, English, deterministic OA simulations, Code Autopsy and Ghost Mode. Both catalogs share one five-item Revise Next queue. No login, database, environment file, external data API or PDF hosting is required.

## Features and sample data

- **Campus Academics:** 14 fictional papers, 70 questions, 12 subjects, semesters 1–4, years 2022–2026, three examination types. Each paper has five questions.
- **Library:** Papers / Questions views; semester, subject, year, examination type, topic, keyword and unpractised-only filters combine with AND. Empty results include Clear Filters.
- **Practice:** individual toggles, multiple selection, reversible bulk actions, topic actions scoped to the open paper, and whole-paper completion.
- **Progress:** calculated from unique practised question IDs. Academic paper, topic, subject/year and semester statistics are separate from legacy bank statistics.
- **Revision:** zero to five unique questions; unanswered or Hard questions may be pinned. Sixth-item attempts are rejected, not substituted. Remove only clears the queue; Mark Practised & Clear also completes the question.
- **Placement:** 92 OA MCQs plus the preserved legacy DSA bank. Mini OA uses eight fixed questions, two per category, with one countdown and answer review.
- **Signature tools:** Time Machine selects three questions from five curated DSA variants. Code Autopsy shows two predefined diagnostic traces; Ghost Mode compares real saved attempt events.

All academic papers and company/year associations are **illustrative**, not authenticated university examinations or interviews. No arbitrary code is executed. There is no implemented AlgoIDE or standalone Performance Intelligence module; existing analytics are completion statistics and assessment/ghost reports.

## Tech stack

React 19, TypeScript, React Router 6, Vite 8 with SWC, Tailwind CSS 3, shadcn/Radix UI, Lucide icons and Sonner notifications. Data is local TypeScript metadata; persistence uses browser localStorage.

## Installation and development

Source-handoff commands below correspond to the existing package scripts. Use a Vite-8-compatible Node release (Node 22.12+ recommended) and npm. Dependency installation needs registry access; the core app does not require a network data service.

```sh
npm install
npm run dev
```

Vite is configured for port **8080**; use the URL reported by the development task. Serve through localhost or HTTPS rather than opening `index.html` directly. Signature attempt IDs use `crypto.randomUUID()`, which requires a secure context.

```sh
npm run build
npm run preview
npm run lint
```

`build` produces `dist/`; `preview` serves that output. `build:dev` is also available. Vite transpilation is **not** a TypeScript typecheck. There is no `typecheck` or `test` npm script. The installed TypeScript compiler can validate the two configured projects explicitly:

```sh
npx tsc --noEmit -p tsconfig.app.json
npx tsc --noEmit -p tsconfig.node.json
```

No automated test framework is configured. The final audit did not execute these commands; they are setup/validation references, not evidence of a successful build.

## Main judge demo

Use a fresh browser profile to avoid changing existing user progress. Select an onboarding year if prompted; it is a workspace label, not a library restriction.

1. Open **Campus Academics → Explore PYQ Papers**.
2. Filter **Semester 3 → Data Structures → 2025 → End-Semester Examination**. Expected: one five-question paper.
3. Open it, select Q1 and Q2, then **Mark Selected as Practised**. Expected: **2/5, 40%** and a success notification.
4. Mark **Trees** practised. Expected: Q3 and Q4 complete, paper **80%**; Trees questions in other papers stay unchanged.
5. Mark the entire paper practised. Expected: **Paper Completed — 100%**.
6. Open the academic dashboard. With no other work completed: **1/14 papers**, **5/70 questions (7%)**, **Data Structures 5/15 (33%)**, **Semester 3 5/25 (20%)**.
7. Refresh and reopen Campus Academics. Saved practice should restore these values.

These are expected results, **not an executed test report**. Detailed cases: [Campus Academics runbook](docs/CAMPUS-ACADEMICS.md).

### Minute 40 twist: revision demo

On a fresh paper, pin unanswered Q1–Q5. Open a different paper and attempt a sixth pin: expected queue-full feedback and unchanged 5/5 occupancy. In Revise Next, mark Q1 practised and clear it: expected 4/5 and source paper 20%. Remove Q2: expected 3/5 without any additional practice completion. Refresh to check persistence. A practised Hard question remains eligible; practised Easy/Medium questions do not.

### Empty-result demo

**2026 alone is not empty:** Programming in C and Operating Systems papers exist. Use **Semester 3 + Data Structures + 2026**, or an unmatched keyword, to demonstrate no results and Clear Filters. Do not delete valid papers to force a demo.

## Persistence and privacy

| Key | Data |
|---|---|
| `algovault:v1:practised` | Unique known question IDs from both catalogs |
| `algovault:v1:revision` | Up to five unique known question IDs |
| `algovault:v1:academic-year` | Onboarding workspace-year label |
| `algovault:v3:attempt-history` | Up to 100 validated attempt records |

Malformed JSON has a safe fallback; malformed attempt entries are filtered individually. Write failures retain session data and show a warning. Practice and queue IDs are validated against both catalogs. No academic completion flags are stored separately. Old prototype v2 history is not imported. Local storage is unencrypted and browser/origin-specific; no cross-tab or cross-device synchronization is implemented.

## Verification status

| Validation | Final audit result |
|---|---|
| TypeScript | NOT RUN |
| ESLint | NOT RUN |
| Production build | NOT RUN |
| Automated tests | NOT RUN — no framework/test script present |
| Browser, refresh, mobile, regression checks | NOT RUN |

Source inspection and targeted repairs were performed. No execution/browser tools were available in the audit session. This is not a claim of submission readiness or a clean dependency audit. See [EVALUATION_GUIDE.md](EVALUATION_GUIDE.md) for traceable implementation references and findings.

## Known limitations

- Academic completion is self-reported, not answer grading; papers are fictional, with no PDF requirement.
- Active page/filter/selection state and unfinished assessment rounds do not resume after refresh. Saved practice, revision and completed attempts do persist when storage is available.
- Legacy academic-tagged DSA entries remain in the old bank; dedicated academic metrics cover only `src/data/academics.ts`.
- Some OA prompts overlap in content, but IDs remain distinct to preserve saved progress. Corrected answer keys apply to future practice; historic attempt results are not rewritten.
- Assessments use fixed answer fixtures, not compilation, code execution, AI analysis or secure sandboxing. Diagnostics cannot infer arbitrary code failures.
- No verified deployment URL, screenshot recording or runtime validation evidence is included by this audit.

## Documentation

- [Evaluation guide](EVALUATION_GUIDE.md): official requirement mapping, code paths, audit findings and validation status.
- [Campus Academics](docs/CAMPUS-ACADEMICS.md): data model and academic acceptance checklist.
- [Architecture](ARCHITECTURE.md): original signature-module architecture.
- [Legacy judge runbook](docs/DOC-02-JUDGE-RUNBOOK.md) and [manual five-test checklist](docs/DOC-03-FIVE-TEST-CHECKLIST.md).
- [Data/privacy note](docs/DOC-05-DATA-PRIVACY.md), [handoff notes](docs/DOC-06-HANDOFF-LIMITATIONS.md), [OA expansion notes](docs/OA-EXPANSION.md).

Earlier documents describe earlier implementation stages; current scope and counts are summarized here and in the evaluation guide. Manual checklists are not test-pass evidence.
