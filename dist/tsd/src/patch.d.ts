declare const REPLACE = 0;
declare const REORDER = 1;
declare const PROPS = 2;
declare const TEXT = 3;
declare function patch(node: any, patches: any): void;
export { patch, REPLACE, REORDER, PROPS, TEXT };
