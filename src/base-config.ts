/*
 * Package @donmahallem/rollup-config
 * Source https://github.com/donmahallem/rollup-config/
 */

import commonjs, { RollupCommonJSOptions } from '@rollup/plugin-commonjs';
import json, { RollupJsonOptions } from '@rollup/plugin-json';
import nodeResolve, { RollupNodeResolveOptions } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { RollupOptions, OutputOptions, OutputPlugin } from 'rollup';
import { setupReplacePlugin } from './replace-config.js';
import type { IPartialPackage } from './partial-pkg.js';

export interface IConfig {
    output?: { cjs?: boolean; esm?: boolean };
    plugins?: { commonjs?: false | RollupCommonJSOptions; nodeResolve?: RollupNodeResolveOptions; json?: false | RollupJsonOptions };
    /**
     * Path to the tsconfig path to use
     * @default './tsconfig.json'
     */
    tsconfig?: string;
}
export const baseConfig = (pkg: IPartialPackage, cfg: IConfig = {}): RollupOptions => {
    const pkgMainEntry: string | undefined = pkg.exports?.require || pkg.main;
    const pkgModuleEntry: string | undefined = pkg.exports?.import || pkg.module;
    const output: OutputOptions[] = [];
    if (pkgMainEntry && cfg?.output?.cjs !== false) {
        output.push({
            file: pkgMainEntry,
            footer: '// BUILD: __BUILD_DATE__\n\n',
            format: 'cjs',
            generatedCode: { constBindings: true },
            sourcemap: true,
        });
    }
    if (pkgModuleEntry && cfg?.output?.esm !== false) {
        output.push({
            file: pkgModuleEntry,
            footer: '// BUILD: __BUILD_DATE__\n\n',
            format: 'esm',
            generatedCode: { constBindings: true },
            sourcemap: true,
        });
    }
    const plugins: OutputPlugin[] = [
        nodeResolve(cfg.plugins?.nodeResolve || { preferBuiltins: true }),
        typescript({ tsconfig: cfg.tsconfig || './tsconfig.json' }),
    ];
    if (cfg.plugins?.commonjs !== false) {
        plugins.push(commonjs(cfg.plugins?.commonjs));
    }
    if (cfg.plugins?.json !== false) {
        plugins.push(json(cfg.plugins?.json || { compact: true }));
    }
    plugins.push(setupReplacePlugin(pkg));
    return {
        external: [
            ...Object.keys(pkg.dependencies || {}),
            ...Object.keys(pkg.devDependencies || {}),
            ...Object.keys(pkg.peerDependencies || {}),
            ...Object.keys(pkg.optionalDependencies || {}),
        ],
        input: 'src/index.ts',
        output,
        plugins,
        preserveSymlinks: true,
    };
};
