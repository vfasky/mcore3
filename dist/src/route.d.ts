export declare function pathToObject(path: string): {};
export declare class Route {
    hashchange: any;
    sensitive: boolean;
    rule: any[];
    static changeByLocationHash(emit: any): void;
    constructor(hashchange?: typeof Route.changeByLocationHash, sensitive?: boolean);
    run(): void;
    add(path: any, fn: any): this;
    toUrl(path: any, args?: {}, options?: {}): string;
    match(url: any): this;
}
