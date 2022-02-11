import request from '@/utils/request'

// 购物车列表
export async function orderCartList(data) {
    return await request({
        url: '/business-server/Order/OrderCartList',
        method: 'post',
        data
    })
}

// 删除购物车商品
export async function deleteOrderCart(data) {
    return await request({
        url: '/business-server/Order/DeleteOrderCart',
        method: 'post',
        data
    })
}

// 已成交订单列表
export async function closedOrderList(data) {
    return await request({
        url: '/business-server/Order/ClosedOrderList',
        method: 'post',
        data
    })
}

// 卖方销售订单
export async function saleDocumentList(data) {
    return await request({
        url: '/oa-server/SaleDocument/saleDocumentList',
        method: 'post',
        data,
        // baseURL: 'http://192.168.1.156:20012' // 直接通过覆盖的方式
    })
}

// 卖方销售订单转为数据
export async function transformToData(data) {
    return await request({
        url: '/oa-server/SaleDocument/transformToData',
        method: 'post',
        data,
    })
}

// 订单详情
export async function dealDetails(data) {
    return await request({
        url: '/business-server/Order/DealDetails',
        method: 'post',
        data
    })
}