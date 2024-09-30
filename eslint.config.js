import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import checkFile from 'eslint-plugin-check-file';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'check-file': checkFile,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'check-file/filename-naming-convention': [
  'error',
  {
      '**/*.{ts,tsx}': 'KEBAB_CASE',
  },
  {
      // ignore the middle extensions of the filename to support filename like bable.config.js or smoke.spec.ts
      ignoreMiddleExtensions: true,
  },
],
'check-file/folder-naming-convention': [
  'error',
  {
    // all folders within src (except __tests__)should be named in kebab-case
    'src/**/*': 'KEBAB_CASE',
  },
],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
//       'import/no-restricted-paths': [
//     'error',
//     {
//         zones: [
//             // disables cross-feature imports:
//             // eg. src/features/discussions should not import from src/features/comments, etc.
//             {
//                 target: './src/features/auth',
//                 from: './src/features',
//                 except: ['./auth'],
//             },
//             {
//                 target: './src/features/comments',
//                 from: './src/features',
//                 except: ['./comments'],
//             },
//             {
//                 target: './src/features/discussions',
//                 from: './src/features',
//                 except: ['./discussions'],
//             },
//             {
//                 target: './src/features/teams',
//                 from: './src/features',
//                 except: ['./teams'],
//             },
//             {
//                 target: './src/features/users',
//                 from: './src/features',
//                 except: ['./users'],
//             },

//             // More restrictions...
//         ],
//     },
// ],
//       'import/no-restricted-paths': [
//     'error',
//     {
//     zones: [
//         // Previous restrictions...

//         // enforce unidirectional codebase:
//         // e.g. src/app can import from src/features but not the other way around
//         {
//             target: './src/features',
//             from: './src/app',
//         },

//         // e.g src/features and src/app can import from these shared modules but not the other way around
//         {
//             target: [
//                 './src/components',
//                 './src/hooks',
//                 './src/lib',
//                 './src/types',
//                 './src/utils',
//             ],
//             from: ['./src/features', './src/app'],
//         },
//     ],
//     },
// ],
    },
  },
  
)
