# DOC-05 — Data & Privacy Note

Based on inspected application source, not a network-capture or security certification.

## What is stored
| Location / key | Actual contents |
|---|---|
| Bundled `src/data/questions.ts` | Titles, descriptions, examples, topics, difficulty, fictional paper years/semesters/subjects, illustrative company tags. No user records or PDFs. |
| `algovault:v1:academic-year` | The onboarding year string selected by this browser user. |
| `algovault:v1:practised` | Array of valid practised question IDs. |
| `algovault:v1:revision` | Ordered queue of up to five valid unique question IDs. |
| `algovault:v3:attempt-history` | Up to 100 finished attempts: random attempt ID, question/variant ID, start/completion timestamps, active milliseconds, answer submissions, incorrect count, hint count, final outcome, and timestamped started/submitted/hint/finished events. These are real learning interactions, not fictional analytics. |
| React state / temporary memory | Search/filter values, open question/navigation, simulation configuration (company, interview/graduation year, difficulty, mode), in-progress answers/timers, round reports, replay position, and storage-failure fallback. These are not recovered as an active session after refresh. |

Old `algovault:v2:attempt-history` may remain from an earlier prototype; current code neither reads nor migrates it. Current keys persist until removed or browser storage is cleared; the history cap removes older entries. Invalid saved IDs/records are filtered; corrupt queue data is normalized to at most five valid distinct IDs.

## Fictional data, secrets, and network
Academic paper associations and company-style question histories are **illustrative/unverified**. Algorithm problems are educational examples; familiar company names do not imply endorsement.

No real passwords, API keys, access tokens, private keys, or embedded user identity records were found in reviewed application source/configuration. No `.env` file was present in the inspected root and no environment-variable reads were found in application code. This is not an exhaustive third-party dependency or deployment-secret audit.

No application fetch/XHR/WebSocket/beacon/upload calls were found; this app does not intentionally transmit answers, queue IDs, or progress to a service. Loading the page still requests assets from its host, development tooling may use hot-reload connections, and package installation contacts a registry. Hosting/preview providers may keep access logs under their own policies; those systems were not audited.

A template external Dyad link and cookie-writing sidebar component exist but are not mounted by the current app. Current custom navigation does not use that sidebar cookie. No active authentication, analytics, or app-managed sessionStorage was found.

## User control and limits
localStorage is unencrypted and shared by scripts on the same origin; it is not an account or secure vault. Anyone using this browser profile may see progress. Storage can be blocked/cleared; warnings disclose memory-only fallback. No cross-device or cross-tab synchronization exists. Use DOC-06 for deliberate, key-specific deletion; do not use real personal or secret information in demonstrations.
