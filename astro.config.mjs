import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import astroAgentAnnotate from 'astro-agent-annotate';


export default defineConfig({
  site: 'https://giles.io',
  output: 'static',
  devToolbar: { enabled: true },
  server: { host: true, port: 4321 },
  integrations: [sitemap(), astroAgentAnnotate()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      host: true,
      allowedHosts: ['gb-dev-1.exe.xyz', 'giles.io', 'www.giles.io'],
      strictPort: true,
      hmr: {
          protocol: 'wss',
          host: 'gb-dev-1.exe.xyz',
          clientPort: 4321,
        },
      ws: true,
    },
  },
  prefetch: { prefetchAll: true },
  compressHTML: true,
});
