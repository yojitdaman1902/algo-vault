# DOC-06 — Handoff & Limitations

## Main files
- `src/App.tsx`: React Router entry; `src/pages/Workspace.tsx`: dashboard/navigation, central practice/revision state, detail view, completion/removal handlers.
- `src/data/questions.ts`, `src/types/question.ts`: local library and metadata schema.
- `src/components/questions/QuestionBank.tsx`: keyword and multi-facet AND filtering, unanswered shortcut, empty/reset states; original question card is reused.
- `src/utils/progress.ts`: completion percentages. Dashboard/My Progress in Workspace derive breakdowns from the same dataset and practised IDs.
- `src/utils/revision.ts`: eligibility (unanswered OR Hard), duplicate/five-slot guards, weak-topic ranking; `components/revision/`: queue and pin UI.
- `src/utils/storage.ts`: existing v1 keys, valid-ID normalization, failure warnings.
- `components/signature/`: setup/timed round, shared attempt panel, autopsy/trace, ghost/report orchestration. `utils/assessment.ts`: fixtures/grading/diagnoses/history/comparison. `hooks/useTrackedAttempt.ts`: real event recording and active timing.

## Reset without modifying sample data
Sample questions are bundled constants, never edited by UI actions, so they do not need reseeding. Use Clear Filters for a non-destructive search reset; use practice toggles and Remove from Queue for individual corrections.

For a deliberate full local reset, first warn that progress/history will be lost. In browser developer tools, choose **Application/Storage → Local Storage → the app's origin**, delete only `algovault:v1:academic-year`, `algovault:v1:practised`, `algovault:v1:revision`, and `algovault:v3:attempt-history` (also legacy v2 if present), then reload. Do not delete unrelated origin data. This is a manual maintenance procedure, not an implemented Reset All button. Prefer a separate browser profile for fresh judge demos; no audit step resets existing users automatically.

## Deliberately simulated / limited
Fictional academic associations and illustrative company histories; five fixed assessable variants; two verified predefined diagnostic traces. No arbitrary code execution, AI, PDF hosting, backend, account, or authenticated interview history. Graduation year is context only. Onboarding year does not drive a real personalized selection rule.

Assessment filters may have fewer than three supported matches; users must explicitly change filters/use the supported preset. That restriction does not apply to the core bank or revision queue. Signature results do not mark bank questions practised automatically. Finished attempt history persists, but current rounds/reports do not resume. Hidden-tab active time pauses while assessment wall time continues. Browser storage is unencrypted and can fail; multiple tabs can overwrite shared storage. Use localhost/HTTPS for `crypto.randomUUID()`.

## Three priority improvements for real deployment
1. Add automated unit/browser regressions, accessibility checks, and CI typecheck/build gates for the full core and timed-attempt flows.
2. Establish licensed/provenance-verified question content, editorial review, and broader graded fixtures without misrepresenting historical company data.
3. Improve user-controlled persistence: export/import/delete, interrupted-session recovery, and conflict-safe cross-tab storage; reassess privacy before any optional account sync.

## Release gate
This audit used source inspection/search only. Build, typecheck, browser/network/console, mobile checks, and DOC-03 execution remain pending. Existing `dist/` is not evidence of a current successful build. No screenshots, recording, or public URL have been verified; capture real evidence per DOC-01 before submission. No functional source changes or progress deletion were made by this documentation audit.
