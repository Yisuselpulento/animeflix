import axios from 'axios'

// Cliente centralizado para la API de Jikan (MyAnimeList).
// Jikan limita a ~3 req/s: sin control, el detalle (que dispara varias
// llamadas en paralelo) recibe 429 y falla intermitentemente.
const jikan = axios.create({ baseURL: 'https://api.jikan.moe/v4' })

// Throttle: garantiza un espacio mínimo entre requests.
const MIN_GAP = 400
let last = 0
jikan.interceptors.request.use(async (config) => {
  const now = Date.now()
  const wait = Math.max(0, last + MIN_GAP - now)
  last = now + wait
  if (wait) await new Promise(r => setTimeout(r, wait))
  return config
})

// Reintento con backoff ante 429 (rate limit), errores 5xx (Jikan devuelve
// 504 de forma intermitente por sobrecarga) y errores de red.
jikan.interceptors.response.use(null, async (error) => {
  const config = error.config
  const status = error.response?.status
  const retriable = status === 429 || (status >= 500 && status < 600) || !error.response
  const retry = config?.__retry ?? 0
  if (config && retriable && retry < 4) {
    config.__retry = retry + 1
    await new Promise(r => setTimeout(r, 800 * config.__retry))
    return jikan(config)
  }
  return Promise.reject(error)
})

export default jikan
