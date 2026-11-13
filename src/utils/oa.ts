import { categories, type Question } from '@/types/question';

export const categoryOf = (q: Question) => q.category ?? 'Coding & DSA';
export function evaluateMcq(q: Question, answer: string) {
  if (q.questionType !== 'mcq' || !answer || !q.options?.includes(answer) || !q.correctAnswer) return null;
  return answer === q.correctAnswer;
}
export function categoryProgress(items: Question[], practised: Set<string>) {
  return categories.map(category => {
    const subset = items.filter(q => categoryOf(q) === category);
    const done = subset.filter(q => practised.has(q.id)).length;
    return { category, total: subset.length, done, ratio: subset.length ? done / subset.length : 0 };
  });
}
