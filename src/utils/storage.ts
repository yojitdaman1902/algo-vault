const PRACTISED_KEY = "algovault:v1:practised";
const REVISION_KEY = "algovault:v1:revision";
const YEAR_KEY = "algovault:v1:academic-year";

const readArray = (key: string) => {
  try {
    const value = JSON.parse(localStorage.getItem(key) ?? "[]");
    return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : [];
  } catch { return []; }
};

export const storage = {
  getPractised: () => new Set(readArray(PRACTISED_KEY)),
  setPractised: (ids: Set<string>) => localStorage.setItem(PRACTISED_KEY, JSON.stringify([...ids])),
  getRevision: () => readArray(REVISION_KEY),
  setRevision: (ids: string[]) => localStorage.setItem(REVISION_KEY, JSON.stringify(ids)),
  getYear: () => localStorage.getItem(YEAR_KEY),
  setYear: (year: string) => localStorage.setItem(YEAR_KEY, year),
};
