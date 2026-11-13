# DOC-01 — README & Quickstart

**AlgoVault:** a browser-first DSA question bank for semester and placement preparation. Discover a question, mark practice, and keep up to five unanswered or Hard questions in **Revise Next**.

## Use it in 30 seconds
Open the preview → select any offered year if prompted → **Enter AlgoVault** → **Question Bank** → search `Two Sum`. Click the question's circle to toggle practice; click its pin to queue it while unanswered. Open **Revise Next** and choose **Mark Practised & Clear**. Dashboard and My Progress use the same state.

## Open / install
- **Existing Dyad project:** open the Preview panel. Dependencies are already part of the project; no setup form, account, API key, or `.env` file is needed.
- **Source handoff:** use Node.js 22.12+ and pnpm in a Node-capable IDE. Open the project root, use the IDE package-manager integration to install dependencies from `package.json` and `pnpm-lock.yaml`, then start the **dev** package script through its task runner. Vite is configured for port **8080**; open the URL shown by that task.
- Available package tasks: **build** creates `dist/`; **preview** serves a previously built output; **lint** checks source. A Vite build is not a standalone TypeScript check. No automated test script is configured.
- Dependency installation needs registry connectivity; application calculations do not need a remote data service. Serve via localhost or HTTPS, not by opening `index.html` as a file. HTTPS/localhost is required for signature attempt UUID generation.

## Included features and sample data
Local TypeScript question metadata lives in `src/data/questions.ts`. Academic paper/year associations are fictional demonstration metadata. Real company names are illustrative tags, not endorsements or verified interview history. Subject, semester, year, keyword, topic, difficulty, and company filters combine. The queue provides capacity, distinct completion/removal, persistence, and weak-topic shortcuts.

Time Machine uses five curated assessable variants; Code Autopsy has two predefined answer-based traces; Ghost Mode replays locally saved events. None executes arbitrary code or calls AI. These are optional extensions to the official core journey.

## Evidence and submission status
**No verified public demo URL, screenshots, or recording is included yet.** Do not submit planned names as existing evidence. Capture references after running DOC-02:
- `docs/evidence/01-filtered-bank.png` — subject + semester + year + keyword.
- `docs/evidence/02-full-queue.png` — 5/5 and sixth-pin rejection.
- `docs/evidence/03-practised-cleared.png` — completion and freed slot.
- `docs/evidence/demo.webm` — continuous runbook, including refresh.

These paths are planned only. Add genuine files and/or a tested judge-accessible preview URL before submission. Include source, manifests, lockfile, config, and these docs; exclude dependency folders, editor-private metadata, and any personal browser data.

## Known limitations
Build/browser tests are pending, not passed. Storage is browser/origin-specific, unencrypted, and can be cleared or blocked. No cross-tab/device sync or active-assessment resume. Onboarding stores an offered year but does not implement meaningful academic-year recommendations. No PDF hosting, authentication, backend, or code execution. See DOC-05/06 for retention and reset details.
