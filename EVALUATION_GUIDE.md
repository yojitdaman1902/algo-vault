# AlgoVault — Evaluation Guide

## A. Project overview

**Problem Card 17: PYQ Bank.** Campus Academics implements a local fictional paper library, multi-facet filters, practice tracking, progress, and shared revision. Placement Preparation contains the legacy DSA bank, 92 OA MCQs, Mini OA, Time Machine, predefined Code Autopsy traces and event-based Ghost Mode. No actual AlgoIDE or standalone Performance Intelligence module exists; completion and round/ghost reports are the implemented analytics.

Entry: `index.html` → `src/main.tsx` → `src/App.tsx`. React Router defines `/` (Workspace) and `*` (NotFound). Workspace and CampusAcademics use internal screen state, not separate deep-link routes. Returning from Time Machine preserves the mounted Workspace state. No server is required.

## B. Official requirements mapping

Implementation references below are source-inspected, not runtime-certified.

| Requirement | Implementation file | Function/component | Verification method |
|---|---|---|---|
| Seed subjects, semesters, years, papers, questions | `src/data/academics.ts` | `academicSubjects`, `academicPapers`, `academicQuestions` | Inspect 14 seeds / 70 questions / 12 subjects; runtime uniqueness/reference checks pending |
| Semester filtering | `src/utils/academics.ts` | `filterAcademicQuestions` | Paper semester must match before questions are considered; manually compare semesters 2 and 3 |
| Subject filtering | Same | `filterAcademicQuestions` | Exact `subjectId` match; combine with semester |
| Year filtering | Same | `filterAcademicQuestions` | Exact year match; DS 2025 matches, DS 2026 does not |
| Keyword search | Same | `filterAcademicQuestions` | Trimmed, lowercased search over statement/topic/paper metadata, ANDed with facets |
| Paper filtering | Same | `filterAcademicPapers` | Derives paper IDs from matching questions; no unrelated fallback |
| Mark/unmark question | `src/pages/Workspace.tsx` | `markAcademic`, `setPractised` | Central Set mutation; check status and paper count |
| Select/bulk practice | `src/components/academics/AcademicPaperDetail.tsx` | `selected`, `apply` | Set prevents duplicates; empty selection disabled and handler guarded |
| Paper/topic completion | Same | `apply` and scoped ID callers | Whole paper uses `questionIds`; topic IDs come only from the open paper |
| Progress calculations | `src/utils/academics.ts` | `academicCompletion` | Unique done/total, zero-total guard; full completion is exact count equality |
| Dashboard aggregates | `src/components/academics/AcademicDashboard.tsx` | `AcademicDashboard` | Subject/year/semester totals use IDs, not mean paper percentages |
| Revise Next | `src/pages/Workspace.tsx`, `src/components/revision/RevisionWorkspace.tsx` | `toggleRevision`, `removeRevision`, `completeRevision` | Pin, remove, complete and clear; all use shared state |
| Eligibility, duplicates, five-item cap | `src/utils/revision.ts` | `canPin`, `addToQueue`, `normalizeQueue` | Unpractised OR Hard; sixth/duplicate addition returns original queue |
| Weak-topic review | `src/utils/academics.ts`, `src/utils/revision.ts` | `academicWeakTopics`, `topicsToRevisit` | Lowest completion ratio first; academic suggestions scoped by subject |
| Clear empty result feedback | `src/components/academics/AcademicLibrary.tsx` | `AcademicLibrary` | Zero matching questions shows message + Clear Filters |
| Persistent progress and revision | `src/utils/storage.ts` | `storage`, `readArray`, `write` | JSON recovery, ID normalization, memory fallback; refresh test pending |
| Local metadata; no PDF hosting | `src/data/academics.ts`, `src/components/academics/AcademicShared.tsx` | Data exports, `DemoNotice`, `PaperCard` | Local records and explicit fictional labels; no fetch required |

### Dataset integrity reviewed

All academic seeds reference an existing subject. Paper semester is taken from that subject; question metadata is generated from the same record. Each paper owns five IDs with prefix `academic-{subject}-{year}-{examIndex}-q{number}`. No duplicate seed key was observed in source review. The new prefix is distinct from legacy `pyq-*`, `place-*`, and `oa-*` IDs. No generated integrity test was executed.

Valid 2026 papers exist for Programming in C and Operating Systems. A blanket expectation of zero 2026 results is incorrect for this dataset. Use DS + 2026 or an unmatched keyword to test empty recovery.

## C. Main user journey and code path

1. Workspace navigation selects `academics` → `CampusAcademics` → `AcademicLibrary`.
2. Filters update `AcademicFilters`; `filterAcademicQuestions` restricts paper metadata with AND, then topic/keyword/practice status. `filterAcademicPapers` renders only corresponding papers.
3. Open Semester 3 / Data Structures / 2025 / End-Semester. `AcademicPaperDetail` resolves `paper.questionIds` and uses a Set for selections.
4. Select Q1 and Q2 → `apply(ids, true)` → Workspace `markAcademic` → new central practised Set → React renders `academicCompletion` results. Expected **2/5, 40%** with success text.
5. Pin unanswered Q3, or Hard Q4 even if already practised. Already-practised Easy/Medium Q1/Q2 are intentionally ineligible. `toggleRevision` calls `addToQueue`; successful additions update the shared queue and toast.
6. Revise Next `onRemove` invokes `removeRevision`, decreasing occupancy without changing practice. `onComplete` invokes `completeRevision`, adding the question to the practised Set and removing it from the queue.
7. Effects persist both sets of IDs. Returning to Campus Academics derives updated metrics. There is no independent paper-complete flag.

Full-paper result for a fresh workspace: 5/5 and **Paper Completed — 100%**; dashboard 1/14 papers, 5/70 questions (7%), DS 5/15 (33%), Semester 3 5/25 (20%). These are expected calculations, not observed browser results.

## D. Minute 40 twist

`REVISION_CAPACITY = 5` in `src/utils/revision.ts`. `addToQueue` checks duplicate, eligibility and capacity before constructing a new queue. Rejection retains the original array, letting Workspace show feedback without losing earlier pins. `normalizeQueue` restores at most five distinct known IDs from storage. Existing pins are not automatically removed when a question becomes practised. Difficult means `difficulty === 'Hard'`; there is no separate personal difficulty flag.

The same queue supports academic and legacy questions. Academic IDs are included in both Workspace's `questionsById` map and the persistence allowlist. Completing revision is idempotent (`Set.add`, not toggle); removal alone does not touch completion.

## E. Data persistence

| Key | Ownership / restoration |
|---|---|
| `algovault:v1:practised` | `storage.getPractised` validates known IDs and creates a Set |
| `algovault:v1:revision` | `normalizeQueue` filters, deduplicates, caps at five |
| `algovault:v1:academic-year` | Onboarding display label; not a library restriction |
| `algovault:v3:attempt-history` | `attemptStorage` validates unknown JSON records individually, deduplicates attempt IDs, retains at most 100 |

Malformed JSON and denied reads have fallback values. Failed writes retain session copies; write callers notify users. Unknown question IDs are omitted, while known legacy and academic IDs are preserved. No migration resets valid current IDs. Corrected MCQ content does not rewrite historical scores. There is no cross-tab synchronization, encryption, account or server backup.

## F. Build and run

Declared scripts in `package.json`: `dev`, `build`, `build:dev`, `lint`, `preview`. There is **no test or typecheck script**. Node 22.12+ is recommended for Vite 8. The source-handoff command references are:

```sh
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

Explicit compiler checks using the installed TypeScript dependency (not npm scripts):

```sh
npx tsc --noEmit -p tsconfig.app.json
npx tsc --noEmit -p tsconfig.node.json
```

`vite.config.ts` configures port 8080, React SWC, the component tagger and the `@` alias. `vercel.json` has an SPA rewrite; its existence is not evidence of a deployment. Core behavior has no `.env` dependency. A build alone does not typecheck the app.

## G. Tests and audit results

No existing automated test framework, test files or test script were found in the listed repository. None was added solely for this audit. Available tools allowed file inspection/editing, not shell, compiler, browser or runtime execution.

| Validation | Result |
|---|---|
| TypeScript projects | **NOT RUN** |
| Configured ESLint | **NOT RUN** |
| Production build | **NOT RUN** |
| Automated unit/integration tests | **NOT RUN** — no configured suite |
| Browser E2E, persistence, console, responsive checks | **NOT RUN** |
| Dependency vulnerability audit | **NOT RUN** |

Actually performed: source reads/searches of entry/navigation, data/model references, academic filters/actions/progress, revision and persistence, placement scoring/timers/history, configuration and documentation. This was not exhaustive line-by-line certification of every unused generated UI primitive.

Pending manual cases are in `docs/CAMPUS-ACADEMICS.md` and `docs/DOC-03-FIVE-TEST-CHECKLIST.md`. Cover: semester+subject+year; keyword AND facets; individual and whole-paper progress; five pins and sixth rejection; remove-only; practise-and-clear; empty result recovery; malformed JSON/partially malformed history; refresh; placement and timer regression. The exact academic journey and expected counts are in README.

### Repairs made in this audit

- `src/data/oaQuestions.ts`: corrected the train-time answer; missing fifth participant in seating wording; series explanation; ambiguous sentence completion/reading options; duplicated `held`; unspecified Two Sum index ordering; duplicate reverse-string/BFS options (also duplicate React keys); vague linked-list choices; missing tree shape; Fibonacci index convention. IDs and counts unchanged.
- `src/data/questions.ts`: corrected the rainwater example from 6 to 5 for its actual eight-element input.
- `src/utils/assessment.ts`: replaced `any`-based stored-data validation with `unknown` narrowing; validated optional completion timestamps; deduplicated attempt IDs; retained last valid memory copy after later read failures.
- `src/utils/storage.ts`: cache successful reads so a subsequent denied read retains session progress; documented write-failure behavior.
- `src/hooks/useTrackedAttempt.ts`, `src/components/signature/AttemptPanel.tsx`: stable timing/finish callbacks, complete effect dependencies and once-only expiry reporting.
- `tailwind.config.ts`: replaced CommonJS `require` with the equivalent ESM import, avoiding the configured TypeScript lint rule violation without suppressing the rule.
- Critical invariant comments added in academic data/filter/aggregation, bulk practice, Workspace state and revision logic. No product feature or UI redesign was added.

## H. Known limitations and security scope

- All papers and tags are demo data. Academic marking is self-reported; subject/semester completion is not mastery.
- Core paper workflow is implemented in source, but final execution validation remains outstanding. No passing checks, deployment, screenshot or recording are claimed.
- Legacy academic-tagged DSA records use older illustrative subject/semester associations; they are retained as an independent catalog. Dedicated academic progress does not include them.
- Some OA questions repeat concepts/prompts; IDs remain stable to preserve saved state.
- No AlgoIDE, arbitrary-code evaluator, AI service or production-grade sandbox exists. Code Autopsy is answer-based predefined illustration, not code inspection. Time Machine/ghost use local deterministic fixtures.
- Existing generated shadcn files and installed packages may include unused template functionality. No dependency removal, upgrade or lint-rule disabling was performed; full lint/typecheck remains necessary.
- Source searches found no credential/API-key literals, core `fetch`/axios calls, environment-variable reads, `eval` or `new Function` in inspected application code. This is not a certified secret scan or dependency audit. The template chart component contains `dangerouslySetInnerHTML` for generated styles and is not used by the reviewed academic flow; do not feed untrusted configuration into it.
- Storage is local and unencrypted. Filters, selections and active rounds are not persisted; completed practice/revision/attempts are. HTTPS or localhost is required for `crypto.randomUUID()`.
- The earlier uploaded C-lab screenshots have not been imported. The latest instruction explicitly limited this pass to stabilization, not new sample content.
