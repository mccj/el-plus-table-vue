export type loadDataPage = {
    page: number,
    pageSize: number,
    skip: number
}
// export type loadDataPage = {
//     page: number,
//     pageSize: number,
//     skip: number
// }
export type loadDataCallback = { Success: (data: any) => void, Fail: (reason?: any) => void }
export type dataFormatCallback = { SetData: (data: any[]) => void, SetTotal?: (total: number) => void, SetLoading?: (val: boolean) => void }
// export type operationProperty = { LoadData?: (param: loadDataPage, fun: loadDataCallback) => void, Refresh?: () => void, Reload?: () => void }
export type tableExpose = { Refresh: () => void, Reload: () => void };

// export interface PaginationConfig {
//     small?:boolean,// 是否使用小型分页样式	boolean	— false
//     background?:boolean,// 是否为分页按钮添加背景色	boolean	—	false
//     // pager-count	设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠	number	(介于 5 和 21 之间的奇数)	7
//     // layout	组件布局，子组件名用逗号分隔	string	sizes / prev / pager / next / jumper / -> / total / slot	'prev, pager, next, jumper, ->, total'
//     // popper-class	每页显示个数选择器的下拉框类名	string	—	—
//     // prev-text	替代图标显示的上一页文字	string	—	—
//     // prev-icon	上一页的图标， 比 prev-text 优先级更高	string | Component	—	ArrowLeft
//     // next-text	替代图标显示的下一页文字	string	—	—
//     // next-icon	下一页的图标， 比 next-text 优先级更高	string | Component	—	ArrowRight
//     // disabled	是否禁用分页	boolean	—	false
//     // hide-on-single-page	只有一页时是否隐藏	boolean	—
// }

export const isPromise = (value: any) => {
    return (
        value &&
        value.then &&
        typeof value.then === 'function' &&
        value?.constructor?.name === 'Promise'
    )
}