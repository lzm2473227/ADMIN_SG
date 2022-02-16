import request from '@/utils/request'

export default {
  // 获取角色列表
  reqGetRoleList({ page, limit, roleName = '' }) {
    return request({
      method: 'GET',
      url: `/admin/acl/role/${page}/${limit}`,
      params: { roleName }
    })
  },
  // 新增角色
  reqSaveRole(roleName) {
    return request({
      method: 'POST',
      url: `/admin/acl/role/save`,
      data: { roleName }
    })
  }
}
