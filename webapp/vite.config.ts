import { sentryVitePlugin } from '@sentry/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const publicEnv = Object.entries(env).reduce((acc, [key, value]) => {
    if (key.startsWith('VITE_') || ['NODE_ENV', 'HOST_ENV', 'SOURCE_VERSION'].includes(key)) {
      return {
        ...acc,
        [key]: value,
      }
    }
    return acc
  }, {})

  // Убираем проверку SENTRY_AUTH_TOKEN для режимов, отличных от production
  const useSentry = env.HOST_ENV === 'production' && env.SENTRY_AUTH_TOKEN && env.SOURCE_VERSION

  return {
    plugins: [
      react(),
      svgr(),
      useSentry
        ? sentryVitePlugin({
            org: 'myownworldproject',
            project: 'javascript-react',
            authToken: env.SENTRY_AUTH_TOKEN,
            release: { name: env.SOURCE_VERSION },
          })
        : undefined,
    ],
    build: {
      sourcemap: true,
      // outDir: 'dist',
      // emptyOutDir: true,
    },
    server: {
      port: +env.PORT,
      host: true,
      force: true,
      strictPort: true,
      cors: {
        origin: '*',
      },
      hmr: {
        host: 'localhost',
      },
      proxy: {
        '/api': {
          target: 'http://localhost:4001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
      allowedHosts: ['localhost', 'myownworldproject.ru', 'www.myownworldproject.ru', 'api.myownworldproject.ru', '*'],
    },
    preview: {
      port: +env.PORT,
      host: true,
      force: true,
      strictPort: true,
      cors: {
        origin: '*',
      },
      proxy: {
        '/api': {
          target: 'http://localhost:4001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
      allowedHosts: ['localhost', 'myownworldproject.ru', 'www.myownworldproject.ru', 'api.myownworldproject.ru', '*'],
    },
    define: {
      'process.env': publicEnv,
    },
  }
})
