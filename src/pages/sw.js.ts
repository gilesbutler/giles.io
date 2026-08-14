import type { APIRoute } from 'astro';

export const GET: APIRoute = () =>
  new Response(
    `self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
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
  })());
});`,
    {
      headers: { 'Content-Type': 'application/javascript; charset=utf-8' },
    },
  );
