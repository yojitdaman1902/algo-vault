import type { AcademicPaper } from '@/data/academics';
import { academicCompletion } from '@/utils/academics';
import { Button } from '@/components/ui/button';
import { CheckCircle2, FileText } from 'lucide-react';

export function Completion({ ids, practised, label }: { ids: string[]; practised: Set<string>; label: string }) {
  const stats = academicCompletion(ids, practised);
  return <div className="space-y-2"><div className="flex justify-between gap-3 text-sm"><span>{stats.done} / {stats.total} practised</span><strong className={stats.complete ? 'text-emerald-700' : 'text-indigo-700'}>{stats.percentage}%</strong></div><progress aria-label={`${label} completion`} value={stats.done} max={stats.total || 1} className="block h-2 w-full overflow-hidden rounded-full accent-indigo-600"/></div>;
}
export function PaperCard({ paper, practised, onOpen }: { paper: AcademicPaper; practised: Set<string>; onOpen: (id: string) => void }) {
  const stats = academicCompletion(paper.questionIds, practised);
  return <article className="surface-card flex flex-col gap-4 !p-5"><div className="flex items-center justify-between gap-2"><FileText className="text-indigo-600" size={22}/><span className={`rounded-full px-3 py-1 text-xs font-bold ${stats.complete ? 'bg-emerald-50 text-emerald-800' : 'bg-indigo-50 text-indigo-800'}`}>{stats.complete ? 'Completed' : stats.done ? 'In progress' : 'Not started'}</span></div><div className="flex-1"><h3 className="text-lg font-bold text-slate-900">{paper.title}</h3><p className="mt-2 text-sm text-slate-600">Semester {paper.semester} · {paper.year}</p><p className="mt-1 text-xs text-slate-600">{paper.examinationType}</p></div><Completion ids={paper.questionIds} practised={practised} label={paper.title}/><p className="text-xs text-slate-500">Illustrative / demo paper · Not a verified PYQ</p><Button onClick={() => onOpen(paper.paperId)} className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700">{stats.complete && <CheckCircle2 size={16} className="mr-2"/>}View Paper</Button></article>;
}
export function DemoNotice() { return <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900">Illustrative academic data: all papers are fictional demonstration papers, not verified past university examinations. Practice is self-reported, not graded.</p>; }
