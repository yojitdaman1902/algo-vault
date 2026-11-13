export type Difficulty = "Easy" | "Medium" | "Hard";
export type QuestionType = "Academic PYQ" | "Placement Practice";

export const categories = ['Coding & DSA', 'Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability / English'] as const;
export type Category = typeof categories[number];

export interface Question {
  id: string;
  category?: Category;
  questionType?: 'informational' | 'mcq';
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
  title: string;
  description: string;
  topic: string;
  difficulty: Difficulty;
  year?: string;
  semester?: string;
  subject?: string;
  companies: string[];
  type: QuestionType;
  exampleInput?: string;
  exampleOutput?: string;
}
