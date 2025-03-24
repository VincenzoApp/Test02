const CACHE_NAME = 'juegos-offline-v1';
const ASSETS_TO_CACHE = [
  'https://vincenzoapp.github.io/Test01/',
  'https://vincenzoapp.github.io/Test01/index.html',
  'https://vincenzoapp.github.io/Test01/cuadrado.html',
  'https://vincenzoapp.github.io/Test01/tris.html',
  'https://vincenzoapp.github.io/Test01/icon.png',
  'https://vincenzoapp.github.io/Test01/icon-72x72.png',
  'https://vincenzoapp.github.io/Test01/icon-96x96.png',
  'https://vincenzoapp.github.io/Test01/icon-128x128.png',
  'https://vincenzoapp.github.io/Test01/icon-144x144.png',
  'https://vincenzoapp.github.io/Test01/icon-192x192.png',
  'https://vincenzoapp.github.io/Test01/icon-512x512.png',
  'https://cdn.jsdelivr.net/npm/canvas-confetti@1.3.2/dist/confetti.browser.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
