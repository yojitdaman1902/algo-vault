# Status and verification checklist

Implemented: strict setup, single assessment timer, deterministic grading, reports, two diagnostic traces, retries, shared genuine event recording, persisted history, first-attempt baseline, ghost replay and comparison, workspace entry.

Source-reviewed expectations (not executed runtime tests):
- Amazon / 2024 / Mixed returns duplicate Two Sum, unsorted Two Sum, Dijkstra.
- Amazon / 2023 / Mixed has insufficient matches and disables Start.
- Changing year or company changes the strict matching set; fallback requires an explicit preset click.
- Correct answers: `[0, 1]`, `[1, 2]`, `O((V + E) log V)`, LCS `3`, stairs `8`.
- Duplicate diagnosis only for `[0, 0]` or explicitly supported `No solution`; unsorted diagnosis only for the stated two-pointer `No solution` option.
- Unsorted trace: 7 → move R; 5 → move L; pointers meet; missed pair 2+4.
- Ghost percentage: (previous-current)/previous ×100, only for two correct outcomes. PB also requires no additional mistakes or hints.

Pending manual preview verification:
- [ ] Follow README demo, verify scores and per-question times.
- [ ] Let countdown expire, check warning and unanswered reporting.
- [ ] Finish before submitting and after submitting; verify no duplicate saves.
- [ ] Previous/Next/Reset traces; retry changes result and creates history.
- [ ] Ghost locked before baseline; live timeline and manual replay ordered correctly.
- [ ] Refresh history; corrupt signature storage and verify safe empty state.
- [ ] Mobile stacked panels, keyboard radio/select/button/range controls.
- [ ] Existing combined bank filters, practise toggles, dashboard counts, five-item revision capacity/removal/refresh.
- [ ] Typecheck/build and console-error checks (no execution tools available in implementation session).

Not implemented: active session resume, legacy detail-modal Ghost entry, arbitrary code grading, automated browser tests.

## Official Minute 40 twist

Implemented: queue eligibility (unanswered OR Hard), five-slot guard, distinct complete/remove actions, shared pin explanations, real weak-topic ranking, unanswered/topic shortcuts, exact empty-state copy, and hardened existing persistence. No personal difficult flag was present; none added.

Source review performed (not runtime test passes):
- A/B: insertion refuses queue length >= 5; normal reads/writes normalize unique valid IDs to <= 5.
- C: addToQueue checks duplicates before append. Already-pinned UI explicitly changes to removal, never appends twice.
- D: completion uses Set.add, removes the ID and updates both shared states; repeats are ignored once removed.
- E: removal touches only revision state.
- F: original v1 storage keys retained; malformed JSON and invalid IDs are handled; effects persist normalized state.
- G: all filter conditions are conjunctive; known fixture below verified against source data.
- H: zero results show exact requested wording; Clear Filters resets every criterion, including unanswered-only.
- I: dashboard/progress still consume the same shared states; signature code and entry remain unchanged.

Pending browser scenarios (all A–I require execution):
- [ ] A: Make five questions unanswered and pin them; observe 5 / 5 slots filled.
- [ ] B: Try another eligible pin; observe “Queue full — maximum five questions” with all five unchanged.
- [ ] C: Revisit an already-pinned question; verify a single queue entry and explicitly labeled Remove from Queue control. Remove/re-pin and confirm count changes by one.
- [ ] D: Mark Practised & Clear an unanswered queue item; verify practised status, dashboard/progress increment, freed slot, and success toast. If already practised, Clear must not undo progress.
- [ ] E: Remove an unanswered item; verify it remains unanswered.
- [ ] F: Refresh after pins and completion; confirm both states. Check malformed JSON, mixed valid/invalid IDs, duplicates, and oversized saved queue recovery without crashes.
- [ ] G: Filter Data Structures + Semester 3 + 2022 + keyword “Two Sum”; expect Two Sum using Hashing. Add company/difficulty filters to verify their continued conjunction.
- [ ] H: Search “zzzz-nonexistent”; verify exact no-results message and Clear Filters restoration.
- [ ] I: Check dashboard, progress, details, all old bank filters, and signature demo regression.
- [ ] Eligibility: practised Easy/Medium pin disabled with explanation; practised Hard still pinnable.
- [ ] Weak-topic shortcut: opens the selected topic with unanswered-only enabled; Clear Filters resets both.
- [ ] Mobile: queue actions wrap, empty-state exploration works, and pin explanation is readable.

Limits: browser refresh durability depends on available localStorage. No multi-tab synchronization added. Runtime/typecheck/build tools are unavailable; all outcomes above are code-review expectations, not claimed executed tests.

## Submission compliance audit
- [x] Inspect active app/config for environment reads, service dependencies, network calls, storage writes, and apparent embedded secrets. No required service/config dependency found; unused template link/sidebar distinguished from mounted UI.
- [x] Review core guards and signature simulation disclosures. No functional correction identified as necessary for the official constraints; source left untouched.
- [x] Create and link all six official cards in docs/. DOC-03 contains exactly five NOT RUN manual tests.
- [ ] Execute DOC-03 and record actual observations, browser/date, and evidence.
- [ ] Execute build, lint, TypeScript validation and console/mobile checks with an execution-capable environment. Existing dist/ is not a current pass.
- [ ] Capture real screenshots/recording and/or verify a judge-accessible demo URL. Planned filenames in DOC-01 are not existing evidence.
- [ ] Package source/manifests/lockfile/config/docs, excluding personal/editor state and dependency folders.

Audit actions actually performed: file reads, directory listings, source/config searches, logic review, and documentation inventory/checklist count checks. No browser test, build, dependency reinstall, or dev-server restart was executed.
