// Caché ligero para las llamadas a la API:
// - memoria (instantáneo al navegar dentro de la SPA, sin refetch)
// - localStorage opcional con TTL (sobrevive recargas completas)
// - dedupe de requests en vuelo (misma key no dispara 2 fetch)
// Nunca cachea resultados inválidos (p. ej. vacíos por un 504).

const mem = new Map();      // key -> { t, v }
const inflight = new Map(); // key -> Promise

const DEFAULT_TTL = 30 * 60 * 1000; // 30 min
const PREFIX = "afcache:";

export const cached = async (key, fn, { ttl = DEFAULT_TTL, persist = false, isValid = () => true } = {}) => {
  const now = Date.now();

  const hit = mem.get(key);
  if (hit && now - hit.t < ttl) return hit.v;

  if (persist) {
    try {
      const raw = window.localStorage.getItem(PREFIX + key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (now - parsed.t < ttl && isValid(parsed.v)) {
          mem.set(key, parsed);
          return parsed.v;
        }
      }
    } catch { /* noop */ }
  }

  if (inflight.has(key)) return inflight.get(key);

  const promise = (async () => {
    try {
      const v = await fn();
      if (isValid(v)) {
        const entry = { t: Date.now(), v };
        mem.set(key, entry);
        if (persist) {
          try { window.localStorage.setItem(PREFIX + key, JSON.stringify(entry)); } catch { /* cuota */ }
        }
      }
      return v;
    } finally {
      inflight.delete(key);
    }
  })();

  inflight.set(key, promise);
  return promise;
};

// Limpia el caché persistido (por si el usuario quiere refrescar).
export const clearCache = () => {
  mem.clear();
  try {
    Object.keys(window.localStorage)
      .filter(k => k.startsWith(PREFIX))
      .forEach(k => window.localStorage.removeItem(k));
  } catch { /* noop */ }
};
