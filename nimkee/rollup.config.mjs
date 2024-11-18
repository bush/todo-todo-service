import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from "@rollup/plugin-typescript";

/** @type {typescript.RollupTypescriptOptions} */
const tsConfig = {
  allowJs: false,
  checkJs: false,
  strict: true,
  alwaysStrict: true,
  target: 'es2021',
  module: 'esnext',
  moduleResolution: 'node',
  removeComments: true,
  lib: ['es2021', 'ES2022.Error'],
  importHelpers: false,
  noEmitHelpers: false,
  noEmitOnError: true,
  allowSyntheticDefaultImports: true,
  // preserveConstEnums: false is the default, but we explicitly set it here to ensure we do not mistakenly generate objects where we expect literals
  preserveConstEnums: false,
  // Generate separate source maps files with sourceContent included
  sourceMap: true,
  inlineSourceMap: false,
  inlineSources: false,
  // API-extractor makes use of the declarations, npm script should be cleaning these up
  declaration: false,
  types: [],
  tsconfig: false,
  include: ['src/**/*']
};

const input = 'src/index.ts';

/** @type {import('rollup').RollupOptions} */
const config = [
  {
    // This warning can be safely ignored
    // https://github.com/reduxjs/redux-toolkit/issues/1466
    onwarn(warning, warn) {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      warn(warning);
    },
    
    input,
    plugins: [typescript(tsConfig), nodeResolve({ resolveOnly: [] })],
    external: ['serverless-http', 'express', '@aws-sdk/client-dynamodb', 'mongodb'],
    output: [
      {
        file: 'lib/nimkee.cjs',
        format: 'commonjs',
        exports: 'named',
        sourcemap: true,
        globals: {
          'serverless-http': 'serverless',
          'express': 'express',
          'mongodb': 'mongodb',
          '@aws-sdk/client-dynamodb': 'clientDynamodb'
        },
      },
      {
        file: 'lib/nimkee.bundle.js',
        format: 'iife',
        name: 'NIMKEE',
        exports: 'named',
        indent: false,
        sourcemap: true,
        globals: {
          'serverless-http': 'serverless',
          'express': 'express',
          'mongodb': 'mongodb',
          '@aws-sdk/client-dynamodb': 'clientDynamodb'
        }
      }
    ]
  }
];

export default config;