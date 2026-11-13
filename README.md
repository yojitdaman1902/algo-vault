# AlgoVault — 4minute read

**Ace Your Semesters. Crack Your Placements.**

AlgoVault is a browser-based academic and placement preparation platform built for **OWASP NIE VibeSprint 1.0 — Problem Card 17 (PYQ Bank)**.

Our goal is simple: help students prepare for semester exams, practise for placements, and track their progress in one place.

## Features

### Campus Academics
- **14 sample papers, 70 questions, 12 subjects**, covering semesters 1–4 and years 2022–2026.
- Filter by semester, subject, year, examination type, topic, or keyword.
- Mark individual questions, entire topics, or papers as practised.
- Track completion through automatically updated progress indicators.
- Undo practice actions and clear filters when no results appear.

### Placement Preparation
- **92 OA MCQs** covering DSA, Quantitative Aptitude, Logical Reasoning, and Verbal Ability.
- **Mini OA:** Eight-question assessments across all four categories.
- **DSA Time Machine:** Three-question practice simulations.
- **Code Autopsy:** Visual explanations of two predefined coding mistakes.
- **Ghost Mode:** Compare performance with your saved previous attempts.

### Revise Next — Minute 40 Twist
Pin up to **five unanswered or difficult questions** for revision.

Remove questions individually or use **Mark Practised & Clear**. Duplicate pins and attempts to exceed five items are prevented.

## Getting Started

**Tech stack:** React 19, TypeScript, Vite 8, Tailwind CSS, React Router, and shadcn/Radix UI.

Requires Node.js 22.12+ (recommended) and npm.

```bash
npm install
npm run dev
```

Open the local URL displayed in your terminal (configured for port 8080).

To validate or preview the production build:

```bash
npm run lint
npm run build
npm run preview
```

No login, database, external API, or `.env` file is required.

## How to Use

1. Open **Campus Academics** and filter papers by semester, subject, or year.
2. Select a paper and mark questions as practised.
3. Watch your progress update automatically.
4. Pin difficult questions to **Revise Next** and clear them after practice.

## Judge Demo — 60 Seconds

1. Navigate to **Campus Academics → Explore PYQ Papers**.
2. Filter **Semester 3 → Data Structures → 2025 → End-Semester Examination**.
3. Mark Q1 and Q2 practised. Expected progress: **40%**.
4. Mark the Trees topic practised. Expected progress: **80%**.
5. Complete the paper to reach **100%**.
6. Pin an eligible question to Revise Next, then remove it.

These are expected results, not recorded test outcomes.

## Five-Test Checklist

| Test | Expected result |
|---|---|
| Search with no matches | Empty state with Clear Filters |
| Mark a question practised | Progress updates |
| Attempt a sixth revision pin | Rejected; queue stays at five |
| Refresh the page | Saved progress persists |
| Mark an entire paper practised | Completion reaches 100% |

For an empty-result demonstration, select **Semester 3 + Data Structures + 2026**.

## Privacy & Limitations

- All academic papers and company associations are illustrative.
- Progress, revision queues, and attempt history are stored locally in the browser.
- No personal account or external data service is required.
- Academic practice is self-reported, not automatically graded.
- Code Autopsy uses predefined examples; arbitrary code execution and AlgoIDE are not implemented.
- A standalone Performance Intelligence module is not implemented.
- Automated tests are not configured. Build, lint, and runtime checks were not executed during the final audit.

## Documentation

See **EVALUATION_GUIDE.md** for implementation references, architecture, requirement mapping, and verification details.

---

**Built for VibeSprint 1.0 — One platform for semester exams and campus placements.**
