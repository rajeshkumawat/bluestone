import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';

const r = (p) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  site: 'https://bluestone2.designinx.com',
  output: 'static',
  devToolbar: { enabled: false },
  server: {
    host: '127.0.0.1',
    port: 4324,
    allowedHosts: ['bluestone2.designinx.com'],
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      hmr: {
        protocol: 'wss',
        host: 'bluestone2.designinx.com',
        clientPort: 443,
      },
    },
    resolve: {
      alias: {
        '@': r('./src'),
        '@components': r('./src/components'),
        '@blocks': r('./src/components/blocks'),
        '@layouts': r('./src/layouts'),
        '@content': r('./src/data/index.ts'),
        '@lib': r('./src/lib'),
        '@styles': r('./src/styles'),
      },
    },
  },
});
