import { oaQuestions } from './oaQuestions';
import type { AssessableQuestion } from '@/types/assessment';

export const oaAssessableQuestions: AssessableQuestion[] = oaQuestions.map(q => ({
  id: q.id, title: q.title, topic: `${q.category} · ${q.topic}`, companyTags: q.companies,
  years: q.year ? [q.year] : [], prompt: q.description, options: q.options!,
  correctAnswer: q.correctAnswer!, correctLabel: q.correctAnswer!, explanation: q.explanation!,
}));
export const miniOaIds = ['oa-q-01', 'oa-q-02', 'oa-l-01', 'oa-l-02', 'oa-v-01', 'oa-v-02', 'oa-d-01', 'oa-d-02'];
export const miniOaQuestions = miniOaIds.map(id => oaAssessableQuestions.find(q => q.id === id)!);
