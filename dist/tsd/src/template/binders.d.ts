declare let binder: {
    checked: (el: HTMLInputElement, value: any) => void;
    disabled: (el: HTMLInputElement, value: any) => void;
    readonly: (el: HTMLInputElement, value: any) => void;
    focus: (el: any, value: any) => void;
    blur: (el: any, value: any) => void;
    html: (el: any, value: any) => void;
    'no-diff-child': (el: any, value: any) => void;
    'class-*': (el: HTMLElement, value: boolean, attrValue: string) => void;
    'form-load-data': {
        init: (el: any, data?: {}) => any;
    };
    'form-sync': {
        init: (el: any, dataKey: any) => any;
    };
};
export default binder;
