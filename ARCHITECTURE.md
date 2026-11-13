# Architecture

- `src/pages/Workspace.tsx`: existing bank/dashboard/revision/progress state. Time Machine navigation opens a distraction-free feature workspace without altering that state.
- `src/components/signature/SignatureFeatures.tsx`: local screen orchestration, report, practice library/history, and comparison UI.
- `TimeMachine.tsx`: strict setup and single-deadline assessment; each question mounts a new tracked attempt, while the round timer stays mounted.
- `AttemptPanel.tsx`: shared assessment, standalone, retry, and ghost UI. Real event replay uses elapsed active time; range input permits manual scrubbing.
- `CodeAutopsy.tsx`: diagnosis display and interactive verified trace player.
- `src/hooks/useTrackedAttempt.ts`: shared attempt lifecycle; monotonic active clock, tab-visibility handling, real event recording, completion persistence.
- `src/utils/assessment.ts`: curated variants, strict selection, pure evaluation, answer-specific diagnostics, validated/capped persistence, comparison math.
- `src/types/assessment.ts`: shared types; variant IDs distinguish different inputs while `bankQuestionId` links variants to existing data for difficulty.

Assessment countdown uses wall time; attempt times use visible-tab active time. No timer restarts between assessment questions. Finishing early or timing out saves the current attempt, but unvisited questions create no fictional attempt events.

Attempts do not mutate practise checkboxes or revision IDs. Add supported variants in the assessment registry; add diagnosis fixtures keyed by the exact supported answer. Do not infer code behavior from unsupported responses.
