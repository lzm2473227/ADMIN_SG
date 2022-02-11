import request from '@/utils/request'

// 仓库列表
export async function warehouseList(data) {
    return await request({
        url: '/storehouse-server/Warehouse/WarehouseList',
        method: 'post',
        data
    })
}

// 新增仓库
export async function insertWarehouse(data) {
    return await request({
        url: '/storehouse-server/Warehouse/InsertWarehouse',
        method: 'post',
        data
    })
}

// 删除仓库
export async function deleteWarehouse(data) {
    return await request({
        url: '/storehouse-server/Warehouse/DeleteWarehouse',
        method: 'post',
        data
    })
}

// 编辑仓库
export async function updateWarehouse(data) {
    return await request({
        url: '/storehouse-server/Warehouse/UpdateWarehouse',
        method: 'post',
        data
    })
}

// 编辑仓库
export async function warehouseDetail(data) {
    return await request({
        url: '/storehouse-server/Warehouse/WarehouseDetail',
        method: 'post',
        data
    })
}

// 出库单列表
export async function exWarehouseList(data) {
    return await request({
        url: '/storehouse-server/ExWarehouse/ExWarehouseList',
        method: 'post',
        data
    })
}

// 新建出库单
export async function insertExWarehouse(data) {
    return await request({
        url: '/storehouse-server/ExWarehouse/InsertExWarehouse',
        method: 'post',
        data
    })
}

// 出库单详情
export async function exWarehouseDetails(data) {
    return await request({
        url: '/storehouse-server/ExWarehouse/ExWarehouseDetails',
        method: 'post',
        data
    })
}