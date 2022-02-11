import request from '@/utils/request'

// 已发布店铺列表
export async function publishedStoreList(data) {
    return await request({
        url: '/business-server/StoreMgt/PublishedStoreList',
        method: 'post',
        data
    })
}
// 未发布店铺列表
export async function unPublishedStoreList(data) {
    return await request({
        url: '/business-server/StoreMgt/UnpublishedStoreList',
        method: 'post',
        data
    })
}
// 新增店铺
export async function insertStoreInfo(data) {
    return await request({
        url: '/business-server/StoreMgt/InsertStoreInfo',
        method: 'post',
        data
    })
}
// 删除店铺
export async function deleteStoreInfo(data) {
    return await request({
        url: '/business-server/StoreMgt/DeleteStoreInfo',
        method: 'post',
        data
    })
}
// 修改店铺
export async function updateStoreInfo(data) {
    return await request({
        url: '/business-server/StoreMgt/UpdateStoreInfo',
        method: 'post',
        data
    })
}
// 店铺详情
export async function storeDetails(data) {
    return await request({
        url: '/business-server/StoreMgt/StoreDetails',
        method: 'post',
        data
    })
}
// 店铺匹配商品
export async function matchCommodity(data) {
    return await request({
        url: '/business-server/StoreMgt/MatchCommodity',
        method: 'post',
        data
    })
}
// 修改店铺匹配商品
export async function updateMatchCommodity(data) {
    return await request({
        url: '/business-server/StoreMgt/UpdateMatchCommodity',
        method: 'post',
        data
    })
}
// 店铺匹配商品列表
export async function matchCommodityList(data) {
    return await request({
        url: '/business-server/StoreMgt/MatchCommodityList',
        method: 'post',
        data
    })
}

// 删除店铺匹配商品
export async function deleteMatchCommodity(data) {
    return await request({
        url: '/business-server//StoreMgt/DeleteMatchCommodity',
        method: 'post',
        data
    })
}