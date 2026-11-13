import { Pin, PinOff } from 'lucide-react';
import type { Question } from '@/types/question';
import { canPin, PIN_INELIGIBLE } from '@/utils/revision';

export function RevisionPinButton({ question, practised, pinned, onClick, compact = false }: { question: Question; practised: boolean; pinned: boolean; onClick: () => void; compact?: boolean }) {
  const blocked = !pinned && !canPin(question, practised);
  const label = pinned ? 'Remove from Queue' : 'Add to Revise Next';
  return <div className={compact ? 'max-w-36 text-right' : ''}>
    <button onClick={onClick} disabled={blocked} title={blocked ? PIN_INELIGIBLE : label} aria-label={blocked ? PIN_INELIGIBLE : label} className={`${compact ? 'rounded-lg p-2 text-indigo-600 hover:bg-indigo-50' : 'secondary-button justify-center'} disabled:cursor-not-allowed disabled:opacity-50`}>
      {pinned ? <PinOff size={17}/> : <Pin size={17}/>}{!compact && label}
    </button>
    {blocked && <p className="mt-1 text-[11px] leading-4 text-slate-600">{PIN_INELIGIBLE}</p>}
  </div>;
}
