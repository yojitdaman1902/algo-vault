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
