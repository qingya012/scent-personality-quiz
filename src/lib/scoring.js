export const EMPTY = { fruity: 0, floral: 0, woody: 0, oriental: 0 };

export function sumScores(scores, weights, personas = ["fruity","floral","woody","oriental"]) {
  const next = { ...scores };
  personas.forEach((p, i) => { next[p] = (next[p] || 0) + (weights[i] || 0); });
  return next;
}

export function resolveWinner(scores, tieBreak = ["oriental","woody","floral","fruity"]) {
  const entries = Object.entries(scores); // [ [key, val], ... ]
  const maxVal = Math.max(...entries.map(([_, v]) => v));
  const candidates = entries.filter(([_, v]) => v === maxVal).map(([k]) => k);
  if (candidates.length === 1) return candidates[0];
  // 平分：按 tieBreak 优先级
  for (const t of tieBreak) if (candidates.includes(t)) return t;
  // 理论上不会到这
  return candidates[0];
}
