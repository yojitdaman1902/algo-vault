import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTrackedAttempt } from '@/hooks/useTrackedAttempt';
import type { AssessableQuestion, QuestionAttempt } from '@/types/assessment';

export const time=(ms:number)=>{const s=Math.floor(Math.max(0,ms)/1000);return `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;};
export function AttemptPanel({question,previous,onFinish,expired=false,single=false}:{question:AssessableQuestion;previous?:QuestionAttempt;onFinish:(a:QuestionAttempt)=>void;expired?:boolean;single?:boolean}) {
 const tracker=useTrackedAttempt(question);
 const [answer,setAnswer]=useState('');
 const [feedback,setFeedback]=useState<boolean|null>(null);
 const [replay,setReplay]=useState<number|null>(null);
 useEffect(()=>{if(expired)onFinish(tracker.finish());},[expired]);
 const locked=single?feedback!==null:feedback===true;
 return <div className={`grid gap-5 ${previous?'lg:grid-cols-2':''}`}><section className="surface-card space-y-5">
 <div className="flex justify-between gap-3"><span className="eyebrow">{question.topic}</span><strong className="text-indigo-700">{time(tracker.elapsed)} active</strong></div>
 <h2 className="text-xl font-bold">{question.title}</h2><p className="text-sm leading-7 text-slate-600">{question.prompt}</p>
 <fieldset className="space-y-2" disabled={locked||expired}><legend className="mb-2 text-xs font-bold">Choose an answer</legend>{question.options.map(option=><label key={option} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm ${answer===option?'border-indigo-400 bg-indigo-50':'border-slate-200'}`}><input type="radio" name={`answer-${tracker.attempt.id}`} checked={answer===option} onChange={()=>setAnswer(option)} value={option}/>{option}</label>)}</fieldset>
 <p className="text-xs text-slate-500">Incorrect submissions: {tracker.attempt.incorrectSubmissionCount} · Hints: {tracker.attempt.hintUsageCount}</p>
 {tracker.attempt.hintUsageCount>0&&<p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">Hint: {question.explanation}</p>}
 {feedback!==null&&<p role="status" className={`rounded-xl p-3 text-sm ${feedback?'bg-emerald-50 text-emerald-800':'bg-rose-50 text-rose-800'}`}>{feedback?'Correct.':single?'Incorrect. Review this answer with Code Autopsy after the round.':'Incorrect. Try another answer or finish to run Code Autopsy.'}</p>}
 <div className="flex flex-wrap gap-2"><Button variant="outline" className="rounded-xl" disabled={locked||tracker.attempt.hintUsageCount>0} onClick={tracker.hint}>Open hint</Button><Button className="rounded-xl bg-indigo-600 hover:bg-indigo-700" disabled={!answer||locked||expired} onClick={()=>setFeedback(tracker.submit(answer)??false)}>Submit answer</Button><Button variant="outline" className="rounded-xl" onClick={()=>onFinish(tracker.finish())}>{single?'Save & next question':'Finish challenge'}</Button></div>
 </section>{previous&&<section className="surface-card space-y-5 !bg-indigo-950 text-white"><p className="eyebrow !text-indigo-200">Previous attempt / Ghost</p><h2 className="text-xl font-bold">Your earlier self</h2><p className="text-sm text-indigo-100">{time(previous.elapsedMs)} · {previous.incorrectSubmissionCount} mistakes · {previous.hintUsageCount} hints · {previous.finalResult}</p><label className="block text-sm">Replay timeline<input className="mt-3 w-full" type="range" min={0} max={Math.max(1,previous.elapsedMs)} value={replay??Math.min(tracker.elapsed,previous.elapsedMs)} onChange={e=>setReplay(Number(e.target.value))}/></label><button className="text-xs underline" onClick={()=>setReplay(null)}>Sync replay to current timer</button><ol className="space-y-3">{previous.events.map((e,i)=><li key={i} className={`rounded-lg border p-3 text-xs ${(replay??tracker.elapsed)>=e.atMs?'border-indigo-400 bg-indigo-900 text-white':'border-indigo-800 text-indigo-300'}`}>{time(e.atMs)} — {e.type}{e.answer?`: ${e.answer}`:''}</li>)}</ol><p className="text-xs text-indigo-200">Real saved events. Timing pauses when this tab is hidden; no code is executed.</p></section>}</div>;
}
