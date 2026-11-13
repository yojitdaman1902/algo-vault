# DOC-03 — Five-Test Checklist

**Execution status: all five NOT RUN in this audit.** Source inspection is not a browser test. Use a separate fresh profile or record your starting counts; do not erase the owner's data. Record browser, date, observed result, and evidence when executing.

| # | Test | Steps | Expected result | Status |
|---|---|---|---|---|---|
| 1 | Invalid input / no match | Open Question Bank; search `zzzz-nonexistent`; then click **Clear Filters**. | Zero cards and “No questions match your current filters.” Reset restores the library, with search and all filters cleared. | NOT RUN |
| 2 | Successful main journey | From an empty practise state, choose Data Structures + Semester 3 + 2022 and search `Two Sum`. Click the empty practice circle, then Dashboard/My Progress. | Only Two Sum using Hashing matches. Practised count becomes 1 and completion/topic progress update. Returning to the question shows practised status and an explained disabled pin (Easy). Clicking the practice circle again undoes it. | NOT RUN |
| 3 | Twist functionality | Ensure Two Sum and Reverse a Linked List are unanswered and queue empty. Pin both; inspect the queue. Open an already-pinned card and inspect the control. In Revise Next, **Mark Practised & Clear** Two Sum; **Remove from Queue** Reverse. | One entry per ID; already-pinned action is explicitly removal, not another insertion. Completion marks Two Sum and frees a slot; removal leaves Reverse unanswered. Queue ends empty with the caught-up message and working Explore Question Bank button. | NOT RUN |
| 4 | Reset / refresh persistence | Clear Filters after combining criteria. Mark one known question practised and pin two other unanswered questions. Note IDs/counts; refresh. Reopen queue and progress. | Filter reset does not erase progress or pins. Refresh retains the exact two queued IDs and practised question. Existing saved state is not replaced with demo data. If storage is blocked, warning discloses that persistence cannot be guaranteed. | NOT RUN |
| 5 | Boundary: sixth queue item | Start with empty queue. Ensure the first six bank questions are unanswered; pin the first five. Try the sixth. Remove one, then pin the sixth again. | Exactly 5/5; sixth initially rejected with “Queue full — maximum five questions”, no eviction or duplicate. Removal yields 4/5; retry succeeds at 5/5. | NOT RUN |

No pass claims or screenshots are supplied. These are exactly five manual tests; broader regression and accessibility checks remain in the root TASKS.md.
