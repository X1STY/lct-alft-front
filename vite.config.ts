import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    eslintPlugin({
      fix: true,
      emitError: true,
      failOnError: true,
      failOnWarning: false,
    }),
    tsconfigPaths(),
  ],
  build: {
    minify: 'oxc',
    cssMinify: 'lightningcss',
    cssCodeSplit: true,
    rolldownOptions: {
      output: {
        advancedChunks: {
          groups: [
            {
              test: /components/,
              name: 'components',
            },
            {
              test: /repository/,
              name: 'repository',
            },
          ],
        },
      },
    },
  },
})
