import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores([
    'dist',
    // Kimi 模板附带的通用组件库当前未被本站引用，保留为上游代码，不纳入本站交付 lint。
    'src/components/ui/**',
    'src/components/site/HeroMedia.tsx',
  ]),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // 小型站点组件允许与配套 helper 同文件导出（Button、ToastHost / toast）。
      'react-refresh/only-export-components': 'off',
    },
  },
])
