import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,       // This exposes the server to external connections (Docker host)
    port: 5173,       // Specify the port (default is 5173)
    strictPort: true, // Fail if port 5173 is not available
    watch: {
      usePolling: true, // Needed for Docker environments
    }
  }
})
