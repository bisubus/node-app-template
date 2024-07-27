// @ts-check
import * as url from 'node:url';
import * as path from 'node:path';
import globals from 'globals';
import eslintJs from '@eslint/js';
import typescriptEslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default typescriptEslint.config(
  {
    files: ['**/*.{js,mjs,cjs,ts,cts,mts}'],

    ignores: ['**/dist/**'],
    languageOptions: { globals: globals.node },
  },
  eslintJs.configs.recommended,

  // https://typescript-eslint.io/getting-started/typed-linting
  ...typescriptEslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.lint.json'],
        tsconfigRootDir: __dirname,
      },
    },
  },

  // https://github.com/prettier/eslint-plugin-prettier#configuration-new-eslintconfigjs
  eslintPluginPrettierRecommended,

  // Overrides
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
          singleQuote: true,
        },
      ],
    },
  },
);
