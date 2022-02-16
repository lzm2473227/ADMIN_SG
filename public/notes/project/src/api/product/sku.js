import request from '@/utils/request'

// 添加SKU
export function reqSaveSku(data) {
  return request({
    url: `/admin/product/saveSkuInfo`,
    method: 'POST',
    data
  })
}

// 获取SKU列表
export function reqGetSkuList(page, limit) {
  return request({
    url: `/admin/product/list/${page}/${limit}`,
    method: 'GET'
  })
}
