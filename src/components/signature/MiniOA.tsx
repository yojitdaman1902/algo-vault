import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { categories } from '@/types/question';
import { questions } from '@/data/questions';
import { miniOaQuestions } from '@/data/oaAssessments';
import { categoryOf } from '@/utils/oa';
import type { QuestionAttempt } from '@/types/assessment';
import { TimedAssessment } from './TimeMachine';
import { time } from './AttemptPanel';

export function MiniOA({ onBack }: { onBack: () => void }) {
  const [stage, setStage] = useState<'setup' | 'running' | 'results'>('setup');
  const [mode, setMode] = useState<'demo' | 'practice'>('demo');
  const [attempts, setAttempts] = useState<QuestionAttempt[]>([]);
  const [total, setTotal] = useState(0);
  const correct = attempts.filter(a => a.finalResult === 'correct').length;
  const answered = attempts.filter(a => a.answerSubmissions.length > 0).length;
  return <div className="space-y-5"><button className="text-sm font-bold text-indigo-700" onClick={() => { if (stage !== 'running' || window.confirm('Leave this Mini OA? Completed question attempts remain saved; this round cannot resume.')) onBack(); }}>← Question Bank</button><p className="eyebrow">Illustrative mixed OA · not a verified company round</p>
    {stage === 'setup' && <section className="surface-card space-y-5"><h1 className="page-title">One Platform. Every Round.</h1><p className="text-sm leading-7 text-slate-600">Eight objectively graded questions: two Quant, two Logical Reasoning, two Verbal, and two Coding & DSA. One shared clock. One point per correct answer, no negative marking.</p><label className="block text-sm font-bold">Duration<select className="ml-3 rounded-xl border p-3" value={mode} onChange={e => setMode(e.target.value as 'demo' | 'practice')}><option value="demo">Demo · 3 minutes</option><option value="practice">Practice · 12 minutes</option></select></label><Button className="rounded-xl bg-indigo-600" onClick={() => setStage('running')}>Start Mini OA</Button><p className="text-xs text-slate-500">Questions are fixed demonstration fixtures. Submit an answer before Save & next; saving without submission counts as unanswered. Hints reveal explanations and are recorded. Assessment results do not automatically mark bank questions practised.</p></section>}
    {stage === 'running' && <TimedAssessment config={{ company: 'Mixed Mini OA (illustrative)', interviewYear: '2025', graduationYear: '', difficulty: 'Mixed', mode }} questions={miniOaQuestions} onFinish={(items, elapsed) => { setAttempts(items); setTotal(elapsed); setStage('results'); }}/>} 
    {stage === 'results' && <><section className="rounded-2xl bg-indigo-950 p-7 text-white"><h1 className="text-4xl font-bold">{correct} / 8</h1><p className="mt-3">Score: {Math.round(correct / 8 * 100)}% · Answered: {answered} · Unanswered: {8 - answered}</p><p className="mt-2 text-sm text-indigo-100">Accuracy among submitted answers: {answered ? `${Math.round(correct / answered * 100)}%` : 'N/A — no submissions'} · Time taken: {time(total)}</p></section><div className="grid gap-3 sm:grid-cols-2">{categories.map(category => { const ids = miniOaQuestions.filter(q => categoryOf(questions.find(item => item.id === q.id)!) === category).map(q => q.id); const done = attempts.filter(a => ids.includes(a.questionId) && a.finalResult === 'correct').length; return <section className="surface-card" key={category}><h2 className="font-bold">{category}</h2><p className="mt-2 text-xl font-bold text-indigo-700">{done} / {ids.length}</p><p className="mt-2 text-xs text-slate-600">{done === ids.length ? 'All correct in this small sample.' : 'Recommended revision: review the incorrect or unanswered questions below.'}</p></section>; })}</div><section className="surface-card space-y-4"><h2 className="section-title">Answer review</h2>{miniOaQuestions.map(q => { const a = attempts.find(item => item.questionId === q.id); return <article key={q.id} className="border-t pt-4 text-sm"><h3 className="font-bold">{q.title} — {a?.finalResult ?? 'unanswered'}</h3><p className="mt-1 text-slate-600">Your answer: {a?.answerSubmissions[0] ?? 'Not submitted'} · Active time: {time(a?.elapsedMs ?? 0)}</p><p className="mt-2 text-indigo-800">Correct: {q.correctAnswer}</p><p className="mt-1 leading-6">{q.explanation}</p></article>; })}</section><Button className="rounded-xl bg-indigo-600" onClick={() => { setAttempts([]); setTotal(0); setStage('setup'); }}>Try another round</Button></>}
    <p className="text-xs leading-6 text-slate-500">Local deterministic evaluation only. No code execution. Finished question attempts persist in existing attempt history; this summary and unfinished session do not survive refresh.</p>
  </div>;
}
