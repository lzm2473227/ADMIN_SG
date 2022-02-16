import request from '@/utils/requestMock'

export function reqGetHomeList() {
  return request({
    url: '/home/list',
    method: 'get'
  })
}
