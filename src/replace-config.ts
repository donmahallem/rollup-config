/*
 * Package @donmahallem/rollup-config
 * Source https://github.com/donmahallem/rollup-config/
 */

import { default as replace } from '@rollup/plugin-replace';
import { Plugin } from 'rollup';
import { IPartialPackage } from './partial-pkg.js';

/**
 * @param {IPartialConfig} pkg package.json to use
 */
export function setupReplacePlugin(pkg: IPartialPackage): Plugin {
    return replace({
        __BUILD_DATE__: (): string => new Date().toString(),
        __BUILD_PACKAGE_NAME__: pkg.name,
        __BUILD_VERSION__: pkg.version,
        preventAssignment: true,
    });
}
