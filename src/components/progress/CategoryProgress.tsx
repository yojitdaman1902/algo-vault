import { questions } from '@/data/questions';
import { categoryProgress } from '@/utils/oa';

export function CategoryProgress({ practised }: { practised: Set<string> }) {
  const groups = categoryProgress(questions, practised);
  const max = Math.max(...groups.map(g => g.ratio));
  const min = Math.min(...groups.map(g => g.ratio));
  return <section className="surface-card mb-6"><p className="eyebrow">AlgoVault — One Platform. Every Round. Placement Ready.</p><h2 className="section-title">Your OA preparation</h2><div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{groups.map(g => <div key={g.category} className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-4"><h3 className="text-sm font-bold text-slate-800">{g.category}</h3><p className="my-3 text-xl font-bold text-indigo-700">{Math.round(g.ratio * 100)}% <span className="text-xs font-normal text-slate-600">· {g.done} / {g.total} practised</span></p><progress className="h-2 w-full accent-indigo-600" value={g.done} max={g.total} aria-label={`${g.category} completion`}/></div>)}</div><p className="mt-4 text-xs leading-6 text-slate-600">{max === min ? 'All categories have equal completion. Choose any category to build your next session.' : <>Highest completion: {groups.filter(g => g.ratio === max).map(g => g.category).join(', ')}. Lowest completion: {groups.filter(g => g.ratio === min).map(g => g.category).join(', ')}.</>} Completion reflects marked practice, not measured mastery. Overall percentages now include the expanded library; your saved completions are unchanged.</p></section>;
}
