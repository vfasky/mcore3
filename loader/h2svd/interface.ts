/**
 * interface
 * @author vfasky<vfasky@gmail.com>
 * 
 **/
'use strict'

/**
 * htmlparser 返回的结果
 */
export interface htmlParserDom {
    type: string;
    data: string | any;
}