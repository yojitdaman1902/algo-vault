import { questions } from '@/data/questions';
import type { Question } from '@/types/question';

export const REVISION_CAPACITY = 5;
export const PIN_INELIGIBLE = 'Already practised. Only unanswered or Hard questions can be pinned.';
const validIds = new Set(questions.map(q => q.id));
export function validQuestionIds(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((id): id is string => typeof id === 'string' && validIds.has(id)))];
}
export const normalizeQueue = (value: unknown) => validQuestionIds(value).slice(0, REVISION_CAPACITY);
export const canPin = (question: Question, practised: boolean) => !practised || question.difficulty === 'Hard';

export function addToQueue(queue: string[], question: Question, practised: boolean) {
  if (queue.includes(question.id)) return { queue, message: 'Already in Revise Next.' };
  if (!canPin(question, practised)) return { queue, message: PIN_INELIGIBLE };
  if (queue.length >= REVISION_CAPACITY) return { queue, message: 'Queue full — maximum five questions' };
  return { queue: [...queue, question.id], message: 'Added to Revise Next.' };
}

export function topicsToRevisit(practised: Set<string>) {
  return [...new Set(questions.map(q => q.topic))].map(topic => {
    const items = questions.filter(q => q.topic === topic);
    const completed = items.filter(q => practised.has(q.id)).length;
    return { topic, total: items.length, completed, ratio: completed / items.length };
  }).filter(item => item.completed < item.total)
    .sort((a, b) => a.ratio - b.ratio || a.topic.localeCompare(b.topic)).slice(0, 3);
}
