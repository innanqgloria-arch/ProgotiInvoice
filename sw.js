const CACHE_NAME = 'invoice-app-v1';
const URLS_TO_CACHE = [
  '/',
  'index.html',
  'invoice.html',
  'estimate.html',
  'icons/icon-192.png',
  'icons/icon-512.png'
];

// Install the service worker and cache all the app's files.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching files');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Intercept network requests and serve from the cache first.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If the file is in the cache, return it.
        if (response) {
          return response;
        }
        // Otherwise, fetch the file from the network.
        return fetch(event.request);
      }
    )
  );
});