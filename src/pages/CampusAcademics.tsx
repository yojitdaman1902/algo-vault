import { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { academicPaperById } from '@/data/academics';
import { emptyAcademicFilters, type AcademicFilters } from '@/utils/academics';
import { DemoNotice } from '@/components/academics/AcademicShared';
import { AcademicLibrary } from '@/components/academics/AcademicLibrary';
import { AcademicDashboard } from '@/components/academics/AcademicDashboard';
import { AcademicPaperDetail } from '@/components/academics/AcademicPaperDetail';

export default function CampusAcademics({ practised, revision, onPractice, onPin, onRevision }: { practised: Set<string>; revision: string[]; onPractice: (ids: string[], value: boolean) => void; onPin: (id: string) => void; onRevision: () => void }) {
  const [page, setPage] = useState<'dashboard' | 'library' | 'paper'>('dashboard');
  const [paperId, setPaperId] = useState('');
  const [filters, setFilters] = useState<AcademicFilters>({ ...emptyAcademicFilters });
  const [view, setView] = useState<'papers' | 'questions'>('papers');
  const explore = (next: Partial<AcademicFilters>, questions = false) => { setFilters({ ...emptyAcademicFilters, ...next }); setView(questions ? 'questions' : 'papers'); setPage('library'); };
  const open = (id: string) => { setPaperId(id); setPage('paper'); window.scrollTo({ top: 0 }); };
  const paper = academicPaperById.get(paperId);
  return <div className="space-y-6"><header><p className="eyebrow"><GraduationCap size={16}/>Your academic workspace</p><h1 className="page-title">Campus Academics</h1><p className="page-subtitle">Ace Your Semesters. Crack Your Placements.</p></header><nav aria-label="Academic navigation" className="flex flex-wrap gap-2"><Button variant="outline" aria-pressed={page === 'dashboard'} className="rounded-xl text-indigo-700" onClick={() => setPage('dashboard')}>Academic Progress Dashboard</Button><Button variant="outline" aria-pressed={page === 'library'} className="rounded-xl text-indigo-700" onClick={() => setPage('library')}>Explore PYQ Papers</Button><Button variant="outline" className="rounded-xl text-indigo-700" onClick={onRevision}>Revise Next · {revision.length}/5</Button></nav><DemoNotice/>
    {page === 'dashboard' && <AcademicDashboard practised={practised} explore={explore} onOpen={open}/>}
    {page === 'library' && <AcademicLibrary filters={filters} setFilters={setFilters} view={view} setView={setView} practised={practised} revision={revision} onOpen={open} onPractice={onPractice} onPin={onPin}/>}
    {page === 'paper' && paper && <AcademicPaperDetail key={paper.paperId} paper={paper} practised={practised} revision={revision} onPractice={onPractice} onPin={onPin} onBack={() => setPage('library')}/>}
  </div>;
}
