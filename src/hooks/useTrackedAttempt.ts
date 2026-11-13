import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { attemptStorage, complete, evaluateAnswer, newAttempt, record } from '@/utils/assessment';
import type { AssessableQuestion, QuestionAttempt } from '@/types/assessment';

export function useTrackedAttempt(question: AssessableQuestion) {
  const [attempt, setAttempt] = useState(() => newAttempt(question.id));
  const ref = useRef(attempt);
  const active = useRef(0);
  const last = useRef(performance.now());
  const visible = useRef(!document.hidden);
  const finished = useRef(false);
  const [elapsed, setElapsed] = useState(0);
  // Ghost comparisons use active foreground time, not time spent in a hidden tab.
  const tick = useCallback(() => {
    const now = performance.now();
    if (visible.current && !finished.current) active.current += now - last.current;
    last.current = now;
    return Math.round(active.current);
  }, []);
  useEffect(() => {
    const timer = window.setInterval(() => setElapsed(tick()), 100);
    const visibility = () => { tick(); visible.current = !document.hidden; };
    document.addEventListener('visibilitychange', visibility);
    return () => { clearInterval(timer); document.removeEventListener('visibilitychange', visibility); };
  }, [tick]);
  const update = useCallback((next: QuestionAttempt) => { ref.current = next; setAttempt(next); }, []);
  const submit = (answer: string) => {
    if (finished.current) return;
    const correct = evaluateAnswer(question, answer);
    update(record(ref.current, { type: correct ? 'correct' : 'incorrect', atMs: tick(), answer }));
    return correct;
  };
  const hint = () => {
    if (!finished.current && ref.current.hintUsageCount === 0) update(record(ref.current, { type: 'hint', atMs: tick() }));
  };
  const finish = useCallback(() => {
    if (finished.current) return ref.current;
    const next = complete(ref.current, tick());
    finished.current = true;
    update(next);
    if (!attemptStorage.save(next)) toast.warning('Browser storage unavailable. This attempt is saved in memory only.');
    return next;
  }, [tick, update]);
  return { attempt, elapsed, submit, hint, finish };
}
