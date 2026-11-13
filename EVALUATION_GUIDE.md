# AlgoVault — Codebase Evaluation Guide

**Project:** OWASP NIE VibeSprint 1.0 · Problem Card 17 (PYQ Bank)

This guide maps the required behaviors to source code in the submitted repository. It is an implementation map, **not** a claim that the app was built, linted, or browser-tested successfully.

## Run locally

Node 22.12+ recommended. From the repository root:

```bash
npm install
npm run dev
```

Development port: `8080` (`vite.config.ts`). Visit the URL reported by Vite on localhost. For additional validation, run `npm run lint`, `npm run build`, and TypeScript checks with `npx tsc --noEmit -p tsconfig.app.json` and `npx tsc --noEmit -p tsconfig.node.json`. There is no configured automated-test script. Check actual command outcomes before reporting a pass.

## Requirements and code locations

| Requirement | Code location | Behavior to inspect |
| --- | --- | --- |
| Seeded question papers, subjects, semesters and years | `src/data/academics.ts` | 14 illustrative papers; 70 unique academic questions; 12 subjects; semesters 1–4; years 2022–2026 |
| Paper and question views | `src/components/academics/AcademicLibrary.tsx` | Paper/Question view toggle |
| Semester/subject/year/exam/topic filters | `src/utils/academics.ts`, `src/components/academics/AcademicLibrary.tsx` | `filterAcademicQuestions` applies academic paper facets, then per-question topic/remaining filters |
| Keyword search | `src/utils/academics.ts` | Trimmed, case-insensitive keyword comparison, combined with other filters using AND |
| No-results recovery | `src/components/academics/AcademicLibrary.tsx` | Empty state and Clear Filters action |
| Individual, selected, topic and paper practice | `src/components/academics/AcademicPaperDetail.tsx`, `src/pages/Workspace.tsx` | All operations update shared practised-question IDs; topic actions are scoped to the current paper |
| Completion percentage | `src/utils/academics.ts`, `src/components/academics/AcademicShared.tsx` | `academicCompletion` counts unique question IDs, and derives completion without a separate paper-complete flag |
| Academic subject and semester progress | `src/components/academics/AcademicDashboard.tsx` | Derived from the academic question set |
| Five-item Revise Next queue | `src/utils/revision.ts`, `src/pages/Workspace.tsx` | `REVISION_CAPACITY = 5`, duplicate protection and refusal of a sixth pin |
| Queue removal and practice-then-clear | `src/pages/Workspace.tsx`, `src/components/revision/RevisionWorkspace.tsx` | `removeRevision` leaves practice unchanged; `completeRevision` marks practised and removes the pin |
| Browser persistence | `src/utils/storage.ts` | `algovault:v1:practised`, `algovault:v1:revision`, and onboarding year persisted in localStorage |
| OA/placement practice | `src/components/questions/QuestionBank.tsx`, `src/components/signature/MiniOA.tsx` | Separate placement question bank and deterministic mixed OA |
| Time Machine / Ghost / Code Autopsy | `src/components/signature/SignatureFeatures.tsx`, `src/components/signature/TimeMachine.tsx`, `src/utils/assessment.ts` | Fixed assessment fixtures, saved attempt events, and predefined diagnostic traces |

## Core verification walkthrough

1. Select onboarding year if prompted (this is a workspace label, not a paper filter).
2. Open **Campus Academics → Explore PYQ Papers**.
3. Select **Semester 3**, **Data Structures**, **2025**, **End-Semester Examination**. Expected: one five-question paper.
4. Open that paper, select Q1 and Q2, then **Mark Selected as Practised**. Expected: **2/5 = 40%**.
5. Mark **Trees** practised in this paper. Expected: Q3 and Q4 become practised, paper completion **4/5 = 80%**; other papers remain untouched.
6. Mark the complete paper practised. Expected: **5/5 = 100%** and a visible completion banner.
7. Pin an eligible unanswered or Hard question via its **Add to Revise Next** action, then visit **Revise Next** and remove it.
8. Verify the queue count changes. Refresh to check saved progress and queue restoration.

## Twist boundary checks

- Pin five distinct eligible questions; the queue must show 5/5.
- Attempt a sixth pin; the existing five entries must remain unchanged.
- Use **Remove from Queue**: the practice status must not change.
- Use **Mark Practised & Clear**: the question becomes practised and the queue shrinks.
- Duplicate pins must be rejected. Previously practised Hard questions remain eligible.

## Empty-result example

The library **does contain some 2026 papers**. To demonstrate the empty state, filter **Semester 3 + Data Structures + 2026**, or search for a nonexistent keyword. **Clear Filters** should restore the full library. Do not delete seeded papers to fabricate an empty year.

## Data, privacy and known limitations

- Academic papers and company/year associations are illustrative, not authenticated university records.
- Practice completion is self-reported; it is not proof of a correct solution.
- Browser localStorage is unencrypted and tied to a browser/origin; there is no account or cross-device sync.
- Attempt history: `algovault:v3:attempt-history`, validated and capped to 100 records (`src/utils/assessment.ts`).
- No arbitrary code execution, AlgoIDE, or standalone Performance Intelligence module is implemented in this snapshot.
- Local attempt IDs are generated using `crypto.randomUUID()`, requiring localhost or HTTPS/secure context.
- Active filters and unfinished assessment rounds do not persist across refreshes.
- The source archive was statically inspected, but dependency installation and executable checks have **not** been confirmed to pass by this guide.
