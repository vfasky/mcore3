/**
 * htmlparser 返回的结果
 */
export interface htmlParserDom {
    type: string;
    attribs: any;
    name: string;
    data: string | any;
    children: this[];
}
