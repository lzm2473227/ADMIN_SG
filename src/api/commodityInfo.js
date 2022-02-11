import request from '@/utils/request'

// 已发布商品列表
export async function publishedCommodityList(data) {
    return await request({
        url: '/business-server/CommodityMgt/PublishedCommodityList',
        method: 'post',
        data
    })
}
// 已发布单品列表
export async function publishedCommodityCodeList(data) {
    return await request({
        url: '/business-server/CommodityMgt/PublishedCommodityCodeList',
        method: 'post',
        data
    })
}
// 未发布商品列表
export async function unpublishedCommodityList(data) {
    return await request({
        url: '/business-server/CommodityMgt/UnpublishedCommodityList',
        method: 'post',
        data
    })
}
// 新增商品
export async function insertCommodityInfo(data) {
    return await request({
        url: '/business-server/CommodityMgt/InsertCommodityInfo',
        method: 'post',
        data
    })
}
// 删除商品
export async function deleteCommodityInfo(data) {
    return await request({
        url: '/business-server/CommodityMgt/DeleteCommodityInfo',
        method: 'post',
        data
    })
}
// 修改商品
export async function updateCommodityInfo(data) {
    return await request({
        url: '/business-server/CommodityMgt/UpdateCommodityInfo',
        method: 'post',
        data
    })
}

// 商品分类
export async function queryCategoriesCatalog(data) {
    return await request({
        url: '/business-server/Classify/queryCategoriesCatalog',
        method: 'post',
        data
    })
}
// 交易中心分类
export async function queryCategoriesCatalogApi(data) {
    return await request({
        url: '/business-server/Classify/queryCategoriesCatalogApi',
        method: 'post',
        data
    })
}

// 新增商品价格
export async function insertCommodityPrice(data) {
    return await request({
        url: '/business-server/CommodityMgt/InsertCommodityPrice',
        method: 'post',
        data
    })
}
// 新增单品价格
export async function insertCommodityCodePrice(data) {
    return await request({
        url: '/business-server/CommodityMgt/InsertCommodityCodePrice',
        method: 'post',
        data
    })
}
// 删除商品价格
export async function deleteCommodityPrice(data) {
    return await request({
        url: '/business-server/CommodityMgt/DeleteCommodityPrice',
        method: 'post',
        data
    })
}
// 删除商品价格
export async function updateCommodityPrice(data) {
    return await request({
        url: '/business-server/CommodityMgt/UpdateCommodityPrice',
        method: 'post',
        data
    })
}

// 新增品牌
export async function addSellBrandInfo(data) {
    return await request({
        url: '/business-server/Enterprise/addSellBrandInfo',
        method: 'post',
        data
    })
}

// 已发布品牌列表
export async function findCurrEnterpriseSellBrandInfoList(data) {
    return await request({
        url: '/business-server/Enterprise/findCurrEnterpriseSellBrandInfoList',
        method: 'post',
        data
    })
}

// 已发布品牌信息表
export async function findSellBrandInfoById(data) {
    return await request({
        url: '/business-server/Enterprise/findSellBrandInfoById',
        method: 'post',
        data
    })
}

// 非单品价格详情
export async function commodityPriceDetails(data) {
    return await request({
        url: '/business-server/CommodityMgt/CommodityPriceDetails',
        method: 'post',
        data
    })
}
// 商品详情
export async function CommodityDetails(data) {
    return await request({
        url: '/business-server/CommodityMgt/CommodityDetails',
        method: 'post',
        data
    })
}

// 单品价格详情
export async function commodityCodePriceDetails(data) {
    return await request({
        url: '/business-server/CommodityMgt/CommodityCodePriceDetails',
        method: 'post',
        data
    })
}
// 商品类目列表
export async function classifyCatalog(data) {
    return await request({
        url: '/business-server/Classify/Catalog',
        method: 'post',
        data
    })
}
// 三级联动目录列表
export async function classifyQueryCategoriesCatalog(data) {
    return await request({
        url: '/business-server/Classify/queryCategoriesCatalog',
        method: 'post',
        data
    })
}
// 新建商品类目
export async function classifyInsertClassify(data) {
    return await request({
        url: '/business-server/Classify/InsertClassify',
        method: 'post',
        data
    })
}
// 修改商品类目
export async function classifyUpdateClassify(data) {
    return await request({
        url: '/business-server/Classify/UpdateClassify',
        method: 'post',
        data
    })
}
// 删除商品类目
export async function classifyDeleteClassify(data) {
    return await request({
        url: '/business-server/Classify/DeleteClassify',
        method: 'post',
        data
    })
}
// 未发布商品价格列表
export async function undeterminedPriceCommodityList(data) {
    return await request({
        url: '/business-server/CommodityMgt/UndeterminedPriceCommodityList',
        method: 'post',
        data
    })
}
// 未定店铺商品列表
export async function undeterminedCommodityList(data) {
    return await request({
        url: '/business-server/CommodityMgt/UndeterminedCommodityList',
        method: 'post',
        data
    })
}