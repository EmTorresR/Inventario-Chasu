import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    host: true, // permite conexiones externas
    port: 5173,
    allowedHosts: true, // <--- permite cualquier host
  },
});
