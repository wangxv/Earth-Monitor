import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import {terser} from 'rollup-plugin-terser'
const pkg = require('./package.json');
// && typedoc --out docs --target es5 --theme minimal --mode file src
export default [
    {
        input: `src/index.ts`,
        output: [
            {
                file: pkg.main,
                // file: 'earth-monitor',
                name: 'EarthMonitor',
                format: 'umd',
                plugins: [terser()],
                sourcemap: true
            },
            {file: pkg.module, format: 'es', plugins: [terser()]},
            {file: 'dist/earth-monitor.js',
                name: 'EarthMonitor',
                format: 'umd',
                sourcemap: true
            },
        ],
        watch: {
            include: 'src/**',
        },
        plugins: [
            resolve(),
            json(),
            typescript({useTsconfigDeclarationDir: true}),
            commonjs(),
            sourceMaps(),
        ],
    }
]
