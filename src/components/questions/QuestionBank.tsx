import { useMemo, useState, type ReactNode } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { questions, topics, subjects, companies, years, semesters } from '@/data/questions';
import { categories, type Question, type Category } from '@/types/question';
import { categoryOf } from '@/utils/oa';
import { MiniOA } from '@/components/signature/MiniOA';

type Filters = { year: string; company: string; difficulty: string; topic: string; subject: string; semester: string };
const emptyFilters: Filters = { year: '', company: '', difficulty: '', topic: '', subject: '', semester: '' };
export function QuestionBank({ practised, initialTopic, renderQuestion }: { practised: Set<string>; initialTopic?: string; renderQuestion: (q: Question) => ReactNode }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category | ''>('');
  const [miniOA, setMiniOA] = useState(false);
  const [filters, setFilters] = useState<Filters>({ ...emptyFilters, topic: initialTopic ?? '' });
  const [unanswered, setUnanswered] = useState(Boolean(initialTopic));
  const [showFilters, setShowFilters] = useState(Boolean(initialTopic));
  const filtered = useMemo(() => questions.filter(q => {
    const keywordMatch = `${q.title} ${q.description}`.toLowerCase().includes(search.trim().toLowerCase());
    return keywordMatch && (!category || categoryOf(q) === category) && (!filters.year || q.year === filters.year) && (!filters.company || q.companies.includes(filters.company)) && (!filters.difficulty || q.difficulty === filters.difficulty) && (!filters.topic || q.topic === filters.topic) && (!filters.subject || q.subject === filters.subject) && (!filters.semester || q.semester === filters.semester) && (!unanswered || !practised.has(q.id));
  }), [search, filters, unanswered, practised, category]);
  const active = Object.values(filters).filter(Boolean).length + (search ? 1 : 0) + (unanswered ? 1 : 0) + (category ? 1 : 0);
  const clear = () => { setFilters(emptyFilters); setSearch(''); setUnanswered(false); setCategory(''); };
  const select = (label: string, key: keyof Filters, options: string[]) => <label className="filter-select"><span>{label}</span><select value={filters[key]} onChange={e => setFilters(prev => ({ ...prev, [key]: e.target.value }))}><option value="">All {label}</option>{options.map(o => <option key={o}>{o}</option>)}</select><ChevronDown size={14}/></label>;
  if (miniOA) return <MiniOA onBack={() => setMiniOA(false)}/>;
  return <div className="space-y-5 animate-in">
    <header className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">One Platform. Every Round. Placement Ready.</p><h1 className="page-title">OA Question Bank</h1><p className="page-subtitle">Coding, aptitude, reasoning and English — alongside your academic PYQs.</p></div><button className="primary-button" onClick={() => setMiniOA(true)}>Try the 8-question Mini OA →</button></header>
    <div role="group" aria-label="Question category" className="flex flex-wrap gap-2">{(['', ...categories] as const).map(c => <button key={c} aria-pressed={category === c} onClick={() => setCategory(c)} className={`rounded-xl border px-4 py-3 text-sm font-semibold ${category === c ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-400'}`}>{c || 'All categories'} <span className="ml-1 text-xs">({questions.filter(q => !c || categoryOf(q) === c).length})</span></button>)}</div>
    <section className="surface-card !p-3"><div className="flex flex-col gap-3 md:flex-row"><div className="relative flex-1"><Search size={17} className="absolute left-3.5 top-3.5 text-slate-400"/><input aria-label="Search questions" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by title or keyword..." className="search-input"/></div><button onClick={() => setShowFilters(v => !v)} aria-expanded={showFilters} className="secondary-button justify-center"><Filter size={15}/> Filters{active > 0 ? ` (${active})` : ''}</button>{active > 0 && <button onClick={clear} className="secondary-button justify-center">Clear Filters</button>}</div>
    {showFilters && <div className="mt-3 grid gap-2 border-t border-slate-100 pt-3 sm:grid-cols-2 lg:grid-cols-3">{select('Year', 'year', years)}{select('Company-style tag', 'company', companies)}{select('Difficulty', 'difficulty', ['Easy', 'Medium', 'Hard'])}{select('Topic', 'topic', topics)}{select('Subject', 'subject', subjects)}{select('Semester', 'semester', semesters)}</div>}
    <label className="mt-3 flex w-fit items-center gap-2 text-xs font-semibold text-slate-700"><input type="checkbox" checked={unanswered} onChange={e => setUnanswered(e.target.checked)} className="accent-indigo-600"/>Unanswered questions only</label>
    <p className="mt-3 text-xs leading-5 text-slate-600">Filters stay active across category changes. Subject and semester apply only to academic records; OA MCQs have no academic subject or semester. Clear those filters to see placement MCQs.</p>
    {category && category !== 'Coding & DSA' && (filters.subject || filters.semester) && <p role="status" className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">Academic filters exclude this category. <button className="font-bold underline" onClick={() => setFilters(f => ({ ...f, subject: '', semester: '' }))}>Clear subject & semester</button></p>}
    </section><p role="status" className="text-xs text-slate-600">Showing {filtered.length} questions · Pin unanswered or Hard questions for revision.</p><p className="text-xs text-slate-500">Demonstration data: academic paper associations and company/year tags are fictional or illustrative, not verified historical assessments.</p>
    <div className="space-y-2">{filtered.map(q => <div key={q.id}><p className="mb-1 ml-2 text-[10px] font-bold uppercase tracking-wide text-indigo-700">{categoryOf(q)}{q.questionType === 'mcq' ? ' · MCQ practice' : ''}</p>{renderQuestion(q)}</div>)}{filtered.length === 0 && <section role="status" className="surface-card flex flex-col items-center py-16 text-center"><div className="mb-4 rounded-2xl bg-indigo-50 p-4 text-indigo-600"><Search size={24}/></div><h2 className="font-bold">No questions match your current filters.</h2><p className="mt-2 text-sm text-slate-600">Try a broader keyword, change category, or clear incompatible filters.</p><button onClick={clear} className="primary-button mt-5">Clear Filters</button></section>}</div>
  </div>;
}
