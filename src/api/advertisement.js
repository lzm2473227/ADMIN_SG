import request from '@/utils/request'

// 判断广告位置是否被占用
export async function boolAdvertisement(data) {
    return await request({
        url: '/business-server/AdvertisementMgt/boolAdvertisement',
        method: 'post',
        data
    })
}

// 新增广告
export async function insertAdvertisement(data) {
    return await request({
        url: '/business-server/AdvertisementMgt/InsertAdvertisement',
        method: 'post',
        data
    })
}

// 已发布广告
export async function advertisementList(data) {
    return await request({
        url: '/business-server/AdvertisementMgt/advertisementList',
        method: 'post',
        data
    })
}