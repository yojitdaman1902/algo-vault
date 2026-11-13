import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { Question } from '@/types/question';
import { categoryOf } from '@/utils/oa';
import { RevisionPinButton } from '@/components/revision/RevisionPinButton';
import { McqPractice } from './McqPractice';

export function QuestionDetail({ question, practised, pinned, onClose, onPractise, onPin }: { question: Question; practised: boolean; pinned: boolean; onClose: () => void; onPractise: () => void; onPin: () => void }) {
  return <Dialog open onOpenChange={open => { if (!open) onClose(); }}>
    <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl border-slate-200 p-6 sm:rounded-2xl sm:p-8">
      <p className="eyebrow">{question.type === 'Academic PYQ' ? 'Campus Academics' : categoryOf(question)} · {question.difficulty}</p>
      <DialogTitle className="pr-5 text-2xl font-bold tracking-tight">{question.title}</DialogTitle>
      <DialogDescription className="text-sm text-slate-600">{question.topic} · {question.type}{question.year ? ` · ${question.year}` : ''}{question.semester ? ` · ${question.semester}` : ''}{question.subject ? ` · ${question.subject}` : ''}</DialogDescription>
      <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">{question.description}</p>
      {question.exampleInput && <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-xl bg-slate-100 p-4"><p className="text-xs font-bold">Example input</p><code className="mt-2 block whitespace-pre-wrap text-xs">{question.exampleInput}</code></div><div className="rounded-xl bg-indigo-50 p-4"><p className="text-xs font-bold">Expected output</p><code className="mt-2 block whitespace-pre-wrap text-xs text-indigo-900">{question.exampleOutput}</code></div></div>}
      {question.questionType === 'mcq' && <McqPractice key={question.id} question={question}/>}
      <div className="mt-4 flex flex-wrap items-start gap-3"><Button className={`rounded-xl ${practised ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-indigo-600 hover:bg-indigo-700'}`} onClick={onPractise}>{practised ? 'Practised — undo' : 'Mark as practised'}</Button><RevisionPinButton question={question} practised={practised} pinned={pinned} onClick={onPin}/></div>
      <p className="text-xs leading-5 text-slate-500">Academic associations and company/year tags are illustrative, not verified historical papers or interviews.</p>
    </DialogContent>
  </Dialog>;
}
