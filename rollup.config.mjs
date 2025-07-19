import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import { glob } from 'glob';
import path from 'path';

// Get all TypeScript files in src, excluding test files
const inputFiles = glob.sync('src/**/*.{ts,tsx}', {
  ignore: ['src/**/*.test.{ts,tsx}', 'src/**/*.spec.{ts,tsx}']
});

// Create input object with file names as keys and paths as values
const input = inputFiles.reduce((acc, file) => {
  const relativePath = path.relative('src', file);
  const key = relativePath.replace(path.extname(relativePath), '');
  acc[key] = file;
  return acc;
}, {});

// Base external packages (peer dependencies and dependencies)
const external = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  '@ffsm/requester'
];

// Minification configuration
const minifyOptions = {
  compress: {
    drop_console: true,
    drop_debugger: true,
    pure_funcs: ['console.log', 'console.info', 'console.debug']
  },
  mangle: true
};

// CommonJS build
const cjsConfig = {
  input,
  external,
  output: {
    dir: 'dist',
    format: 'cjs',
    entryFileNames: '[name].js',
    exports: 'named',
    preserveModules: true,
    preserveModulesRoot: 'src'
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.cjs.json',
      declaration: true,
      declarationDir: 'dist'
    }),
    terser(minifyOptions)
  ]
};

// ESM build
const esmConfig = {
  input,
  external,
  output: {
    dir: 'dist',
    format: 'esm',
    entryFileNames: '[name].esm.js',
    exports: 'named',
    preserveModules: true,
    preserveModulesRoot: 'src'
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.esm.json',
      declaration: false, // Only generate declarations once (in CJS build)
      declarationDir: undefined
    }),
    terser(minifyOptions)
  ]
};

export default [cjsConfig, esmConfig];
