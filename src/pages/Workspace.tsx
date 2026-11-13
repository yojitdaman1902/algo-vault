import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight, BarChart3, BookOpen, Check, CheckCircle2, Circle,
  ClipboardList, Clock3, LayoutDashboard, Menu, Pin,
  PlayCircle, Search, Sparkles, Target, TrendingUp, X, Zap
} from "lucide-react";
import { questions, subjects, years } from "@/data/questions";
import type { Difficulty, Question } from "@/types/question";
import { storage } from "@/utils/storage";
import { completionFor, percent } from "@/utils/progress";
import { SignatureFeatures } from "@/components/signature/SignatureFeatures";
import { QuestionBank } from "@/components/questions/QuestionBank";
import { QuestionDetail } from "@/components/questions/QuestionDetail";
import { CategoryProgress } from "@/components/progress/CategoryProgress";
import { RevisionWorkspace } from "@/components/revision/RevisionWorkspace";
import { RevisionPinButton } from "@/components/revision/RevisionPinButton";
import { addToQueue } from "@/utils/revision";
import { toast } from "sonner";
import CampusAcademics from '@/pages/CampusAcademics';
import { academicQuestions } from '@/data/academics';

type Section = "dashboard" | "bank" | "revision" | "progress" | "time-machine" | "academics";

const difficultyClass: Record<Difficulty, string> = { Easy: "bg-emerald-50 text-emerald-700", Medium: "bg-amber-50 text-amber-700", Hard: "bg-rose-50 text-rose-700" };

function Brand() { return <div className="flex items-center gap-3"><div className="brand-mark"><div className="brand-node" /><div className="brand-line one" /><div className="brand-line two" /></div><div><div className="text-[17px] font-bold tracking-tight text-slate-950">Algo<span className="text-indigo-600">Vault</span></div><div className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">Learn • Practise • Progress</div></div></div>; }

function ProgressBar({ value, color = "bg-indigo-600" }: { value: number; color?: string }) { return <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${value}%` }} /></div>; }

function QuestionCard({ question, practised, pinned, onOpen, onPractise, onPin }: { question: Question; practised: boolean; pinned: boolean; onOpen: () => void; onPractise: () => void; onPin: () => void }) {
  return <article className="question-card group">
    <div className="flex min-w-0 flex-1 gap-3"><button onClick={onPractise} aria-label={practised ? "Mark as unpractised" : "Mark as practised"} className={`mt-1 shrink-0 transition ${practised ? "text-indigo-600" : "text-slate-300 hover:text-indigo-500"}`}>{practised ? <CheckCircle2 size={21} /> : <Circle size={21} />}</button><div className="min-w-0"><div className="mb-2 flex flex-wrap items-center gap-2"><span className={`rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${question.type === "Academic PYQ" ? "bg-violet-50 text-violet-700" : "bg-blue-50 text-blue-700"}`}>{question.type === "Academic PYQ" ? "PYQ" : "Placement"}</span><span className={`rounded-md px-2 py-1 text-[10px] font-bold ${difficultyClass[question.difficulty]}`}>{question.difficulty}</span></div><button onClick={onOpen} className="text-left text-[15px] font-bold leading-snug text-slate-900 hover:text-indigo-600">{question.title}</button><p className="mt-1 line-clamp-1 text-xs leading-5 text-slate-500">{question.description}</p><div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-slate-400"><span className="text-indigo-600">{question.topic}</span>{question.year && <span>{question.year} · {question.semester}</span>}{question.subject && <span className="hidden sm:inline">{question.subject}</span>}</div>{question.companies.length > 0 && <div className="mt-2 flex flex-wrap gap-1">{question.companies.slice(0, 3).map(company => <span key={company} className="rounded-full border border-slate-200 px-2 py-0.5 text-[10px] text-slate-500">{company}</span>)}</div>}</div></div>
    <div className="flex shrink-0 flex-col items-end justify-between gap-3"><RevisionPinButton question={question} practised={practised} pinned={pinned} onClick={onPin} compact/><button onClick={onOpen} className="hidden items-center gap-1 text-xs font-bold text-indigo-600 sm:flex">View <ArrowRight size={13} /></button></div>
  </article>;
}

function StatCard({ icon: Icon, label, value, detail, accent }: { icon: typeof Target; label: string; value: string; detail: string; accent: string }) { return <div className="stat-card"><div className={`stat-icon ${accent}`}><Icon size={18} /></div><div className="mt-4 text-2xl font-bold tracking-tight text-slate-950">{value}</div><div className="mt-1 text-xs font-semibold text-slate-500">{label}</div><div className="mt-3 text-[11px] font-medium text-slate-400">{detail}</div></div>; }

function Dashboard({ practised, revision, year, go }: { practised: Set<string>; revision: string[]; year: string; go: (section: Section) => void }) {
  const completed = questions.filter(q => practised.has(q.id)).length; const overall = percent(completed, questions.length);
  const focusQuestions = questions.filter(q => !practised.has(q.id)).slice(0, 3);
  return <div className="space-y-6 animate-in"><section className="hero-panel"><div className="relative z-10 max-w-xl"><div className="eyebrow"><Sparkles size={13} /> Your workspace · Year {year}</div><h1 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">Every round.<br /><span className="text-indigo-600">Placement ready.</span></h1><p className="mt-3 max-w-md text-sm leading-6 text-slate-600">Prepare for coding, aptitude, reasoning and English while keeping your academic PYQs in one workspace.</p><div className="mt-6 flex flex-wrap gap-3"><button className="primary-button" onClick={() => go("bank")}>Explore questions <ArrowRight size={15} /></button><button className="secondary-button" onClick={() => go("revision")}>Revise next <Pin size={15} /></button></div></div><div className="hero-orbit"><div className="orbit-card top"><span className="text-indigo-600"><Target size={16} /></span><div><b>{overall}%</b><small>completion</small></div></div><div className="orbit-card bottom"><CheckCircle2 size={18} className="text-emerald-500" /><div><b>{completed} practised</b><small>keep going</small></div></div><div className="orbit-core"><Zap size={28} /></div></div></section>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><StatCard icon={BookOpen} label="Total questions" value={String(questions.length)} detail="Across exams & placements" accent="bg-indigo-50 text-indigo-600" /><StatCard icon={CheckCircle2} label="Questions practised" value={String(completed)} detail={`${overall}% of your library`} accent="bg-emerald-50 text-emerald-600" /><StatCard icon={TrendingUp} label="Overall completion" value={`${overall}%`} detail={overall > 0 ? "Momentum is building" : "Start your first solve"} accent="bg-violet-50 text-violet-600" /><StatCard icon={Pin} label="Saved for revision" value={`${revision.length} / 5`} detail={revision.length === 5 ? "Queue is full" : "Your focused queue"} accent="bg-amber-50 text-amber-600" /></div>
    <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]"><section className="surface-card"><div className="flex items-start justify-between"><div><p className="section-kicker">Your momentum</p><h2 className="section-title">Preparation progress</h2></div><span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">{completed} / {questions.length}</span></div><div className="mt-6 flex items-end justify-between"><span className="text-4xl font-bold tracking-tight text-slate-950">{overall}<small className="ml-1 text-xl text-slate-400">%</small></span><span className="text-xs font-medium text-slate-400">overall completion</span></div><div className="mt-3"><ProgressBar value={overall} /></div><div className="mt-5 flex justify-between text-[11px] font-semibold text-slate-400"><span>{completed} completed</span><span>{questions.length - completed} to explore</span></div></section><section className="surface-card"><p className="section-kicker">By topic</p><h2 className="section-title">Where to focus</h2><div className="mt-5 space-y-4">{["Arrays", "Strings", "Linked Lists", "Trees", "Graphs", "Dynamic Programming"].map(topic => { const subset = questions.filter(q => q.topic === topic); const value = completionFor(subset, practised); return <div key={topic}><div className="mb-1.5 flex justify-between text-xs"><span className="font-semibold text-slate-700">{topic}</span><span className="font-bold text-slate-400">{value}%</span></div><ProgressBar value={value} color={value > 60 ? "bg-emerald-500" : "bg-indigo-500"} /></div> })}</div></section></div>
    <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]"><section className="surface-card"><div className="flex items-center justify-between"><div><p className="section-kicker">Pick up where you left off</p><h2 className="section-title">Continue practising</h2></div><button className="text-xs font-bold text-indigo-600" onClick={() => go("bank")}>See all <ArrowRight size={13} className="inline" /></button></div><div className="mt-4 divide-y divide-slate-100">{focusQuestions.map(q => <div key={q.id} className="flex items-center gap-3 py-3"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-indigo-500"><PlayCircle size={16} /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-slate-800">{q.title}</p><p className="mt-0.5 text-[11px] text-slate-400">{q.topic} · {q.difficulty}</p></div><button onClick={() => go("bank")} className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-bold text-slate-600 hover:border-indigo-200 hover:text-indigo-600">Open</button></div>)}{focusQuestions.length === 0 && <p className="py-6 text-center text-sm text-slate-400">Amazing work — every question is practised.</p>}</div></section><section className="surface-card flex flex-col justify-between"><div><p className="section-kicker">Shortcuts</p><h2 className="section-title">Quick actions</h2><p className="mt-2 text-xs leading-5 text-slate-500">Stay consistent with small, focused sessions.</p></div><div className="mt-6 space-y-2"><button onClick={() => go("bank")} className="action-row"><span className="action-icon bg-indigo-50 text-indigo-600"><Search size={15} /></span><span>Explore question bank</span><ArrowRight size={14} /></button><button onClick={() => go("revision")} className="action-row"><span className="action-icon bg-amber-50 text-amber-600"><Pin size={15} /></span><span>Open Revise Next</span><ArrowRight size={14} /></button></div></section></div>
  </div>;
}

function Bank({ practised, revision, setPractised, toggleRevision, openQuestion, initialTopic }: { practised: Set<string>; revision: string[]; setPractised: (id: string) => void; toggleRevision: (id: string) => void; openQuestion: (q: Question) => void; initialTopic?: string }) {
  return <QuestionBank practised={practised} initialTopic={initialTopic} renderQuestion={q => <QuestionCard key={q.id} question={q} practised={practised.has(q.id)} pinned={revision.includes(q.id)} onOpen={() => openQuestion(q)} onPractise={() => setPractised(q.id)} onPin={() => toggleRevision(q.id)} />} />;
}


function ProgressPage({ practised }: { practised: Set<string> }) { const completed = questions.filter(q => practised.has(q.id)).length; const group = (key: keyof Question) => { const values = [...new Set(questions.map(q => q[key]).filter((v): v is string => typeof v === "string"))]; return values.map(value => { const subset = questions.filter(q => q[key] === value); return { value, done: subset.filter(q => practised.has(q.id)).length, total: subset.length }; }).sort((a,b) => b.total - a.total); }; const topicsProgress = group("topic"); return <div className="space-y-6 animate-in"><div><div className="eyebrow"><BarChart3 size={13} /> Your progress</div><h1 className="page-title">Progress, made visible.</h1><p className="page-subtitle">A truthful snapshot built from your practice history.</p></div><div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr]"><section className="surface-card flex flex-col justify-between"><div><p className="section-kicker">Overall completion</p><div className="mt-5 flex items-end gap-2"><span className="text-6xl font-bold tracking-[-0.06em] text-slate-950">{percent(completed, questions.length)}</span><span className="mb-2 text-xl font-bold text-slate-400">%</span></div><p className="mt-2 text-sm text-slate-500">{completed} completed of {questions.length} total questions</p></div><div className="mt-8"><ProgressBar value={percent(completed, questions.length)} /><div className="mt-3 flex justify-between text-[11px] font-bold text-slate-400"><span>Keep building your streak</span><span>{questions.length - completed} pending</span></div></div></section><section className="surface-card"><p className="section-kicker">Difficulty breakdown</p><h2 className="section-title">How you are stretching</h2><div className="mt-6 grid gap-3 sm:grid-cols-3">{(["Easy", "Medium", "Hard"] as Difficulty[]).map(d => { const list = questions.filter(q => q.difficulty === d); const done = list.filter(q => practised.has(q.id)).length; return <div key={d} className="rounded-xl border border-slate-100 bg-slate-50/70 p-4"><div className={`mb-3 inline-flex rounded-md px-2 py-1 text-[10px] font-bold ${difficultyClass[d]}`}>{d}</div><div className="text-2xl font-bold text-slate-900">{done}<span className="text-sm text-slate-400"> / {list.length}</span></div><div className="mt-3"><ProgressBar value={percent(done, list.length)} color={d === "Easy" ? "bg-emerald-500" : d === "Medium" ? "bg-amber-500" : "bg-rose-500"} /></div></div>})}</div></section></div><section className="surface-card"><div className="flex items-end justify-between"><div><p className="section-kicker">Topic mastery</p><h2 className="section-title">Your DSA map</h2></div><span className="text-xs font-semibold text-slate-400">{topicsProgress.length} topics</span></div><div className="mt-6 grid gap-x-8 gap-y-5 md:grid-cols-2">{topicsProgress.map(item => <div key={item.value}><div className="mb-2 flex justify-between text-xs"><span className="font-bold text-slate-700">{item.value}</span><span className="font-bold text-slate-400">{percent(item.done, item.total)}% · {item.done}/{item.total}</span></div><ProgressBar value={percent(item.done, item.total)} color={item.done === item.total ? "bg-emerald-500" : "bg-indigo-500"} /></div>)}</div></section><section className="surface-card"><p className="section-kicker">Academic subjects</p><h2 className="section-title">Exam preparation</h2><div className="mt-5 grid gap-3 md:grid-cols-3">{subjects.map(subject => { const list = questions.filter(q => q.subject === subject); const done = list.filter(q => practised.has(q.id)).length; return <div key={subject} className="flex items-center gap-3 rounded-xl border border-slate-100 p-4"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600"><ClipboardList size={17} /></div><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold text-slate-700">{subject}</p><p className="mt-1 text-[11px] text-slate-400">{done} of {list.length} practised</p></div><span className="text-sm font-bold text-indigo-600">{percent(done, list.length)}%</span></div>})}</div></section></div>; }

const DetailModal = QuestionDetail;

const navItems: { id: Section; label: string; icon: typeof LayoutDashboard }[] = [{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard }, { id: "academics", label: "Campus Academics", icon: ClipboardList }, { id: "bank", label: "Question Bank", icon: BookOpen }, { id: "revision", label: "Revise Next", icon: Pin }, { id: "progress", label: "My Progress", icon: BarChart3 }, { id: "time-machine", label: "Time Machine", icon: Target }];

const Index = () => { const [year, setYear] = useState<string | null>(() => storage.getYear()); const [section, setSection] = useState<Section>("dashboard"); const [mobileOpen, setMobileOpen] = useState(false); const [practised, setPractisedState] = useState<Set<string>>(() => storage.getPractised()); const [revision, setRevision] = useState<string[]>(() => storage.getRevision()); const [selected, setSelected] = useState<Question | null>(null); const questionsById = useMemo(() => new Map<string, Question>([...questions, ...academicQuestions].map(q => [q.id, q])), []);
  const [bankTopic, setBankTopic] = useState<string | undefined>();
  const current = useRef({ practised, revision });
  useEffect(() => { storage.setPractised(practised); }, [practised]);
  useEffect(() => { storage.setRevision(revision); }, [revision]);
  const markAcademic = (ids: string[], value: boolean) => {
    const allowed = new Set(academicQuestions.map(q => q.id));
    const next = new Set(current.current.practised);
    ids.filter(id => allowed.has(id)).forEach(id => value ? next.add(id) : next.delete(id));
    current.current.practised = next;
    setPractisedState(next);
  };
  const setPractised = (id: string) => {
    if (!questionsById.has(id)) return;
    const next = new Set(current.current.practised);
    next.has(id) ? next.delete(id) : next.add(id);
    current.current.practised = next;
    setPractisedState(next);
  };
  const removeRevision = (id: string) => {
    if (!current.current.revision.includes(id)) return;
    const next = current.current.revision.filter(x => x !== id);
    current.current.revision = next;
    setRevision(next);
    toast.success('Cleared from queue. Practised status unchanged.');
  };
  const completeRevision = (id: string) => {
    if (!questionsById.has(id) || !current.current.revision.includes(id)) return;
    const nextPractised = new Set(current.current.practised).add(id);
    const nextRevision = current.current.revision.filter(x => x !== id);
    current.current = { practised: nextPractised, revision: nextRevision };
    setPractisedState(nextPractised);
    setRevision(nextRevision);
    toast.success('Marked practised and cleared from Revise Next.');
  };
  const toggleRevision = (id: string) => {
    const question = questionsById.get(id);
    if (!question) return;
    if (current.current.revision.includes(id)) { removeRevision(id); return; }
    const result = addToQueue(current.current.revision, question, current.current.practised.has(id));
    if (result.queue === current.current.revision) { toast.info(result.message); return; }
    current.current.revision = result.queue;
    setRevision(result.queue);
    toast.success(result.message);
  };
  const go = (next: Section) => { if (next === 'bank') setBankTopic(undefined); setSection(next); setMobileOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const exploreRevision = (topic?: string) => { go('bank'); setBankTopic(topic); };
  if (section === "time-machine") return <SignatureFeatures onBack={() => go("dashboard")} />;
  if (!year) return <Welcome onChoose={(value) => { storage.setYear(value); setYear(value); }} />;
  return <div className="app-shell">
    <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
      <div className="flex items-center justify-between"><Brand/><button onClick={() => setMobileOpen(false)} className="rounded-lg p-2 text-slate-400 lg:hidden"><X size={18}/></button></div>
      <div className="mt-10"><p className="nav-label">Workspace</p><nav className="mt-3 space-y-1">{navItems.map(item => <button key={item.id} onClick={() => go(item.id)} className={`nav-item ${section === item.id ? 'active' : ''}`}><item.icon size={17}/><span>{item.label}</span>{item.id === 'revision' && revision.length > 0 && <span className="ml-auto rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-600">{revision.length}</span>}</button>)}</nav></div>
      <div className="sidebar-bottom"><div className="year-chip"><div className="flex items-center gap-2"><Clock3 size={14} className="text-indigo-500"/><span className="text-xs font-bold text-slate-700">Academic year</span></div><div className="mt-2 flex items-center justify-between"><span className="text-sm font-bold text-slate-950">Year {year}</span><button onClick={() => { storage.setYear(''); setYear(null); }} className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800">Change</button></div></div><p className="mt-5 text-[10px] leading-4 text-slate-400">Demo data · Your progress stays in this browser.</p></div>
    </aside>
    {mobileOpen && <button className="mobile-overlay lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close navigation"/>}
    <main className="main-area">
      <header className="topbar"><button onClick={() => setMobileOpen(true)} className="rounded-lg p-2 text-slate-500 hover:bg-white lg:hidden"><Menu size={20}/></button><div className="lg:hidden"><Brand/></div><div className="ml-auto flex items-center gap-3"><div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-500 sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500"/>Local workspace</div><div className="avatar">{year}</div></div></header>
      <div className="content">
        {section === 'dashboard' && <section className="mb-6 rounded-2xl border border-indigo-200 bg-indigo-50 p-5"><h2 className="text-xl font-bold text-indigo-950">Ace Your Semesters. Crack Your Placements.</h2><p className="mt-2 text-sm text-slate-700">Two preparation pillars. One focused workspace.</p><button className="primary-button mt-4" onClick={() => go('academics')}>Campus Academics · Explore PYQ Papers <ArrowRight size={15}/></button></section>}
        {(section === 'dashboard' || section === 'progress') && <CategoryProgress practised={practised}/>}
        {section === 'dashboard' && <Dashboard practised={practised} revision={revision} year={year} go={go}/>}
        {section === 'academics' && <CampusAcademics practised={practised} revision={revision} onPractice={markAcademic} onPin={toggleRevision} onRevision={() => go('revision')}/>}
        {section === 'bank' && <Bank key={bankTopic ?? 'all'} initialTopic={bankTopic} practised={practised} revision={revision} setPractised={setPractised} toggleRevision={toggleRevision} openQuestion={setSelected}/>}
        {section === 'revision' && <RevisionWorkspace revision={revision} practised={practised} questionsById={questionsById} onRemove={removeRevision} onComplete={completeRevision} openQuestion={setSelected} onExplore={exploreRevision}/>}
        {section === 'progress' && <ProgressPage practised={practised}/>}
      </div>
    </main>
    {selected && <DetailModal key={selected.id} question={selected} practised={practised.has(selected.id)} pinned={revision.includes(selected.id)} onClose={() => setSelected(null)} onPractise={() => setPractised(selected.id)} onPin={() => toggleRevision(selected.id)}/>}
  </div>;
};

function Welcome({ onChoose }: { onChoose: (year: string) => void }) {
  const [selected, setSelected] = useState('');
  return <div className="welcome-page"><div className="welcome-card"><div className="mb-12"><Brand/></div><div className="grid items-center gap-10 lg:grid-cols-[1fr_0.7fr]">
    <div><div className="eyebrow"><Sparkles size={13}/> Academics + Placement Preparation</div><h1 className="mt-5 text-4xl font-bold tracking-[-0.055em] text-slate-950 sm:text-5xl">Ace Your Semesters.<br/><span className="text-indigo-600">Crack Your Placements.</span></h1><p className="mt-5 max-w-md text-sm leading-7 text-slate-600">Semester papers and academic progress alongside Coding & DSA, Quantitative Aptitude, Logical Reasoning and English. Choose a year for your workspace label; every paper and question stays accessible.</p><div className="mt-8 max-w-sm"><p className="mb-2 text-xs font-bold text-slate-700">Choose an academic year</p><div className="grid grid-cols-3 gap-2">{years.map(y => <button key={y} aria-pressed={selected === y} onClick={() => setSelected(y)} className={`year-option ${selected === y ? 'selected' : ''}`}>{y}</button>)}</div><button disabled={!selected} onClick={() => onChoose(selected)} className="primary-button mt-4 w-full justify-center disabled:cursor-not-allowed disabled:opacity-40">Enter AlgoVault <ArrowRight size={15}/></button></div></div>
    <div className="welcome-visual"><div className="visual-grid"/><div className="study-card card-a"><BookOpen size={17} className="text-indigo-500"/><div><b>Question bank</b><small>{questions.length + academicQuestions.length} demonstration prompts</small></div></div><div className="study-card card-b"><TrendingUp size={17} className="text-emerald-500"/><div><b>Two preparation pillars</b><small>One shared revision queue</small></div></div><div className="visual-person"><div className="person-head"/><div className="person-body"/></div><div className="visual-circle one"/><div className="visual-circle two"/></div>
    </div><div className="mt-12 flex flex-wrap gap-6 border-t border-slate-100 pt-5 text-xs text-slate-600"><span>No sign-up required</span><span>Progress saved locally</span><span>Illustrative exam + placement practice</span></div></div></div>;
}

export default Index;

