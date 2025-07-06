import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from 'tailwindcss' // <-- 1. Impor tailwindcss

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: { // <-- 2. Tambahkan object css ini
    postcss: {
      plugins: [tailwindcss], // <--- Lewatkan fungsi secara langsung
    },
  },
})