import { questions } from '@/data/questions';
import { oaAssessableQuestions } from '@/data/oaAssessments';
import type { AssessmentConfig, AssessableQuestion, DiagnosticFixture, QuestionAttempt, AttemptEvent } from '@/types/assessment';

export const ASSESSABLE_QUESTIONS: AssessableQuestion[] = [
 { id:'pyq-2022-01', title:'Two Sum · duplicate values', topic:'Hashing', companyTags:['Amazon','Microsoft'], years:['2022','2024','2025'], prompt:'nums = [3, 3], target = 6. Return two distinct zero-based indices.', options:['[0, 0]','[0, 1]','No solution'], correctAnswer:'[0, 1]', correctLabel:'[0, 1]', explanation:'Equal values at different indices are allowed. The two positions must be distinct.', diagnosisKey:'two-sum-duplicate' },
 { id:'pyq-2022-01:unsorted', bankQuestionId:'pyq-2022-01', title:'Two Sum · unsorted input variant', topic:'Hashing', companyTags:['Amazon','Microsoft'], years:['2024','2025'], prompt:'nums = [3, 2, 4], target = 6. Which answer is valid? The “No solution” option represents applying sorted-array two pointers directly to this unsorted input.', options:['[0, 1]','[1, 2]','No solution'], correctAnswer:'[1, 2]', correctLabel:'[1, 2]', explanation:'Values 2 and 4 occupy indices 1 and 2. Conventional two-pointer movements require sorted values.', diagnosisKey:'two-sum-unsorted' },
 { id:'pyq-2024-04', title:'Dijkstra · complexity', topic:'Graphs', companyTags:['Amazon','Google','Microsoft'], years:['2024','2025'], prompt:'With adjacency lists and a binary heap, what is the usual Dijkstra time bound for non-negative edges?', options:['O(V²)','O((V + E) log V)','O(log V)'], correctAnswer:'O((V + E) log V)', correctLabel:'O((V + E) log V)', explanation:'Relaxing edges and extracting vertices incurs logarithmic heap operations.' },
 { id:'pyq-2023-05', title:'Longest common subsequence', topic:'Dynamic Programming', companyTags:['Amazon','Google'], years:['2023','2024'], prompt:'What is the LCS length of abcde and ace?', options:['2','3','5'], correctAnswer:'3', correctLabel:'3', explanation:'The common subsequence ace has length 3.' },
 { id:'place-08', title:'Climbing stairs', topic:'Recursion', companyTags:['TCS','Infosys','Wipro'], years:['2022','2023','2024','2025','2026'], prompt:'How many ways reach stair 5 using steps of size 1 or 2?', options:['5','8','13'], correctAnswer:'8', correctLabel:'8', explanation:'ways(n)=ways(n−1)+ways(n−2); the counts are 1,2,3,5,8.' }
];
export const DIAGNOSTICS: DiagnosticFixture[] = [
 { key:'two-sum-duplicate', category:'Incorrect index usage', submitted:'[0, 0]', expected:'[0, 1]', counterexample:'nums = [3, 3], target = 6', explanation:'The same array index was used twice. Two Sum requires two distinct indices.', trace:[{label:'Incorrect selection',detail:'[0, 0] selects the first cell twice. Its sum is 6, but the indices are not distinct.',left:0,right:0,highlighted:[0]},{label:'Keep the first 3',detail:'Index 0 contains 3. We need a second position containing 3.',left:0,highlighted:[0]},{label:'Use the second 3',detail:'Index 1 contains another 3: 3 + 3 = 6, with 0 ≠ 1.',left:0,right:1,highlighted:[0,1]}] },
 { key:'two-sum-unsorted', category:'Wrong algorithmic assumption', submitted:'No solution', expected:'[1, 2]', counterexample:'nums = [3, 2, 4], target = 6', explanation:'The explicitly selected strategy assumes sorted values. This input is unsorted, so its pointer movements are not valid deductions.', trace:[{label:'Start: sum 7',detail:'L=0, R=2: 3 + 4 = 7. The conventional strategy moves R left.',left:0,right:2,highlighted:[0,2]},{label:'Sum 5',detail:'L=0, R=1: 3 + 2 = 5. The strategy moves L right.',left:0,right:1,highlighted:[0,1]},{label:'Pointers meet',detail:'L=R=1. The loop stops and falsely reports no solution.',left:1,right:1,highlighted:[1]},{label:'Missed answer: sum 6',detail:'Indices 1 and 2 contain 2 + 4 = 6. Use a hash map or sort while preserving original indices.',left:1,right:2,highlighted:[1,2]}] }
];
export function diagnosisFor(q: AssessableQuestion, answer: string) {
 const fixture = DIAGNOSTICS.find(f=>f.key===q.diagnosisKey && f.submitted===answer);
 if (fixture) return fixture;
 if(q.diagnosisKey==='two-sum-duplicate' && answer==='No solution') return {...DIAGNOSTICS[0],category:'Duplicate-value handling',explanation:'Two equal values can form a valid pair when they occupy different indices.',trace:DIAGNOSTICS[0].trace.slice(1)};
 return undefined;
}
export const evaluateAnswer = (q: AssessableQuestion, answer: string) => answer === q.correctAnswer;
export const getAssessable = (id:string) => ASSESSABLE_QUESTIONS.find(q=>q.id===id) ?? oaAssessableQuestions.find(q=>q.id===id);
export const questionForAssessable = (q:AssessableQuestion) => questions.find(x=>x.id===(q.bankQuestionId??q.id));
export function generateAssessment(config:AssessmentConfig) {
 const matches=ASSESSABLE_QUESTIONS.filter(q=>q.companyTags.includes(config.company)&&q.years.includes(config.interviewYear)&&(config.difficulty==='Mixed'||questionForAssessable(q)?.difficulty===config.difficulty));
 return {questions:matches.slice(0,3),fallback:matches.length<3,note:`${matches.length} supported questions match all selected filters. Graduation year is context only.`};
}
const KEY='algovault:v3:attempt-history';
let memory:QuestionAttempt[]=[];
let memoryOnly=false;

// Storage is user-controlled input. Reject malformed records individually so one
// corrupt entry cannot discard the other valid attempts or poison ghost timings.
function valid(value: unknown): value is QuestionAttempt {
 if (!value || typeof value !== 'object') return false;
 const a = value as Record<string, unknown>;
 if (typeof a.id !== 'string' || !a.id || typeof a.questionId !== 'string' || !getAssessable(a.questionId)) return false;
 if (typeof a.startedAt !== 'number' || !Number.isFinite(a.startedAt) || a.startedAt < 0 || typeof a.elapsedMs !== 'number' || !Number.isFinite(a.elapsedMs) || a.elapsedMs < 0) return false;
 if (a.completedAt !== undefined && (typeof a.completedAt !== 'number' || !Number.isFinite(a.completedAt) || a.completedAt < 0)) return false;
 if (typeof a.incorrectSubmissionCount !== 'number' || !Number.isInteger(a.incorrectSubmissionCount) || a.incorrectSubmissionCount < 0 || typeof a.hintUsageCount !== 'number' || !Number.isInteger(a.hintUsageCount) || a.hintUsageCount < 0) return false;
 if (a.finalResult !== 'correct' && a.finalResult !== 'incorrect' && a.finalResult !== 'incomplete') return false;
 if (!Array.isArray(a.answerSubmissions) || !a.answerSubmissions.every((answer: unknown) => typeof answer === 'string') || !Array.isArray(a.events)) return false;
 let previousTime = 0;
 for (const value of a.events) {
   if (!value || typeof value !== 'object') return false;
   const event = value as Record<string, unknown>;
   if (event.type !== 'started' && event.type !== 'incorrect' && event.type !== 'hint' && event.type !== 'correct' && event.type !== 'finished') return false;
   if (typeof event.atMs !== 'number' || !Number.isFinite(event.atMs) || event.atMs < previousTime || event.atMs > a.elapsedMs || (event.answer !== undefined && typeof event.answer !== 'string')) return false;
   previousTime = event.atMs;
 }
 return true;
}
function read(): QuestionAttempt[] {
 if (memoryOnly) return memory;
 try {
   const data: unknown = JSON.parse(localStorage.getItem(KEY) ?? '[]');
   if (!Array.isArray(data)) return memory;
   memory = [...new Map(data.filter(valid).map(a => [a.id, a])).values()].slice(-100);
   return memory;
 } catch {
   // A denied read or malformed JSON must not erase the last valid session copy.
   return memory;
 }
}
export const attemptStorage={getAll:read,getForQuestion:(id:string)=>read().filter(a=>a.questionId===id).sort((a,b)=>b.startedAt-a.startedAt),save:(a:QuestionAttempt)=>{memory=[...read().filter(x=>x.id!==a.id),a].slice(-100);try{localStorage.setItem(KEY,JSON.stringify(memory));memoryOnly=false;return true;}catch{memoryOnly=true;return false;}}};
export function newAttempt(questionId:string):QuestionAttempt{return {id:crypto.randomUUID(),questionId,startedAt:Date.now(),elapsedMs:0,answerSubmissions:[],incorrectSubmissionCount:0,hintUsageCount:0,finalResult:'incomplete',events:[{type:'started',atMs:0}]};}
export function record(a:QuestionAttempt,event:AttemptEvent):QuestionAttempt{return {...a,elapsedMs:event.atMs,events:[...a.events,event],answerSubmissions:event.answer===undefined?a.answerSubmissions:[...a.answerSubmissions,event.answer],incorrectSubmissionCount:a.incorrectSubmissionCount+(event.type==='incorrect'?1:0),hintUsageCount:a.hintUsageCount+(event.type==='hint'?1:0),finalResult:event.type==='correct'?'correct':event.type==='incorrect'?'incorrect':a.finalResult};}
export function complete(a:QuestionAttempt,elapsedMs:number){return {...record(a,{type:'finished',atMs:elapsedMs}),completedAt:Date.now()};}
export function compareAttempts(previous:QuestionAttempt,current:QuestionAttempt){const comparable=previous.finalResult==='correct'&&current.finalResult==='correct';const delta=previous.elapsedMs-current.elapsedMs;return {comparable,delta,percentage:comparable&&previous.elapsedMs>0?100*delta/previous.elapsedMs:0,best:comparable&&delta>0&&current.incorrectSubmissionCount<=previous.incorrectSubmissionCount&&current.hintUsageCount<=previous.hintUsageCount};}
