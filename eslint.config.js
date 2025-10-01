import { dirname, resolve } from 'node:path'

import { fileURLToPath } from 'node:url'

import ESLintJS from '@eslint/js'
import { tanstackConfig } from '@tanstack/eslint-config'
import ESLintPlugin from '@typescript-eslint/eslint-plugin'
import ESLintPluginImport from 'eslint-plugin-import'
import ESLintPluginReact from 'eslint-plugin-react'
import ESLintPluginReactHooks from 'eslint-plugin-react-hooks'
import ESLintPluginReactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'

import typescriptESLint from 'typescript-eslint'

const _filename = fileURLToPath(import.meta.url)
const _dirname = dirname(_filename)

const config = [
  ...tanstackConfig,
  ...typescriptESLint.configs.recommended,

  {
    files: ['src/**/*.ts', 'src/**/*.tsx', 'eslint.config.js'],
    plugins: {
      react: ESLintPluginReact,
      'react-hooks': ESLintPluginReactHooks,
      'react-refresh': ESLintPluginReactRefresh,
      '@typescript-eslint': ESLintPlugin,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: resolve(_dirname, 'tsconfig.eslint.json'),
        tsconfigRootDir: _dirname,
      },
    },
    rules: {
      ...ESLintJS.configs.recommended.rules,
      ...ESLintPluginReactHooks.configs.recommended.rules,
      ...ESLintPluginImport.configs.recommended.rules,
      'max-params': ['error', 3],
      'no-new-func': 'error',
      'no-return-await': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-confusing-void-expression': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-useless-empty-export': 'error',
      '@typescript-eslint/prefer-enum-initializers': 'error',
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/require-array-sort-compare': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          modifiers: ['const', 'exported'],
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'variable',
          types: ['function'],
          modifiers: ['const', 'exported'],
          format: ['PascalCase', 'camelCase'],
        },
        {
          selector: 'variable',
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
        },
        {
          selector: 'variableLike',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'memberLike',
          modifiers: ['private'],
          format: ['camelCase'],
          leadingUnderscore: 'require',
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
        {
          selector: 'enum',
          format: ['PascalCase'],
          custom: {
            regex: '^E[A-Z]',
            match: true,
          },
        },
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
        },
      ],
      '@typescript-eslint/comma-dangle': 'off',
      'react/jsx-key': 'error',
      'react/jsx-boolean-value': ['error', 'never'],
      'react-hooks/exhaustive-deps': 'off',
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true,
        },
      ],
      'react/jsx-curly-brace-presence': [
        'error',
        {
          props: 'never',
          children: 'never',
        },
      ],
      'import/no-absolute-path': 'error',
      'import/no-dynamic-require': 'error',
      'import/no-webpack-loader-syntax': 'error',
      'import/no-self-import': 'error',
      'import/no-unresolved': 'off',
      'import/no-useless-path-segments': ['error', { noUselessIndex: true }],
      'import/no-relative-packages': 'error',
      'import/no-named-as-default': 'error',
      'import/no-named-as-default-member': 'error',
      'import/no-deprecated': 'error',
      'import/no-mutable-exports': 'error',
      'import/first': 'error',
      'import/exports-last': 'error',
      'import/extensions': ['error', 'never', { json: 'always', lazy: 'always' }],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'sibling', 'parent', 'index', 'object', 'type'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'builtin',
              position: 'after',
            },
            {
              pattern: '@app/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '**/provider/**',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '**/interface/**',
              group: 'type',
              position: 'before',
            },
            {
              pattern: '**/enum/**',
              group: 'type',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin', 'external', 'internal', 'object', 'type'],
          'newlines-between': 'always-and-inside-groups',
        },
      ],
      'import/newline-after-import': 'error',
      'import/max-dependencies': 'off',
      'import/no-named-default': 'error',
      'import/no-anonymous-default-export': [
        'error',
        {
          allowArray: false,
          allowArrowFunction: false,
          allowAnonymousClass: false,
          allowAnonymousFunction: false,
          allowCallExpression: false,
          allowLiteral: false,
          allowObject: false,
        },
      ],
      'import/group-exports': 'error',
    },
  },

  {
    files: ['package.json'],
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },

  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
    },
  },
]

export default config
