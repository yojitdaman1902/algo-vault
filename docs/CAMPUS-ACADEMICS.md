# Campus Academics — implementation and judge runbook

## Scope and provenance

AlgoVault now has two preparation pillars: Campus Academics and Placement Preparation. The academic module is added to the existing Workspace navigation; existing placement components and assessment history remain in place. It follows the current application's in-workspace navigation model, not additional URL routes.

All 14 papers and 70 questions are **fictional illustrative/demo academic data**. They are not authenticated university papers. No PDFs, hosting, database, login, API, environment variables, or dependencies are required.

The dataset covers all 12 requested subjects, semesters 1–4, years 2022–2026, and Internal Assessment 1, Internal Assessment 2, and End-Semester Examination. Each paper has five meaningful questions. Data Structures has papers for 2023, 2024, and 2025; the 2025 End-Semester paper is the primary judge fixture.

## Data model and single source of truth

- `src/data/academics.ts`: typed subjects, papers, and questions. A paper has `paperId`, `subjectId`, numeric semester, year, examination type, title, and question IDs.
- `AcademicQuestion` extends the existing `Question` interface with `paperId`, `subjectId`, marks, and format. Existing title, statement (`description`), topic, difficulty, and display metadata are retained.
- IDs follow `academic-{subjectId}-{year}-{examIndex}-q{number}`. Each academic question belongs to exactly one paper; no shared-question ambiguity or duplicated records.
- Academic entities are not appended to the old placement library. Workspace and revision validation combine the two catalogs only where shared identity resolution is required.
- Practised state is the existing central `Set<string>` in Workspace, persisted under **`algovault:v1:practised`**. No paper/topic/subject completion flags or additional academic storage keys exist.
- Shared revision remains **`algovault:v1:revision`**, with the same normalization, duplicate prevention, eligibility rule, and maximum five entries.
- Old question IDs and **`algovault:v3:attempt-history`** are unchanged. The storage allowlist now accepts both catalogs, preventing academic IDs from being discarded on refresh.

## Calculations and actions

`src/utils/academics.ts` centralizes completion and filtering. Completion is `round(100 × practised unique IDs / all unique IDs)`. Full completion requires a nonempty set with every question practised, not a rounded percentage threshold. Subjects, subject-years, semesters, and topics use unique question counts rather than averages of paper percentages.

- Individual: add/remove exactly one ID.
- Bulk: selected IDs are stored in a Set, avoiding duplicate selections. No-selection practice is disabled and accompanied by “Select at least one question to continue.” The handler also guards empty selection.
- Topic: acts only on that topic's IDs within the open paper. Other papers and placement questions with the same topic are unaffected.
- Paper: acts on all question IDs in the open paper; reversible.
- Selection clears after a successful paper-detail action. Notifications include the number of targeted questions and freshly calculated paper percentage.
- Paper cards always show full-paper progress even when a keyword/topic filter matches only part of a paper.
- All filters combine with AND. Keyword search matches question text and paper/subject/topic metadata. Questions view inherits the associated paper's semester/year/type restrictions.

## Revision and weak-topic twist

Unpractised questions or Hard questions are eligible for pinning. Practised Easy/Medium questions are ineligible for new pins. Existing pinned questions remain until explicitly cleared. Adding a sixth question shows queue-full feedback and does not evict existing items.

The shared Revise Next page resolves academic IDs and supports removing, opening, and **Mark Practised & Clear**. Completion adds the question to the same central Set used by all academic metrics. Removing alone does not alter practice state. Already-practised entries offer Clear from Queue.

Campus Academics ranks incomplete subject-scoped topics by completion ratio, then subject and topic name. Selecting a suggestion opens the library's Questions view with subject, topic, and unpractised-only filters. Existing bank weak-topic review stays unchanged and separate from academic percentages. Suggestions are progress signals, not inferred skill scores.

## Primary judge journey and expected results

Use a fresh browser profile/workspace to avoid deleting existing user data. No automatic reset or migration clears old progress. A previously practised demo paper can be reset using **Mark Paper as Unpractised**, but other completed academic papers will still influence aggregate metrics.

1. Choose a workspace year if onboarding is shown (this label does not restrict papers).
2. Open **Campus Academics → Explore PYQ Papers**.
3. Select **Semester 3**, **Data Structures**, **2025**, **End-Semester Examination**.
4. Expect one paper with five initially unpractised questions.
5. Open it, select Q1 and Q2, and click **Mark Selected as Practised**.
6. Expected success: **“2 questions marked as practised. Paper progress: 40%.”** The paper shows 2/5.
7. Optional topic step: mark **Trees** as practised. Q3 and Q4 become practised; paper is 4/5, **80%**. Trees questions in the 2023/2024 papers remain unchanged.
8. Click **Mark Paper as Practised**. Expect 5/5 and **“Paper Completed — 100%”**.
9. Open **Academic Progress Dashboard**. With no other academic work completed, expected metrics are:
   - Papers: 1/14 complete.
   - Questions: 5/70; overall completion **7%** (rounded).
   - Data Structures: 5/15 = **33%** (rounded).
   - Data Structures 2025: **100%**; 2023 and 2024: **0%**.
   - Semester 3: 5/25 = **20%**.
10. Refresh, reopen Campus Academics, and verify the same derived metrics and completed paper.
11. Clear filters and select **Semester 2**. Expect Mathematics II, Programming in C, and Basic Electronics only (three papers, fifteen questions); no Semester 3 entries.

## Verification record

**Actually performed:** source inspection of models, navigation, rendering, filter conjunctions, calculations, shared state mutations, storage allowlist integration, and revision capacity/eligibility guards. Dataset and judge-fixture expected counts were reviewed against source.

**Not executed:** browser interaction, automated unit/integration/E2E tests, TypeScript compiler, production build, lint, refresh persistence, responsive interaction, and placement regression runs. This session exposes file editing/inspection tools but no execution or browser-testing tool. No runtime pass or screenshot evidence is claimed.

### Pending manual acceptance checklist (all NOT RUN)

| Case | Expected result |
|---|---|
| Dataset coverage | 14 papers, 70 unique questions, 12 subjects, four semesters, five years, three exam types |
| Each filter independently | Only matching papers/questions; counts change |
| Combined Semester 3 + DS + 2025 + End-Semester | One paper, five questions |
| Semester 2 alone | Three papers / fifteen questions; excludes Semester 3 |
| Keyword `AVL` | Only matching academic question(s), matching paper; no unrelated fallback |
| Questions view topic/semester filtering | Visible questions retain correct paper metadata |
| Impossible combination / unmatched keyword | Exact no-match message and functioning Clear Filters |
| Individual toggle and undo | Practice status and all derived metrics change |
| Empty selection | Disabled bulk practice and visible guidance |
| Select two / select all / clear | Accurate count; no duplicate selection |
| Bulk practised / unpractised | Only selected questions change |
| Trees completion in 2025 DS paper | Only its two Trees questions change |
| Whole-paper completion and undo | 100% completion panel appears/disappears correctly |
| Subject/semester dashboard | Question-weighted counts match the runbook |
| Refresh persistence | Saved question IDs restore all derived metrics |
| Shared mixed revision queue | Five maximum; duplicates prevented; sixth pin rejected visibly |
| Academic Mark Practised & Clear | Queue shrinks and the source paper's progress increments |
| Queue removal only | Practice status unchanged |
| Existing placement and signature tools | Question bank, MCQs, OA, Time Machine, Autopsy, Ghost, existing history unaffected |
| Mobile / desktop / keyboard | Readable controls and paper content, accessible labels, working selection |

## Known limitations

- No verified PYQs or model-answer grading. Academic practice is self-reported.
- Local-browser persistence only; no cross-device sync. Storage-denied environments retain session-only state and show the existing warning.
- Current tab, filters, selections, and page location are not persisted on refresh; practised state and revision are. Reopen Campus Academics after refresh to inspect progress.
- Not every subject/year/type combination has a paper. Empty results are intentional, not filled with unrelated content.
- The legacy question bank retains its pre-existing illustrative academic associations for compatibility; new paper-level metrics cover only the dedicated academic dataset.
- Runtime verification remains outstanding; the expected results above are acceptance criteria, not executed test evidence.
