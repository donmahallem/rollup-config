/*
 * Package @donmahallem/rollup-config
 * Source https://github.com/donmahallem/rollup-config/
 */

export interface IPartialPackage {
    dependencies?: { [key: string]: string };
    devDependencies?: { [key: string]: string };
    main?: string;
    module?: string;
    name?: string;
    optionalDependencies?: { [key: string]: string };
    peerDependencies?: { [key: string]: string };
    types?: string;
    version?: string;
    exports?: {
        default?: string;
        import?: string;
        require?: string;
    };
}
