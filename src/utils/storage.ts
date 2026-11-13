import { toast } from 'sonner';
import { normalizeQueue, validQuestionIds } from '@/utils/revision';

const PRACTISED_KEY = 'algovault:v1:practised';
const REVISION_KEY = 'algovault:v1:revision';
const YEAR_KEY = 'algovault:v1:academic-year';
const memory = new Map<string, string>();
const failedKeys = new Set<string>();
function read(key: string) {
  if (failedKeys.has(key)) return memory.get(key) ?? null;
  try {
    const value = localStorage.getItem(key);
    if (value !== null) memory.set(key, value);
    return value;
  } catch { return memory.get(key) ?? null; }
}
function write(key: string, value: string) {
  // Keep the newest session copy if quota/privacy settings reject a write.
  // Reading stale disk data afterward would otherwise appear to undo progress.
  memory.set(key, value);
  try { localStorage.setItem(key, value); failedKeys.delete(key); }
  catch {
    failedKeys.add(key);
    toast.warning('Browser storage unavailable. Changes work for this session but may not survive refresh.', { id: 'workspace-storage-warning' });
  }
}
function readArray(key: string): unknown {
  try { return JSON.parse(read(key) ?? '[]'); } catch { return []; }
}
export const storage = {
  getPractised: () => new Set(validQuestionIds(readArray(PRACTISED_KEY))),
  setPractised: (ids: Set<string>) => write(PRACTISED_KEY, JSON.stringify(validQuestionIds([...ids]))),
  getRevision: () => normalizeQueue(readArray(REVISION_KEY)),
  setRevision: (ids: string[]) => write(REVISION_KEY, JSON.stringify(normalizeQueue(ids))),
  getYear: () => read(YEAR_KEY),
  setYear: (year: string) => write(YEAR_KEY, year),
};
