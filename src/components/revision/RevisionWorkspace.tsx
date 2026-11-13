import { BookOpen, CheckCircle2, Pin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Question } from '@/types/question';
import { REVISION_CAPACITY, topicsToRevisit } from '@/utils/revision';

interface Props {
  revision: string[];
  practised: Set<string>;
  questionsById: Map<string, Question>;
  onRemove: (id: string) => void;
  onComplete: (id: string) => void;
  openQuestion: (q: Question) => void;
  onExplore: (topic?: string) => void;
}
export function RevisionWorkspace({ revision, practised, questionsById, onRemove, onComplete, openQuestion, onExplore }: Props) {
  const weakTopics = topicsToRevisit(practised);
  return <div className="mx-auto max-w-4xl space-y-6 animate-in">
    <header className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow"><Pin size={13}/> Weak-topic review</p><h1 className="page-title">Revise next</h1><p className="page-subtitle">A focused queue for unanswered and difficult questions.</p></div><strong role="status" className="capacity text-indigo-700">{revision.length} / {REVISION_CAPACITY} slots filled</strong></header>
    <section className="surface-card !border-indigo-100 !bg-indigo-50"><div className="flex justify-between gap-3 text-sm font-bold text-indigo-950"><span>Your revision capacity</span><span>{REVISION_CAPACITY - revision.length} available</span></div><progress aria-label="Revision slots filled" max={REVISION_CAPACITY} value={revision.length} className="mt-4 h-2 w-full accent-indigo-600"/><p className="mt-3 text-xs text-indigo-800">{revision.length === REVISION_CAPACITY ? 'Queue full — maximum five questions. Clear or remove one to free a slot.' : 'Pin any unanswered question, or revisit a Hard question even after practice.'}</p></section>
    {revision.length === 0 ? <section className="surface-card flex flex-col items-center py-12 text-center"><div className="empty-stack"><CheckCircle2 size={28}/></div><h2 className="mt-5 text-lg font-bold">All caught up! Your revision queue is clear.</h2><p className="mt-2 max-w-sm text-sm text-slate-600">Choose a question that needs another look, and build your next focused session.</p><Button className="mt-5 rounded-xl bg-indigo-600 hover:bg-indigo-700" onClick={() => onExplore()}><BookOpen size={16} className="mr-2"/>Explore Question Bank</Button></section> : <div className="space-y-3">{revision.map(id => {
      const q = questionsById.get(id);
      if (!q) return null;
      const done = practised.has(id);
      return <article key={id} className="surface-card space-y-4 !p-5"><div className="flex flex-wrap items-center gap-2"><span className={`rounded-md px-2 py-1 text-xs font-bold ${q.difficulty === 'Hard' ? 'bg-rose-50 text-rose-800' : 'bg-indigo-50 text-indigo-800'}`}>{q.difficulty}{q.difficulty === 'Hard' ? ' · Difficult' : ''}</span><span className={`rounded-md px-2 py-1 text-xs font-bold ${done ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>{done ? 'Practised' : 'Unanswered'}</span><span className="text-xs text-slate-600">{q.topic}</span></div><button onClick={() => openQuestion(q)} className="text-left text-base font-bold text-slate-900 hover:text-indigo-700">{q.title}</button><p className="text-xs text-slate-600">{q.subject ?? 'Placement practice'}{q.year ? ` · ${q.year} · ${q.semester}` : ''}</p><div className="flex flex-wrap gap-2"><Button onClick={() => done ? onRemove(id) : onComplete(id)} className="rounded-xl bg-indigo-600 hover:bg-indigo-700">{done ? 'Clear from Queue' : 'Mark Practised & Clear'}</Button><Button variant="outline" className="rounded-xl" onClick={() => onRemove(id)}>Remove from Queue</Button><Button variant="ghost" className="rounded-xl text-indigo-700" onClick={() => openQuestion(q)}>View Question <ArrowRight size={14} className="ml-2"/></Button></div><p className="text-xs text-slate-500">Removing only clears the queue; it never changes your practised status.</p></article>;
    })}</div>}
    <section className="surface-card"><p className="section-kicker">Based on your actual progress</p><h2 className="section-title">Topics to Revisit</h2><p className="mt-2 text-xs text-slate-600">Lowest completion first. These are review suggestions, not inferred ability scores.</p>{weakTopics.length ? <div className="mt-5 grid gap-3 sm:grid-cols-3">{weakTopics.map(item => <div key={item.topic} className="rounded-xl border border-slate-200 p-4"><h3 className="text-sm font-bold">{item.topic}</h3><p className="mt-2 text-xs text-slate-600">{Math.round(item.ratio * 100)}% completed · {item.completed}/{item.total}</p><progress aria-label={`${item.topic} completion`} value={item.completed} max={item.total} className="my-3 h-2 w-full accent-indigo-600"/><button onClick={() => onExplore(item.topic)} className="text-left text-xs font-bold text-indigo-700 hover:underline">View {item.total - item.completed} unanswered →</button></div>)}</div> : <p className="mt-5 text-sm text-emerald-800">Every topic is complete. You can still pin Hard questions for review.</p>}</section>
  </div>;
}
