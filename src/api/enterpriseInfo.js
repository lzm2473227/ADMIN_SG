import request from '@/utils/request'

// 注册卖家信息
export async function registerSellerInfo(data) {
    return await request({
        url: '/business-server/Enterprise/registerSellerInfo',
        method: 'post',
        data
    })
}
// 注册企业
export async function registerEnterprise(data) {
    return await request({
        url: '/business-server/Enterprise/registerEnterprise',
        method: 'post',
        data
    })
}
// 注册买家信息
export async function registerBuyerInfo(data) {
    return await request({
        url: '/business-server/Enterprise/registerBuyerInfo',
        method: 'post',
        data
    })
}
// 根据ID查询企业信息
export async function findEnterpriseInfoById(data) {
    return await request({
        url: 'business-server/Enterprise/findEnterpriseInfoById',
        method: 'post',
        data
    })
}