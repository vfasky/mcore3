import 'object.observe';
import 'array.observe';
export default class Watch {
    private _watchReg;
    private _watchTotal;
    callback: any;
    scope: any;
    constructor(scope?: {}, callback?: (path: string) => void);
    observer(changes: any[], x: any, path: string): void;
    unwatchByPath(path: string): void;
    _unwatchByPath(path: string): void;
    watch(x: any, path?: string): void;
    unwatch(): void;
}
