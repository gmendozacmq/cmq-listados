/* Service worker de la Matriz de Listados.
   Estrategia:
   - navegación / index.html  -> network-first (siempre trae la última versión online; cae al cache offline)
   - resto (íconos, librería XLSX, manifest) -> cache-first (rápido y funciona offline)
   Subí el número de CACHE cuando quieras forzar limpieza de assets viejos. */
const CACHE = 'matriz-listados-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-180.png',
  'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    // allSettled: si un asset (p.ej. el CDN) falla, la instalación no se aborta
    await Promise.allSettled(ASSETS.map(u => c.add(u)));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // network-first para el documento HTML (así una nueva versión se ve al abrir online)
  if (req.mode === 'navigate' || (url.origin === location.origin && url.pathname.endsWith('index.html'))) {
    e.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const c = await caches.open(CACHE);
        c.put('./index.html', fresh.clone());
        return fresh;
      } catch {
        return (await caches.match('./index.html')) || (await caches.match('./')) || Response.error();
      }
    })());
    return;
  }

  // cache-first para lo demás
  e.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    try {
      const fresh = await fetch(req);
      if (fresh && fresh.ok && (url.origin === location.origin || url.hostname === 'cdn.jsdelivr.net')) {
        const c = await caches.open(CACHE);
        c.put(req, fresh.clone());
      }
      return fresh;
    } catch {
      return cached || Response.error();
    }
  })());
});
