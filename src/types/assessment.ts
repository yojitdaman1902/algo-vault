export type AssessmentMode = "demo" | "practice";
export type AssessmentStage = "setup" | "running" | "results";

export interface AssessmentConfig {
  company: string;
  interviewYear: string;
  graduationYear: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Mixed";
  mode: AssessmentMode;
}

export interface AssessableQuestion {
  id: string;
  bankQuestionId?: string;
  title: string;
  topic: string;
  companyTags: string[];
  years: string[];
  prompt: string;
  options: string[];
  correctAnswer: string;
  correctLabel: string;
  explanation: string;
  diagnosisKey?: "two-sum-duplicate" | "two-sum-unsorted";
}

export interface AttemptEvent {
  type: "started" | "incorrect" | "hint" | "correct" | "finished";
  atMs: number;
  answer?: string;
}

export interface QuestionAttempt {
  id: string;
  questionId: string;
  startedAt: number;
  completedAt?: number;
  elapsedMs: number;
  answerSubmissions: string[];
  incorrectSubmissionCount: number;
  hintUsageCount: number;
  finalResult: "correct" | "incorrect" | "incomplete";
  events: AttemptEvent[];
}

export interface AssessmentAnswer {
  questionId: string;
  answer: string;
  correct: boolean;
  elapsedMs: number;
  attemptId: string;
}

export interface DiagnosticTraceStep {
  label: string;
  detail: string;
  left?: number;
  right?: number;
  highlighted?: number[];
}

export interface DiagnosticFixture {
  key: "two-sum-duplicate" | "two-sum-unsorted";
  category: string;
  submitted: string;
  expected: string;
  counterexample: string;
  explanation: string;
  trace: DiagnosticTraceStep[];
}
