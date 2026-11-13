# DOC-02 — Judge Runbook

**Target: 60 seconds; not a recorded or timed test result.** Prepare a separate fresh browser profile at the same preview URL, leaving the owner's progress untouched. Select an offered year and enter AlgoVault before starting. Start on Dashboard with zero practised questions and an empty queue. No seeded completion or fabricated stats.

1. **0–12s — Discover:** click **Question Bank → Filters**. Choose **Subject: Data Structures**, **Semester: Semester 3**, **Year: 2022**; search `Two Sum`. Expected: **Two Sum using Hashing**.
2. **12–18s — Track:** click its empty circle, then **Dashboard**. Expected: practised count becomes 1 and completion updates. This Easy question is now ineligible for a new pin until practice is undone.
3. **18–32s — Official twist:** return to **Question Bank** (fresh filters). Pin **Reverse a Linked List**, **Merge Sort**, **Binary Tree Traversal**, **0/1 Knapsack**, and **Maximum Subarray Sum**. Expected: five distinct saved questions.
4. **32–38s — Boundary:** try pinning **Valid Parentheses**. Expected: “Queue full — maximum five questions”; no item is evicted. Open **Revise Next**: **5 / 5 slots filled**.
5. **38–46s — Practice and clear:** click **Mark Practised & Clear** on Reverse a Linked List. Expected: success feedback, that card disappears, occupancy 4/5, total practised becomes 2.
6. **46–51s — Remove only:** click **Remove from Queue** on Merge Sort. Expected: 3/5; Merge Sort remains unanswered and practised count stays 2.
7. **51–60s — Persistence:** refresh the preview, return to **Revise Next**, then **Dashboard**. Expected: three saved questions and two practised questions remain. Show Topics to Revisit as time permits.

**Optional separate extension, not part of the 60 seconds:** Time Machine → Amazon / 2024 / Mixed → Start simulation. Submit `[0, 0]`, save/next; `No solution`, save/next; correct Dijkstra complexity, save. Open Code Autopsy on a mistake, step the trace, retry correctly, then Challenge your ghost.

**Say explicitly:** academic associations and company tags are illustrative. Signature answers use deterministic fixtures; diagnostic traces are predefined and ghost events come from real local interactions. No code is executed. Capture actual results; if anything differs, record a failure rather than narrating an expected result as observed.
