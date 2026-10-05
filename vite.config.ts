import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  base: '/', // Use '/' if using custom domain, or '/repo-name/' if using username.github.io/repo-name/
  build: isSsrBuild
    ? {}
    : {
        // Read by scripts/prerender.mjs to add modulepreload hints for each page's chunk.
        manifest: true,
        rollupOptions: {
          output: {
            // React and the router rarely change, so keep them in their own long-cached chunk;
            // content edits then only invalidate the (much smaller) app chunk.
            manualChunks: { vendor: ['react', 'react-dom', 'react-router-dom'] }
          }
        }
      }
}));
