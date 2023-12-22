/*
 * Package @donmahallem/rollup-config
 * Source https://github.com/donmahallem/rollup-config/
 */

import { expect } from 'chai';
import 'mocha';
import { RollupOptions } from 'rollup';
import { baseConfig } from './base-config.js';

describe('base-config.spec.ts', (): void => {
    it('should set all plugins with default config', (): void => {
        const result: RollupOptions = baseConfig({ name: 'testname', version: '1.2.3' });
        expect(result.plugins).to.have.lengthOf(5);
    });
    it('should exclude commonjs with false as config', (): void => {
        const result: RollupOptions = baseConfig({ name: 'testname', version: '1.2.3' }, { plugins: { commonjs: false } });
        expect(result.plugins).to.have.lengthOf(4);
    });
    it('should exclude commonjs with false as config', (): void => {
        const result: RollupOptions = baseConfig({ name: 'testname', version: '1.2.3' }, { plugins: { json: false } });
        expect(result.plugins).to.have.lengthOf(4);
    });
});
