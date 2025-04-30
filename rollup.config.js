import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';
import webWorkerLoader from 'rollup-plugin-web-worker-loader';
import packageJson from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default [
  {
    input: 'src/index.ts', // Entry point for your library
    output: [
      {
        file: packageJson.main, // CommonJS output
        format: 'cjs',
        sourcemap: true,
        name: 'react-ts-lib', // You can change this to match your library's name
      },
      {
        file: packageJson.module, // ES Module output
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      webWorkerLoader(),
      external(), // Exclude peer dependencies (e.g., react) from the bundle
      resolve({ extensions }), // Resolve .ts, .tsx, .js, .jsx files
      commonjs(), // Convert CommonJS modules to ES6
      typescript({ tsconfig: './tsconfig.json', module: 'esnext' }), // TypeScript compilation
      terser(), // Minify the output (optional)
    ],
  },
  {
    input: 'src/index.ts', // Input TypeScript file
    output: [
      {
        file: 'dist/index.d.ts', // Output declaration file
        format: 'esm',
      },
    ],
    plugins: [dts()], // Generate type declarations
  },
];
