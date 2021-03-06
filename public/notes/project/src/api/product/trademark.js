import request from '@/utils/request'

// 获取品牌分页列表
export function reqGetTrademarkList(page, limit) {
  return request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'GET'
  })
}

// 添加品牌
export function reqSaveTrademark(tmName, logoUrl) {
  return request({
    url: `/admin/product/baseTrademark/save`,
    method: 'POST',
    data: {
      tmName,
      logoUrl
    }
  })
}

// 更新品牌
export function reqUpdateTrademark(data) {
  return request({
    url: `/admin/product/baseTrademark/update`,
    method: 'PUT',
    data
  })
}

// 删除品牌
export function reqRemoveTrademark(id) {
  return request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: 'DELETE'
  })
}

// 获取所有品牌
export function reqGetAllTrademarkList() {
  return request({
    url: `/admin/product/baseTrademark/getTrademarkList`,
    method: 'GET'
  })
}
