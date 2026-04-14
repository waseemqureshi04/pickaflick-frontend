import { defineConfig, transformWithOxc, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Custom plugin to transform JSX in .js files using Oxc
const transformJsxInJs = () => ({
  name: 'transform-jsx-in-js',
  enforce: 'pre',
  async transform(code, id) {
    if (id.includes('node_modules') || !id.endsWith('.js')) {
      return null
    }

    // Check if code contains JSX-like syntax to avoid unnecessary transforms
    if (!code.includes('<') && !code.includes('/>')) {
      return null
    }

    return await transformWithOxc(code, id, {
      lang: 'jsx',
    })
  },
})



// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'REACT_APP_')

  return {
    plugins: [
      react(),
      transformJsxInJs(),
    ],
    define: {
      'process.env': env,
    },
    envPrefix: 'REACT_APP_',
    optimizeDeps: {
      include: [
        '@mui/material',
        '@mui/icons-material',
        '@emotion/react',
        '@emotion/styled',
      ],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      open: true,
    },
    build: {
      outDir: 'dist',
    },
  }
})
