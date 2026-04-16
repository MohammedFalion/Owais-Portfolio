import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Relative base makes built asset URLs work regardless of repo name/path on GitHub Pages.
  base: command === 'build' ? './' : '/',
  plugins: [react()],
}))
