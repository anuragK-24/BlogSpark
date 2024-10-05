import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Specify the port number (default is 3000)
    open: true, // Automatically open the browser on server start
    historyApiFallback: true, // Handles client-side routing for React Router
  },
  build: {
    outDir: 'dist', // Output directory for the build files
    sourcemap: true, // Generate source maps for debugging
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern", // Specify modern SCSS API for compatibility
      },
    },
  },
});
