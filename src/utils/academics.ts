import { academicPapers, academicQuestionById, academicQuestions, academicSubjects, type AcademicPaper } from '@/data/academics';

export interface AcademicFilters { semester: string; subject: string; year: string; exam: string; keyword: string; topic: string; remaining: boolean }
export const emptyAcademicFilters: AcademicFilters = { semester: '', subject: '', year: '', exam: '', keyword: '', topic: '', remaining: false };
// Use unique question counts for every scope, never average paper percentages.
// Completion requires all IDs, not a rounded percentage that happens to reach 100.
export function academicCompletion(ids: string[], practised: Set<string>) {
  const unique = [...new Set(ids)];
  const done = unique.filter(id => practised.has(id)).length;
  return { done, total: unique.length, remaining: unique.length - done, percentage: unique.length ? Math.round(done / unique.length * 100) : 0, complete: unique.length > 0 && done === unique.length };
}
export function paperQuestions(paper: AcademicPaper) { return paper.questionIds.map(id => academicQuestionById.get(id)!); }
// Filter paper metadata first so a matching keyword cannot bypass semester,
// subject or year restrictions. All facets combine with AND; search is trimmed.
export function filterAcademicQuestions(filters: AcademicFilters, practised: Set<string>) {
  const keyword = filters.keyword.trim().toLowerCase();
  return academicPapers.filter(p => (!filters.semester || String(p.semester) === filters.semester) && (!filters.subject || p.subjectId === filters.subject) && (!filters.year || p.year === filters.year) && (!filters.exam || p.examinationType === filters.exam)).flatMap(p => paperQuestions(p).filter(q =>
    (!filters.topic || q.topic === filters.topic) && (!filters.remaining || !practised.has(q.id)) && (!keyword || [p.title, p.examinationType, q.description, q.topic, q.subject, q.semester, q.year].join(' ').toLowerCase().includes(keyword))
  ));
}
export function filterAcademicPapers(filters: AcademicFilters, practised: Set<string>) {
  const paperIds = new Set(filterAcademicQuestions(filters, practised).map(q => q.paperId));
  return academicPapers.filter(p => paperIds.has(p.paperId));
}
export function academicWeakTopics(practised: Set<string>) {
  return academicSubjects.flatMap(subject => [...new Set(academicQuestions.filter(q => q.subjectId === subject.id).map(q => q.topic))].map(topic => {
    const ids = academicQuestions.filter(q => q.subjectId === subject.id && q.topic === topic).map(q => q.id);
    return { subject, topic, ...academicCompletion(ids, practised) };
  })).filter(item => item.remaining > 0).sort((a, b) => a.done / a.total - b.done / b.total || a.subject.name.localeCompare(b.subject.name) || a.topic.localeCompare(b.topic));
}
