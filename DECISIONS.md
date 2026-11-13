# Decisions

- Use deterministic multiple-choice variants; never score arbitrary code.
- Preserve bank metadata by linking alternate Two Sum input through `bankQuestionId` instead of relabeling an unrelated question.
- Fail closed for insufficient assessment matches. Offer a clearly labeled supported preset rather than silently broadening filters.
- Graduation year is contextual only.
- Diagnose only exact supported wrong responses. Other answers get a general verified explanation.
- One wall-clock deadline per assessment; active question clocks pause while hidden.
- Save genuine events when they occur, never reconstruct hint/submission timestamps at finish.
- Ghost baseline is fastest saved correct attempt, else latest saved attempt. No speed claim for different or incomplete outcomes; no PB with extra hints or mistakes.
- Use fresh v3 signature history because prototype v2 event timings were unreliable. Preserve v1 bank state.
- Store at most 100 completed attempts. No active round resume in this MVP.
