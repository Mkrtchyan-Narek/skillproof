import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/skillproof/', // <-- set this to your repo/project name
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
