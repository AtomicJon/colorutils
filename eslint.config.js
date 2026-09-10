const js = require('@eslint/js');
const globals = require('globals');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const prettierConfig = require('eslint-config-prettier');

const sharedRules = {
  'no-param-reassign': 'error',
  'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
  'no-use-before-define': 'off',
};

module.exports = [
  {
    ignores: ['dist/**', 'coverage/**'],
  },
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2018,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2015,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs['flat/eslint-recommended'].rules,
      ...sharedRules,
    },
  },
  {
    files: ['src/tests/**/*.ts'],
    languageOptions: {
      globals: globals.jest,
    },
  },
  {
    files: ['*.js'],
    languageOptions: {
      ecmaVersion: 2018,
      globals: globals.node,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...sharedRules,
    },
  },
  {
    files: ['rollup.config.js'],
    languageOptions: { sourceType: 'module' },
  },
  {
    files: ['babel.config.js'],
    languageOptions: { sourceType: 'commonjs' },
  },
  prettierConfig,
];
