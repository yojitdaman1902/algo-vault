import { academicSubjects, academicQuestions, academicPapers, academicPaperById, examinationTypes } from '@/data/academics';
import { emptyAcademicFilters, filterAcademicPapers, filterAcademicQuestions, type AcademicFilters } from '@/utils/academics';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PaperCard } from './AcademicShared';
import { RevisionPinButton } from '@/components/revision/RevisionPinButton';

interface Props {
  filters: AcademicFilters; setFilters: (filters: AcademicFilters) => void;
  view: 'papers' | 'questions'; setView: (view: 'papers' | 'questions') => void;
  practised: Set<string>; revision: string[]; onOpen: (id: string) => void;
  onPractice: (ids: string[], value: boolean) => void; onPin: (id: string) => void;
}
export function AcademicLibrary({ filters, setFilters, view, setView, practised, revision, onOpen, onPractice, onPin }: Props) {
  const papers = filterAcademicPapers(filters, practised);
  const questions = filterAcademicQuestions(filters, practised);
  const update = (key: keyof AcademicFilters, value: string | boolean) => setFilters({ ...filters, [key]: value });
  const options: { key: 'semester' | 'subject' | 'year' | 'exam' | 'topic'; label: string; all: string; values: { value: string; label: string }[] }[] = [
    { key: 'semester', label: 'Semester', all: 'All Semesters', values: [...new Set(academicPapers.map(p => p.semester))].sort().map(n => ({ value: String(n), label: `Semester ${n}` })) },
    { key: 'subject', label: 'Subject', all: 'All Subjects', values: academicSubjects.map(s => ({ value: s.id, label: s.name })) },
    { key: 'year', label: 'Academic year', all: 'All Years', values: [...new Set(academicPapers.map(p => p.year))].sort().map(year => ({ value: year, label: year })) },
    { key: 'exam', label: 'Examination type', all: 'All Exam Types', values: examinationTypes.map(exam => ({ value: exam, label: exam })) },
    { key: 'topic', label: 'Topic', all: 'All Topics', values: [...new Set(academicQuestions.map(q => q.topic))].sort().map(topic => ({ value: topic, label: topic })) },
  ];
  return <div className="space-y-5"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-2xl font-bold tracking-tight">PYQ Paper Library</h2><div className="flex rounded-xl bg-indigo-50 p-1" role="group" aria-label="Library view">{(['papers', 'questions'] as const).map(mode => <Button key={mode} aria-pressed={view === mode} variant="ghost" className={`rounded-lg capitalize ${view === mode ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'}`} onClick={() => setView(mode)}>{mode}</Button>)}</div></div>
    <section className="rounded-2xl border border-indigo-100 bg-white p-4 sm:p-5"><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{options.map(option => <label key={option.key} className="space-y-1 text-xs font-semibold text-slate-700"><span>{option.label}</span><select value={filters[option.key]} onChange={event => update(option.key, event.target.value)} className={`h-11 w-full rounded-xl border bg-white px-3 text-sm ${option.key === 'semester' ? 'border-indigo-300 text-indigo-900' : 'border-slate-200'}`}><option value="">{option.all}</option>{option.values.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>)}<label className="space-y-1 text-xs font-semibold text-slate-700"><span>Keyword search</span><Input value={filters.keyword} onChange={e => update('keyword', e.target.value)} placeholder="Search statements, subjects, topics…" className="h-11 rounded-xl border-slate-200"/></label></div><div className="mt-4 flex flex-wrap items-center justify-between gap-3"><label className="flex items-center gap-2 text-sm"><input type="checkbox" className="h-4 w-4 accent-indigo-600" checked={filters.remaining} onChange={e => update('remaining', e.target.checked)}/>Unpractised questions only</label><Button variant="outline" className="rounded-xl text-indigo-700" onClick={() => setFilters({ ...emptyAcademicFilters })}>Clear Filters</Button></div></section>
    <p role="status" className="text-sm text-slate-600">{papers.length} papers · {questions.length} matching questions{view === 'papers' ? ' · Paper progress includes all questions in each paper.' : ''}</p>
    {!questions.length ? <div className="surface-card py-12 text-center"><h3 className="font-semibold">No papers or questions match your selected filters.</h3><Button className="mt-4 rounded-xl bg-indigo-600 hover:bg-indigo-700" onClick={() => setFilters({ ...emptyAcademicFilters })}>Clear Filters</Button></div> : view === 'papers' ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{papers.map(paper => <PaperCard key={paper.paperId} paper={paper} practised={practised} onOpen={onOpen}/>)}</div> : <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-5 sm:px-8">{questions.map(q => <article key={q.id} className="space-y-3 py-6"><p className="text-xs font-semibold text-indigo-700">{q.subject} · {q.semester} · {q.year} · {academicPaperById.get(q.paperId)?.examinationType}</p><h3 className="text-base leading-7 text-slate-900">{q.description}</h3><p className="text-xs text-slate-600">{q.topic} · {q.marks} marks · {q.difficulty} · {practised.has(q.id) ? 'Practised' : 'Unpractised'}</p><div className="flex flex-wrap items-start gap-2"><Button variant="outline" className="rounded-xl text-indigo-700" onClick={() => onPractice([q.id], !practised.has(q.id))}>{practised.has(q.id) ? 'Mark Unpractised' : 'Mark Practised'}</Button><Button variant="ghost" className="rounded-xl text-indigo-700" onClick={() => onOpen(q.paperId)}>View Paper</Button><RevisionPinButton question={q} practised={practised.has(q.id)} pinned={revision.includes(q.id)} onClick={() => onPin(q.id)}/></div></article>)}</div>}
  </div>;
}
