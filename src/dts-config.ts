/*
 * Package @donmahallem/rollup-config
 * Source https://github.com/donmahallem/rollup-config/
 */

import dts from 'rollup-plugin-dts';
import { setupReplacePlugin } from './replace-config.js';
import type { IPartialPackage } from './partial-pkg.js';
import type { RollupOptions } from 'rollup';
import type { Options as DtsOptions } from 'rollup-plugin-dts';

export const baseDtsConfig = (
    pkg: IPartialPackage,
    cfg: DtsOptions & { typingsOutputPath?: string; sourceTypings: string }
): RollupOptions => {
    const outputOpts: RollupOptions = {
        input: cfg.sourceTypings,
        output: [{ file: cfg.typingsOutputPath || pkg.types, format: 'es' }],
        plugins: [setupReplacePlugin(pkg), dts(cfg)],
    };
    return outputOpts;
};
