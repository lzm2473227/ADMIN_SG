import request from '@/utils/request'

// 新增活动
export async function insertActivity(data) {
    return await request({
        url: '/business-server/Activity/insertActivity',
        method: 'post',
        data
    })
}
// 已发布活动
export async function queryActivityList(data) {
    return await request({
        url: '/business-server/Activity/queryActivityList',
        method: 'post',
        data
    })
}
// 特惠商品列表
export async function preferentialList(data) {
    return await request({
        url: '/business-server/Activity/preferentialList',
        method: 'post',
        data
    })
}
// 活动详情
export async function queryActivity(data) {
    return await request({
        url: '/business-server/Activity/queryActivity',
        method: 'post',
        data
    })
}