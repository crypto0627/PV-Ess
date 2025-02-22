import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import * as nodePlugin from 'eslint-plugin-n'
import vue from 'eslint-plugin-vue'
import globals from 'globals'
import vueParser from 'vue-eslint-parser'

/** @type {import("eslint").Linter.FlatConfig[]} */
const baseConfig = [
  {
    ignores: [
      '**/out/**',
      '**/dist/**',
      '**/build/**',
      '**/.output/**',
      '**/.nuxt/**',
      '**/node_modules/**',
      '**/*.min.js',
      '**/coverage/**',
      '**/.turbo/**',
      '**/.next/**'
    ]
  },
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        ...globals.node,
        ...globals.browser
      }
    },
    plugins: {
      '@typescript-eslint': tseslint
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  }
]

/** @type {import("eslint").Linter.FlatConfig[]} */
const vueConfig = [
  ...baseConfig,
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        ...globals.browser,
        localStorage: true,
        setInterval: true,
        clearInterval: true,
        window: true,
        document: true,
        fetch: true,
        console: true
      }
    },
    plugins: {
      vue
    },
    rules: {
      ...vue.configs.recommended.rules,
      'vue/multi-word-component-names': 'off'
    }
  }
]

/** @type {import("eslint").Linter.FlatConfig[]} */
const nodeConfig = [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.js'],
    plugins: {
      n: nodePlugin
    },
    languageOptions: {
      globals: globals.node
    },
    rules: {
      'n/no-missing-import': 'off',
      'n/no-extraneous-import': 'off',
      'n/no-unpublished-import': 'off',
      'n/no-process-exit': 'off'
    }
  }
]

export { baseConfig, nodeConfig, vueConfig }
