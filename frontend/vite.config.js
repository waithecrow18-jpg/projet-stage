import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@context': path.resolve(__dirname, './src/context'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    // Raise warning threshold — Three.js bundles are inherently large
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Three.js + R3F ecosystem in their own chunk
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          // Framer Motion separate chunk
          'vendor-motion': ['framer-motion'],
          // React ecosystem
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
