# AlgoVault

**Ace Your Semesters. Crack Your Placements.**

Two local-first preparation pillars: **Campus Academics** for semester examination practice and **Placement Preparation** for Coding & DSA, Quantitative Aptitude, Logical Reasoning, Verbal Ability / English, and OA simulations. No required backend, authentication, external API, environment configuration, or arbitrary code execution.

## Campus Academics

Open **Campus Academics** in the main navigation, then **Explore PYQ Papers**. The dedicated academic module contains **14 fictional papers, 70 questions, 12 subjects, semesters 1–4, years 2022–2026, and three examination types**. Every paper is explicitly illustrative/demo data, not a verified past university examination.

- Papers / Questions views with combined semester, subject, year, examination type, topic, keyword, and unpractised-only filters; no unrelated fallback results.
- Paper details with individual toggles, checkbox selection, validated bulk actions, reversible topic actions scoped to that paper, and whole-paper completion.
- Visible success notifications and a derived **Paper Completed — 100%** state.
- Academic dashboard showing question-weighted progress by paper, subject/year, semester, and topic, plus incomplete-topic review links.
- Same existing practised-ID Set and five-item Revise Next queue; completing an academic revision item updates its paper and all academic metrics. Existing placement data and assessment history are retained.

See [Campus Academics data model, judge journey, verification checklist, and limitations](docs/CAMPUS-ACADEMICS.md). Source review was performed; browser, build, typecheck, and end-to-end tests have **not been executed** in this implementation session.

## OA expansion

Added 30 non-DSA MCQs (10 per new category) and two DSA MCQs alongside all original questions. Category filters, answer practice with explanations/retry, category-wise progress, and one shared five-item Revise Next queue are implemented. Old question IDs and storage keys are preserved.

**Demo:** Question Bank → Quantitative Aptitude → A percentage of a quantity → choose an answer → Submit → Retry or Mark as practised. Dashboard/My Progress show category completion. Use **Try the 8-question Mini OA** for two questions per category with one countdown and real scoring.

See [OA expansion, answer-key review, scoring and test checklist](docs/OA-EXPANSION.md). Source/content review is complete; runtime/build/browser checks are still pending. Standalone answer feedback is transient; practised flags and revision IDs persist. Mini OA finished attempts share existing capped history; current rounds/reports do not resume after refresh.

The original Time Machine/Autopsy/Ghost demo below remains available; its five curated DSA variants are separate from the new Mini OA selection. Earlier audit notes below describe the pre-expansion audit, not a claim that this expansion was documentation-only.

## Official VibeSprint submission documents

| Card | Artifact |
|---|---|
| DOC-01 | [README & Quickstart](docs/DOC-01-README-QUICKSTART.md) — launch/install guidance, sample data, evidence references |
| DOC-02 | [Judge Runbook](docs/DOC-02-JUDGE-RUNBOOK.md) — exact 60-second core/twist script |
| DOC-03 | [Five-Test Checklist](docs/DOC-03-FIVE-TEST-CHECKLIST.md) — exactly five manual tests, all marked NOT RUN |
| DOC-04 | [User Quickstart](docs/DOC-04-USER-QUICKSTART.md) — four beginner steps |
| DOC-05 | [Data & Privacy Note](docs/DOC-05-DATA-PRIVACY.md) — inspected storage/network behavior |
| DOC-06 | [Handoff & Limitations](docs/DOC-06-HANDOFF-LIMITATIONS.md) — files, reset, simulations, three priorities |

### Compliance audit status
Source inspection/search confirmed local metadata/calculations, no required environment reads or API services, no apparent embedded credentials in reviewed source/config, and the implemented eligibility/capacity/clear/persistence/filter guards. Company tags and paper associations are illustrative; familiar names are not proof of historical interviews. Signature grading is deterministic and no arbitrary code is executed.

Confirmed gaps were the six missing doc cards, scattered setup/privacy/handoff guidance, and missing verified demo evidence. This audit adds documentation only: no functional source, navigation, sample data, dependencies, storage keys, or saved user progress was changed.

**Not a runtime pass:** no build, typecheck, browser interaction, network capture, or console checks could be executed with this session's tools. Existing build output does not establish current build success. No verified demo URL, screenshot, or recording is supplied. DOC-01 lists planned capture references; complete them and execute DOC-03 before submission. A documentation artifact is now prepared; full submission evidence is still outstanding.

## Signature demo (2–3 minutes)
1. Enter the workspace and choose **Time Machine**.
2. Keep Amazon / 2024 / Mixed / Demo. Start simulation.
3. For duplicate Two Sum, submit `[0, 0]`, then Save & next.
4. For unsorted Two Sum, submit `No solution`, then Save & next.
5. For Dijkstra, select `O((V + E) log V)` and save.
6. Open Run Code Autopsy on either wrong answer. Use Previous / Next / Reset.
7. Retry: select `[0, 1]` for duplicates or `[1, 2]` for unsorted input, Submit, then Finish challenge.
8. Challenge your ghost. Open a hint or submit a wrong answer to create real events; finish and compare.
9. Return to Time Machine home. Expand saved attempts, refresh, and reopen history.

## Implemented
- Three-question timed assessments, strict company/year/difficulty matching, explicit preset fallback, Demo (3 min) and Practice (12 min), one continuous countdown.
- Verified multiple-choice scoring. Reports separate correct, incorrect, and unanswered questions, wall duration, active question times, and topic signals.
- Two answer-specific Two Sum diagnostic traces. Unsupported errors receive a general explanation, not an invented cause.
- Shared tracked attempts for assessments, standalone practice, and retries; timestamped submissions, hints, completion, and visibility-aware active time.
- Ghost comparison and scrubbable event replay. First-time users create their own baseline. Comparison uses the fastest saved successful attempt, or most recent attempt if none succeeded.
- Existing question-bank progress and revision storage remain independent and unchanged.

## Persistence
- Existing state: `algovault:v1:*`.
- Signature history: `algovault:v3:attempt-history`, 100 records maximum, validated on read.
- Old prototype v2 records are deliberately not imported: they may contain fabricated hint times and cumulative question timings.
- Storage failure shows a warning and falls back to memory for this session.

## Limitations and verification status
- Five curated assessable variants, not arbitrary question/code evaluation. The unsorted Two Sum variant links to its existing bank question through `bankQuestionId`.
- Company and variant-year associations are illustrative, not verified interview history. Graduation year is context only.
- Many filter combinations cannot supply three questions; starting is disabled until filters change or the explicit Amazon/2024/Mixed preset is selected.
- Tracked practice and Ghost Mode are opened from the Time Machine library/reports, not the legacy question detail modal.
- Completed question attempts persist; active round state and aggregate round reports do not resume after refresh. Unsaved current questions are discarded on exit.
- Hints reveal the verified explanation and are counted; this is educational practice, not a proctored exam.
- Source review performed. Typecheck, production build, browser/console, responsive, countdown, persistence, and regression interaction checks still require execution in preview; no runtime pass is claimed.

See ARCHITECTURE.md, DECISIONS.md, and TASKS.md for implementation details and verification checklist.

## Minute 40 official twist — Weak-topic review

Enhanced the existing Revise Next queue rather than rebuilding the application:
- Eligible for new pinning: unanswered (not practised) OR Hard. No personal difficult flag exists in this app, so none was added.
- Practised Easy/Medium questions have disabled pin controls with visible explanation. Existing saved items remain until explicitly removed, even if later marked practised.
- Exactly five slots, with a dynamic counter and clear queue-full notification. New pins never evict existing entries. Duplicate additions are rejected; the already-pinned control explicitly becomes Remove from Queue, retaining the existing toggle behavior.
- **Mark Practised & Clear** adds the ID to the central practised Set (never toggles it off), removes the queued ID, updates all derived metrics, and shows a success toast.
- **Remove from Queue** does not change practised status. Already-practised entries offer **Clear from Queue**.
- **Topics to Revisit** ranks incomplete topics by actual completion ratio, breaks ties alphabetically, and links the lowest three to Question Bank with topic + unanswered filters set.
- Existing subject, semester, academic year, keyword, company, topic, and difficulty filters combine with AND. Clear Filters also clears the unanswered shortcut.
- Required empty states: “All caught up! Your revision queue is clear.” and “No questions match your current filters.” Both have working exploration/reset actions.

Persistence retains `algovault:v1:practised` and `algovault:v1:revision`. Reads and writes discard invalid IDs, remove duplicates, and normalize corrupted oversized queues to the first five valid distinct IDs. Invalid JSON safely becomes empty data; valid entries in mixed arrays are retained. Browser-storage failure gives a warning and memory-only fallback. No PDFs, backend, APIs, or dependencies were added.

Verification: reviewed source wiring, queue guards, idempotent completion, filter conjunctions, data fixtures, and unchanged signature integration. Tests A–I have not been executed in a browser; no test/build/browser execution tool is available in this session. Detailed manual cases are in TASKS.md.
