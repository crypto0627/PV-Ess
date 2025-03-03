const js = require('@eslint/js')
const tseslint = require('@typescript-eslint/eslint-plugin')
const tsParser = require('@typescript-eslint/parser')
const importPlugin = require('eslint-plugin-import')
const nodePlugin = require('eslint-plugin-n')
const vue = require('eslint-plugin-vue')
const globals = require('globals')
const vueParser = require('vue-eslint-parser')

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
      '**/.next/**',
      '**/tailwind.config.js'
    ]
  },
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module'
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        localStorage: true,
        setInterval: true,
        clearInterval: true
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
        sourceType: 'module',
        extraFileExtensions: ['.vue']
      },
      globals: {
        ...globals.browser,
        localStorage: true,
        setInterval: true,
        clearInterval: true,
        window: true,
        document: true
      }
    },
    plugins: {
      vue
    },
    rules: {
      ...vue.configs.recommended.rules,
      'vue/multi-word-component-names': 'off',
      'no-undef': 'off'
    }
  }
]

/** @type {import("eslint").Linter.FlatConfig[]} */
const nodeConfig = [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.js'],
    plugins: {
      n: nodePlugin,
      import: importPlugin
    },
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: ['tsconfig.json', 'apps/*/tsconfig.json']
      },
    },
    rules: {
      'n/no-missing-import': 'off',
      'n/no-extraneous-import': 'off',
      'n/no-unpublished-import': 'off',
      'n/no-process-exit': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': 'error'
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: ['tsconfig.json', 'apps/*/tsconfig.json']
        },
        node: {
          extensions: ['.js', '.ts']
        }
      }
    }
  },
  {
    files: ["**/eslint.config.js", "**/eslint.config.mjs"],
    rules: {
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/await-thenable": "off",
      "@typescript-eslint/no-misused-promises": "off"
    }
  }
]

module.exports = { baseConfig, nodeConfig, vueConfig }
