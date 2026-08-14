/* Stale service worker cleanup.
   This file exists only so that browsers with a previously registered
   /sw.js can update to a script that unregisters itself and clears any
   leftover caches. It performs no fetch handling and no caching. */
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => caches.delete(key)));
      } catch {}
      try {
        await self.registration.unregister();
      } catch {}
      try {
        const clients = await self.clients.matchAll({ type: 'window' });
        await Promise.all(clients.map((client) => client.navigate(client.url)));
      } catch {}
      try {
        await self.clients.claim();
      } catch {}
    })()
  );
});