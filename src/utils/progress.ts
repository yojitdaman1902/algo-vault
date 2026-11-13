import type { Question } from "@/types/question";

export const percent = (done: number, total: number) => total ? Math.round((done / total) * 100) : 0;
export const completionFor = (items: Question[], practised: Set<string>) => percent(items.filter((item) => practised.has(item.id)).length, items.length);
