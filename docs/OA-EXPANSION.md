# OA expansion — judge feedback response

**AlgoVault — One Platform. Every Round. Placement Ready.**

## Implemented scope
- Shared bank now covers Coding & DSA, Quantitative Aptitude, Logical Reasoning, and Verbal Ability / English.
- All 43 original records/IDs remain. Added 10 Quant, 10 LR, 10 Verbal, and 2 objectively gradable DSA MCQs: 75 total (45 Coding & DSA, 10 in each other category).
- `Question` gains optional category, questionType, options, correctAnswer, explanation. Missing category means Coding & DSA; missing questionType remains informational. Existing `companies` holds company tags; `type` still distinguishes Academic PYQ from Placement Practice. No incompatible duplicate category models.
- Every new question has four choices, one exact correct answer, explanation, topic and difficulty. New 2025/TCS/Accenture associations are illustrative, not verified OA histories. Academic subject/semester are deliberately absent.
- Category AND keyword/subject/semester/year/company/topic/difficulty/unanswered filters. Filters are never silently ignored. Retained academic filters receive an explicit explanation and a targeted reset action for non-DSA categories.
- Detail practice: select, submit, correct/incorrect, reveal, explanation, retry. No submission without selection. Practise toggle and pin use existing central state.
- Dashboard and My Progress display actual category completion and tied highest/lowest categories. These are completion signals, not measured mastery. A larger denominator changes overall percentage without deleting prior completions.
- Shared five-item Revise Next and existing eligibility remain unchanged across all categories. No new persistence keys or reset/migration of prior progress.

## Mixed Mini OA
Open Question Bank → Try the 8-question Mini OA. Two Quant, two LR, two Verbal, two DSA questions; Demo 3 minutes or Practice 12 minutes. Reuses TimedAssessment and genuine attempt tracking; same clock across questions. Duplicate saves are ignored.

Score = correct / 8; per-category score = correct / 2. Accuracy is correct / submitted (N/A with zero submissions). Saving without a submitted answer is unanswered; unvisited questions are unanswered too. No negative marking. Report shows time, counts, category recommendations, correct answers and explanations. Hints reveal explanations and their use is recorded, so this is educational practice rather than a proctored test.

Finished Mini OA attempts use existing v3 history and count toward its 100-record cap. The legacy Ghost library still lists the original curated DSA fixtures, not Mini OA questions. Standalone bank MCQ answer selections/retries are transient and do not create Ghost history. Manual practised flags persist; grading never changes them automatically. Reports/current rounds do not resume after refresh.

## Quick demo
1. Question Bank → Quantitative Aptitude → A percentage of a quantity.
2. With no option selected, Submit is disabled. Select 40 → Submit → Incorrect, answer 50, explanation. Retry → 50 → Correct.
3. Mark as practised; Dashboard shows Quant 1/10 (assuming fresh Quant progress). Undo is available.
4. Pin unanswered questions from Quant, LR, Verbal, and DSA. The single queue holds at most five. Complete one with Mark Practised & Clear; refresh to check persistence.
5. Mini OA answer key in order: **50; 36; 37; Some musicians are trained; has; Brief; O(log n); 7**. All eight should produce 8/8, four 2/2 category scores, 100% accuracy. Finishing without submission should produce 0/8, 0 answered, 8 unanswered, N/A accuracy.
6. Regression: All categories → Data Structures + Semester 3 + 2022 + Two Sum. Original academic question remains. Time Machine Amazon/2024/Mixed retains its original three-question fixture selection.

## Answer-key content review (performed by source inspection, not execution)
- Quant 01–10: 50; 36; 18; 7.2 days; 15%; 10 seconds; 1/9; 4% decrease; 48 km/h; 3/10. Reviewed arithmetic, ordered dice outcomes, equal-distance harmonic mean and without-replacement probability.
- LR 01–10: 37; Some musicians are trained; B; 3 m east; DBU; badge not valid; box cannot be determined; 23rd; 45; Some roses are not stones. Reviewed explicit pattern rule, set implications, unique seating, directions, letter shifts, modus tollens, tautological coin statements, rank formula and existential syllogism.
- Verbal 01–10: has; Brief; Abundant; determined; He did not go to class.; an; Attendance increased; Most surveyed volunteers preferred mornings; would have caught; on. Reviewed singular agreement, meanings, contrast, base verb after did, vowel sound, passage support and third conditional.
- DSA: O(log n); 7. Reviewed halving recurrence and LIFO sequence.

Each entry's four options, selected key and explanation were inspected for consistency. These are educational sample fixtures, not a psychometrically validated assessment bank.

## Runtime verification checklist — NOT RUN
1. Four category counts (45/10/10/10) and selector results.
2. Original subject+semester+year+keyword conjunction, plus all extra filters.
3. Cross-category academic-filter warning and both Clear Filters actions.
4. Nonexistent keyword empty state.
5. Every new MCQ: correct and wrong choices, explanation, retry, empty submission guard.
6. Mark/undo category progress; highest/lowest ties; total progress reflects expanded denominator.
7. Mixed-category pinning, duplicate guard, five-item limit, sixth rejection, remove vs complete.
8. Refresh: old saved IDs and new practised/queued IDs survive; no lost legacy progress.
9. Original Time Machine, autopsy traces and Ghost replay/regression.
10. Mini OA perfect/wrong/skipped/early-finish/timeout paths; category totals and accuracy; no duplicate scoring on repeated save.
11. Mobile dialog scrolling, radio/select/button keyboard access, desktop layout and console errors.
12. Production build and TypeScript checks.

No build/typecheck/browser runner is available in this session. Only source/data review and integration searches were performed; no runtime pass, screenshot or demo URL is claimed.

## Files and limitations
New: data/oaQuestions.ts, data/oaAssessments.ts, utils/oa.ts, questions/McqPractice.tsx, questions/QuestionDetail.tsx, progress/CategoryProgress.tsx, signature/MiniOA.tsx. Updated shared type/data/bank/workspace and assessment registry; original signature selection preserved.

Still local-only: no APIs, authentication, backend, keys, arbitrary code execution or PDF dependencies. Saved data remains browser/origin-specific and unencrypted. No new dependencies. Existing DOC cards remain available; this expansion note supersedes older statements that the whole product is DSA-only or that only five assessable fixtures exist globally.
