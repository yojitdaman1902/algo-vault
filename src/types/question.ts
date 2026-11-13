export type Difficulty = "Easy" | "Medium" | "Hard";
export type QuestionType = "Academic PYQ" | "Placement Practice";

export interface Question {
  id: string;
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
