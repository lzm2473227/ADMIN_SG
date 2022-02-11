import request from '@/utils/request'

// 请求打码
export async function insertCode(data) {
    return await request({
        url: '/business-server/LinkCode/insertCode',
        method: 'post',
        data
    })
}

// 生成码列表
export async function codeInfoPlanList(data) {
    return await request({
        url: '/business-server/LinkCode/codeInfoPlanList',
        method: 'post',
        data
    })
}

// 生码下的所有编码
export async function codeAll(data) {
    return await request({
        url: '/business-server/LinkCode/codeAll',
        method: 'post',
        data
    })
}

// 已接收的码
export async function backCodeList(data) {
    return await request({
        url: '/business-server/LinkCode/backCodeList',
        method: 'post',
        data
    })
}

// 待接收的码
export async function queryCodeAllByEnterpriseId(data) {
    return await request({
        url: '/business-server/LinkCode/queryCodeAllByEnterpriseId',
        method: 'post',
        data
    })
}

// 分类列表
export async function catalog(data) {
    return await request({
        url: '/business-server/ProductionClassify/Catalog',
        method: 'post',
        data
    })
}

// 删除分类
export async function deleteClassify(data) {
    return await request({
        url: '/business-server/ProductionClassify/DeleteClassify',
        method: 'post',
        data
    })
}

// 新增分类
export async function insertClassify(data) {
    return await request({
        url: '/business-server/ProductionClassify/InsertClassify',
        method: 'post',
        data
    })
}

// 修改分类
export async function updateClassify(data) {
    return await request({
        url: '/business-server/ProductionClassify​/UpdateClassify',
        method: 'post',
        data
    })
}

// 三级目录
export async function queryCategoriesCatalog(data) {
    return await request({
        url: '/business-server/ProductionClassify/queryCategoriesCatalog',
        method: 'post',
        data
    })
}

// 添加品牌
export async function addBrandInfo(data) {
    return await request({
        url: '/business-server/Enterprise/addBrandInfo',
        method: 'post',
        data
    })
}

// 品牌列表
export async function findCurrEnterpriseBrandInfoList(data) {
    return await request({
        url: '/business-server/Enterprise/findCurrEnterpriseBrandInfoList',
        method: 'post',
        data
    })
}

// 品牌详情
export async function findBrandInfoById(data) {
    return await request({
        url: '/business-server/Enterprise/findBrandInfoById',
        method: 'post',
        data
    })
}

// 新增商品
export async function insertProductionCommodity(data) {
    return await request({
        url: '/business-server/CommodityMgt/InsertProductionCommodity',
        method: 'post',
        data
    })
}

// 商品列表
export async function productionCommodityList(data) {
    return await request({
        url: '/business-server/CommodityMgt/ProductionCommodityList',
        method: 'post',
        data
    })
}

// 删除商品
export async function deleteProductionCommodity(data) {
    return await request({
        url: '/business-server/CommodityMgt/DeleteProductionCommodity',
        method: 'post',
        data
    })
}

// 修改商品
export async function updateProductionCommodity(data) {
    return await request({
        url: '/business-server/CommodityMgt/UpdateProductionCommodity',
        method: 'post',
        data
    })
}

// 商品详情
export async function productionCommodityDetails(data) {
    return await request({
        url: '/business-server/CommodityMgt/ProductionCommodityDetails',
        method: 'post',
        data
    })
}