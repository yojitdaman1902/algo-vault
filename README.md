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
