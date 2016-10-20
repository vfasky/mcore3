
// function listDiff (oldList:any[], newList: any[], key?: string): any[] {}
interface listDiffStatic {
    (oldList:any[], newList: any[], key?: string): any
}
declare module 'list-diff2' {
    export = listDiff
}
 
declare var listDiff: listDiffStatic;