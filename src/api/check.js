import request from '@/utils/request'

// 查询企业检测列表
export async function queryDetectList(data) {
    return await request({
        url: '/business-server/Detect/queryDetectList',
        method: 'post',
        data
    })
}
// 检测id查看详情
export async function queryDetecDetails(data) {
    return await request({
        url: '/business-server/Detect/queryDetecDetails',
        method: 'post',
        data
    })
}