import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist', 'android', 'ios', '*.mjs', 'eslint.config.js', 'vite.config.js', 'tailwind.config.js', 'postcss.config.js'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        localStorage: 'readonly',
        fetch: 'readonly',
        alert: 'readonly',
        Date: 'readonly',
        Intl: 'readonly',
        Set: 'readonly',
        Boolean: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      'no-unused-vars': ['warn', { varsIgnorePattern: '^React$' }],
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]
