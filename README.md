# AlgoVault

Local-first DSA question bank and signature learning workspace. No backend, authentication, external APIs, or code execution.

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
