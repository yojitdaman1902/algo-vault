import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { Question } from '@/types/question';
import { evaluateMcq } from '@/utils/oa';

export function McqPractice({ question }: { question: Question }) {
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState<boolean | null>(null);
  return <section className="my-5 space-y-4"><fieldset disabled={result !== null} className="space-y-2"><legend className="mb-3 text-sm font-bold">Choose one answer</legend>{question.options?.map(option => <label key={option} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm ${answer === option ? 'border-indigo-400 bg-indigo-50' : 'border-slate-200'}`}><input type="radio" className="mt-1 accent-indigo-600" name={`practice-${question.id}`} checked={answer === option} onChange={() => setAnswer(option)}/><span>{option}</span></label>)}</fieldset>{result === null ? <Button disabled={!answer} className="rounded-xl bg-indigo-600 hover:bg-indigo-700" onClick={() => setResult(evaluateMcq(question, answer))}>Submit Answer</Button> : <><div role="status" className={`rounded-xl p-4 text-sm ${result ? 'bg-emerald-50 text-emerald-900' : 'bg-rose-50 text-rose-900'}`}><strong>{result ? 'Correct' : 'Incorrect'}</strong><p className="mt-2">Correct answer: {question.correctAnswer}</p><p className="mt-2 leading-6">{question.explanation}</p></div><Button variant="outline" className="rounded-xl" onClick={() => { setAnswer(''); setResult(null); }}>Retry Question</Button></>}<p className="text-xs text-slate-500">Use Mark as practised below when you finish. Answer feedback does not change your saved progress automatically.</p></section>;
}
