/*
 * Package @donmahallem/rollup-config
 * Source https://github.com/donmahallem/rollup-config/
 */

import { expect } from 'chai';
import 'mocha';
import { RollupOptions } from 'rollup';
import defaultConfig from './index.js';

describe('index.ts', function (): void {
    it('should set all plugins with default config', function (): void {
        const result: RollupOptions = defaultConfig({ name: 'testname', version: '1.2.3' });
        expect(result.plugins).to.have.lengthOf(5);
    });
});
