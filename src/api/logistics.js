import request from '@/utils/request'

// 物流订单列表
export async function waybillList(data) {
    return await request({
        url: '/business-server/Waybill/WaybillList',
        method: 'post',
        data
    })
}

// 物流轨迹
export async function queryRoute(data) {
    return await request({
        url: '/business-server/Waybill/queryRoute',
        method: 'post',
        data
    })
}

// 运单详情
export async function waybillDetails(data) {
    return await request({
        url: '/business-server/Waybill/WaybillDetails',
        method: 'post',
        data
    })
}