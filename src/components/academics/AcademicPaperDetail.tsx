import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { RevisionPinButton } from '@/components/revision/RevisionPinButton';
import type { AcademicPaper } from '@/data/academics';
import { academicCompletion, paperQuestions } from '@/utils/academics';
import { Completion } from './AcademicShared';

export function AcademicPaperDetail({ paper, practised, revision, onPractice, onPin, onBack }: { paper: AcademicPaper; practised: Set<string>; revision: string[]; onPractice: (ids: string[], value: boolean) => void; onPin: (id: string) => void; onBack: () => void }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState('');
  const questions = paperQuestions(paper);
  const stats = academicCompletion(paper.questionIds, practised);
  // Individual, selected, topic and paper actions all submit IDs to the same
  // parent state. Topic callers select IDs from this paper, not the global topic.
  const apply = (ids: string[], value: boolean) => {
    if (!ids.length) { toast.info('Select at least one question to continue.'); return; }
    const unique = [...new Set(ids)];
    const next = new Set(practised);
    unique.forEach(id => value ? next.add(id) : next.delete(id));
    onPractice(unique, value);
    const result = `${unique.length} question${unique.length === 1 ? '' : 's'} marked as ${value ? 'practised' : 'unpractised'}. Paper progress: ${academicCompletion(paper.questionIds, next).percentage}%.`;
    setMessage(result); toast.success(result); setSelected(new Set());
  };
  return <div className="space-y-5"><Button variant="outline" className="rounded-xl text-indigo-700" onClick={onBack}>← Back to Paper Library</Button><header className="surface-card space-y-4"><p className="section-kicker">Semester {paper.semester} · {paper.year} · {paper.examinationType}</p><h2 className="text-2xl font-bold sm:text-3xl">{paper.title}</h2><p className="text-sm text-slate-600">{stats.total} questions · {questions.reduce((sum, q) => sum + q.marks, 0)} marks · Illustrative examination paper</p><Completion ids={paper.questionIds} practised={practised} label={paper.title}/><div className="flex flex-wrap gap-2"><Button className="rounded-xl bg-indigo-600 hover:bg-indigo-700" onClick={() => apply(paper.questionIds, true)}>Mark Paper as Practised</Button><Button variant="outline" className="rounded-xl" onClick={() => apply(paper.questionIds, false)}>Mark Paper as Unpractised</Button></div></header>
    {stats.complete && <div role="status" className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 font-bold text-emerald-800"><CheckCircle2/>Paper Completed — 100%</div>}
    <p role="status" aria-live="polite" className="text-sm font-semibold text-indigo-700">{message}</p>
    <section className="surface-card"><h3 className="text-lg font-bold">Topic progress in this paper</h3><p className="mt-1 text-xs text-slate-600">Actions affect only this paper’s questions in the named topic.</p><div className="mt-4 grid gap-4 sm:grid-cols-2">{[...new Set(questions.map(q => q.topic))].map(topic => { const ids = questions.filter(q => q.topic === topic).map(q => q.id); return <div key={topic} className="space-y-3 rounded-xl border border-slate-200 p-4"><h4 className="font-semibold">{topic}</h4><Completion ids={ids} practised={practised} label={topic}/><div className="flex flex-wrap gap-2"><Button size="sm" className="rounded-lg bg-indigo-600 hover:bg-indigo-700" onClick={() => apply(ids, true)}>Mark Topic as Practised</Button><Button size="sm" variant="outline" className="rounded-lg" onClick={() => apply(ids, false)}>Mark Topic as Unpractised</Button></div></div>; })}</div></section>
    <div className="sticky top-0 z-10 rounded-xl border border-indigo-200 bg-indigo-50 p-4 shadow-sm"><div className="flex flex-wrap items-center gap-3"><label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" className="h-4 w-4 accent-indigo-600" checked={selected.size === questions.length} onChange={e => setSelected(e.target.checked ? new Set(paper.questionIds) : new Set())}/>Select all visible questions</label><span className="text-sm font-bold text-indigo-900">{selected.size} questions selected</span><Button disabled={!selected.size} className="rounded-xl bg-indigo-600 hover:bg-indigo-700" onClick={() => apply([...selected], true)}>Mark Selected as Practised</Button>{selected.size > 0 && <><Button variant="outline" className="rounded-xl bg-white" onClick={() => apply([...selected], false)}>Mark Selected as Unpractised</Button><Button variant="ghost" className="rounded-xl text-indigo-700" onClick={() => setSelected(new Set())}>Clear Selection</Button></>}</div>{!selected.size && <p className="mt-2 text-xs text-slate-600">Select at least one question to continue.</p>}</div>
    <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-5 sm:px-10">{questions.map((q, index) => <article key={q.id} className="py-7"><div className="flex items-start gap-3"><input aria-label={`Select question ${index + 1}`} type="checkbox" checked={selected.has(q.id)} className="mt-1 h-5 w-5 shrink-0 accent-indigo-600" onChange={e => { const next = new Set(selected); e.target.checked ? next.add(q.id) : next.delete(q.id); setSelected(next); }}/><div className="min-w-0 flex-1"><div className="flex flex-wrap justify-between gap-2 text-sm"><strong className="text-indigo-800">Question {index + 1}</strong><span className={practised.has(q.id) ? 'font-bold text-emerald-700' : 'text-slate-600'}>{practised.has(q.id) ? '✓ Practised' : 'Unpractised'}</span></div><p className="mt-3 whitespace-pre-wrap text-base leading-8 text-slate-900">{q.description}</p><p className="mt-3 text-xs text-slate-600">{q.topic} · {q.marks} marks · {q.difficulty} · {q.format}</p><div className="mt-4 flex flex-wrap items-start gap-3"><Button variant="outline" className="rounded-xl text-indigo-700" onClick={() => apply([q.id], !practised.has(q.id))}>{practised.has(q.id) ? 'Mark Unpractised' : 'Mark Practised'}</Button><RevisionPinButton question={q} practised={practised.has(q.id)} pinned={revision.includes(q.id)} onClick={() => onPin(q.id)}/></div></div></div></article>)}</div>
  </div>;
}
