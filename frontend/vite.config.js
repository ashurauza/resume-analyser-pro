import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => {
  // Use base path for GitHub Pages, root path for Vercel
  const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
  
  return {
    plugins: [react()],
    // For GitHub Pages deployment - update 'resume-analyser-pro' to your repo name
    base: isGitHubPages ? '/resume-analyser-pro/' : '/',
    build: {
      outDir: 'dist',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            animations: ['framer-motion'],
            charts: ['recharts'],
          },
        },
      },
    },
    server: {
      port: 5173,
      strictPort: false,
      host: true,
    },
    preview: {
      port: 4173,
      strictPort: false,
      host: true,
    },
  }
})
